import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HospitalList.css';

const HospitalList = ({ hospitals, deleteHospital }) => {
    const [selectedCity, setSelectedCity] = useState('');

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    const handleDelete = (hospitalName) => {
        if (window.confirm('Are you sure you want to delete this hospital?')) {
            deleteHospital(hospitalName);
        }
    };

    const filteredHospitals = selectedCity
        ? hospitals.filter(hospital => hospital.city.toLowerCase() === selectedCity.toLowerCase())
        : hospitals;

    return (
        <div className="hospital-list">
            <h2>Hospital List</h2>
            <div className="filter">
                <label htmlFor="city">Filter by City:</label>
                <input
                    type="text"
                    id="city"
                    value={selectedCity}
                    onChange={handleCityChange}
                />
            </div>
            <div className="hospital-cards">
                {filteredHospitals.map((hospital, index) => (
                    <div key={index} className="hospital-card">
                        <h3>{hospital.name}</h3>
                        <p><strong>City:</strong> {hospital.city}</p>
                        {hospital.imageUrl && <img src={hospital.imageUrl} alt={hospital.name} />}
                        <p><strong>Specialities:</strong> {hospital.specialities.join(', ')}</p>
                        <p><strong>Rating:</strong> {hospital.rating}</p>
                        <div className="hospital-card-buttons">
                            <Link to={`/hospital/${hospital.name}`}>Details</Link>
                            <button onClick={() => handleDelete(hospital.name)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HospitalList;
