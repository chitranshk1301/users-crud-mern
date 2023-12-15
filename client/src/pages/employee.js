import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get(`http://localhost:3001/api/user/${id}`);
                const response = await axios.get(`https://usercrudapifullstack.onrender.com/api/user/${id}`);
                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error.message);
            }
        };

        fetchData();
    }, [id]);

    if (!employee) {
        return <div>Loading...</div>; // Add a loading indicator while data is being fetched.
    }

    return (
        <div className="card shadow p-4 bg-light bg-gradient p-5" style={{ backgroundColor: '#f8f9fa' }}>
            <h1 className="card-title h1 mb-4 text-primary">Employee Details</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-4">
                        <strong className='h4'>Name:</strong>
                        <p className="text-muted h6">{employee.name}</p>
                    </div>
                    <div className="mb-4">
                        <strong className='h4'>Age:</strong>
                        <p className="text-muted h6">{employee.age}</p>
                    </div>
                    <div className="mb-4">
                        <strong className='h4'>Department:</strong>
                        <p className="text-muted h6">{employee.department}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-4">
                        <strong className='h4'>Position:</strong>
                        <p className="text-muted h6">{employee.position}</p>
                    </div>
                    <div className="mb-4">
                        <strong className='h4'>Email:</strong>
                        <p className="text-muted h6">{employee.email}</p>
                    </div>
                    <div className="mb-4">
                        <strong className='h4'>Phone:</strong>
                        <p className="text-muted h6">{employee.phone}</p>
                    </div>
                    <div className="mb-4">
                        <strong className='h4'>Salary:</strong>
                        <p className="text-muted h6">{employee.salary}</p>
                    </div>
                </div>
            </div>
            <Link to={`/employee/${id}/update`} className="btn btn-primary">
                Update Details
            </Link>
        </div>
    );
};

export default EmployeeDetails;
