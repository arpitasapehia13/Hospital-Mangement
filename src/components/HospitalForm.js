import React, { useState } from 'react';
import './HospitalForm.css';

const HospitalForm = ({ addHospital }) => {
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        imageUrl: '',
        specialities: [],
        rating: ''
    });

    const specialitiesOptions = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSpecialitiesChange = (e) => {
        const { options } = e.target;
        const selectedSpecialities = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedSpecialities.push(options[i].value);
            }
        }
        setFormData({
            ...formData,
            specialities: selectedSpecialities
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addHospital(formData);
        setFormData({
            name: '',
            city: '',
            imageUrl: '',
            specialities: [],
            rating: ''
        });
    };

    return (
        <form className="hospital-form" onSubmit={handleSubmit}>
            <h2>Add New Hospital</h2>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
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
                    required
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
                <label htmlFor="specialities">Specialities:</label>
                <select
                    id="specialities"
                    name="specialities"
                    multiple
                    value={formData.specialities}
                    onChange={handleSpecialitiesChange}
                    size={5} // Adjust the size as needed
                >
                    {specialitiesOptions.map((speciality) => (
                        <option key={speciality} value={speciality}>
                            {speciality}
                        </option>
                    ))}
                </select>
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
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default HospitalForm;
