import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeList from '../components/EmployeeList'

const Employees = () => {

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('http://localhost:3001/api/users');
        const response = await axios.get('https://usercrudapifullstack.onrender.com/api/users');
        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='container vw-100 justify-content-center align-items-center'>
      <div className='container vw-100 justify-content-center align-items-center'>
        <h4>Employees</h4>
        <h6 className='mb-4'>Click on an individual employee to view details</h6>
      </div>
      <EmployeeList data={employeeData} />
    </div>
  )
}

export default Employees