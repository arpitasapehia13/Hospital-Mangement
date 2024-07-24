import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditHospital.css';

const EditHospital = ({ hospitals, updateHospital }) => {
    const { name } = useParams();
    const navigate = useNavigate();
    const hospital = hospitals.find(h => h.name === name);

    const [formData, setFormData] = useState({
        ...hospital,
        description: hospital.description || '',
        images: hospital.images || [],
        numberOfDoctors: hospital.numberOfDoctors || '',
        numberOfDepartments: hospital.numberOfDepartments || '',
    });

    useEffect(() => {
        if (!hospital) {
            navigate('/');
        }
    }, [hospital, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateHospital(formData);
        navigate(`/hospital/${formData.name}`);
    };

    return (
        <form className="edit-hospital-form" onSubmit={handleSubmit}>
            <h2>Edit Hospital Details</h2>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    readOnly
                />
            </div>
            <div className="form-group">
                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    readOnly
                />
            </div>
            <div className="form-group">
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="1"
                    max="5"
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="numberOfDoctors">Number of Doctors:</label>
                <input
                    type="number"
                    id="numberOfDoctors"
                    name="numberOfDoctors"
                    value={formData.numberOfDoctors}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="numberOfDepartments">Number of Departments:</label>
                <input
                    type="number"
                    id="numberOfDepartments"
                    name="numberOfDepartments"
                    value={formData.numberOfDepartments}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="images">Additional Images (comma-separated URLs):</label>
                <input
                    type="text"
                    id="images"
                    name="images"
                    value={formData.images.join(',')}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value.split(',') })}
                />
            </div>
            <button type="submit">Update</button>
        </form>
    );
};

export default EditHospital;
