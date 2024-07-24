import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './HospitalDetails.css';

const HospitalDetails = ({ hospitals }) => {
    const { name } = useParams();
    const hospital = hospitals.find(h => h.name === name);

    if (!hospital) {
        return <p>Hospital not found</p>;
    }

    return (
        <div className="hospital-details">
            <h2>{hospital.name}</h2>
            <p><strong>City:</strong> {hospital.city}</p>
            {hospital.imageUrl && <img src={hospital.imageUrl} alt={hospital.name} />}
            <p><strong>Specialities:</strong> {hospital.specialities.join(', ')}</p>
            <p><strong>Rating:</strong> {hospital.rating}</p>
            <p><strong>Description:</strong> {hospital.description || 'N/A'}</p>
            <p><strong>Number of Doctors:</strong> {hospital.numberOfDoctors || 'N/A'}</p>
            <p><strong>Number of Departments:</strong> {hospital.numberOfDepartments || 'N/A'}</p>
            <p><strong>Images:</strong> {hospital.images?.map((image, index) => (
                <img key={index} src={image} alt={`${hospital.name} ${index}`} />
            )) || 'N/A'}</p>
            <Link to={`/edit-hospital/${hospital.name}`}>Edit</Link>
        </div>
    );
};

export default HospitalDetails;
