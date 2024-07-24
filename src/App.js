import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HospitalForm from './components/HospitalForm';
import HospitalList from './components/HospitalList';
import HospitalDetails from './components/HospitalDetails';
import EditHospital from './components/EditHospital';
import './App.css';

function App() {
    // Initialize hospitals state with data from localStorage
    const [hospitals, setHospitals] = useState(() => {
        const savedHospitals = localStorage.getItem('hospitals');
        return savedHospitals ? JSON.parse(savedHospitals) : [];
    });
    
    const [darkTheme, setDarkTheme] = useState(false);

    // Save hospitals to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('hospitals', JSON.stringify(hospitals));
    }, [hospitals]);

    const addHospital = (hospital) => {
        setHospitals([...hospitals, hospital]);
    };

    const updateHospital = (updatedHospital) => {
        setHospitals(hospitals.map(hospital =>
            hospital.name === updatedHospital.name ? updatedHospital : hospital
        ));
    };

    const deleteHospital = (hospitalName) => {
        setHospitals(hospitals.filter(hospital => hospital.name !== hospitalName));
    };

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    };

    return (
        <Router>
            <div className={`App ${darkTheme ? 'dark' : ''}`}>
                <nav className="navbar">
                    <ul className="nav-links">
                        <li>
                            <Link to="/">Add Hospital</Link>
                        </li>
                        <li>
                            <Link to="/hospitals">View Hospitals</Link>
                        </li>
                    </ul>
                    <button className="toggle-button" onClick={toggleTheme}>
                        {darkTheme ? 'Light Theme' : 'Dark Theme'}
                    </button>
                </nav>
                <Routes>
                    <Route path="/" element={<HospitalForm addHospital={addHospital} />} />
                    <Route path="/hospitals" element={<HospitalList hospitals={hospitals} deleteHospital={deleteHospital} />} />
                    <Route path="/hospital/:name" element={<HospitalDetails hospitals={hospitals} />} />
                    <Route path="/edit-hospital/:name" element={<EditHospital hospitals={hospitals} updateHospital={updateHospital} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
