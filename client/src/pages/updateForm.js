import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateForm = () => {
    const { id } = useParams();
    const navigation = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        department: '',
        position: '',
        email: '',
        phone: '',
        salary: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get(`http://localhost:3001/api/user/${id}`);
                const response = await axios.get(`https://usercrudapifullstack.onrender.com/api/user/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error.message);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // await axios.put(`http://localhost:3001/api/user/${id}`, formData);
            await axios.put(`https://usercrudapifullstack.onrender.com/api/user/${id}`, formData);
            navigation(`/employee/${id}`);
        } catch (error) {
            console.error('Error updating employee:', error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Update Employee Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                        Age:
                    </label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="department" className="form-label">
                        Department:
                    </label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="position" className="form-label">
                        Position:
                    </label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Phone:
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="salary" className="form-label">
                        Salary:
                    </label>
                    <input
                        type="number"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateForm;
