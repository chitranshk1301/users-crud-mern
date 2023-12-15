import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeStatsCard = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`http://localhost:3001/api/users`);
        const response = await axios.get(`https://usercrudapifullstack.onrender.com/api/users`);
        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error.message);
      }
    };

    fetchData();
  }, []);
  // Function to calculate average salary
  const calculateAverageSalary = () => {
    // Check if employeeData is defined and not an empty array
    if (!employeeData || employeeData.length === 0) {
      return 0;
    }

    let totalSalary = 0;

    for (const employee of employeeData) {
      totalSalary += employee.salary;
    }
    return (totalSalary / employeeData.length).toFixed(2);
  };

  // Function to find the position with the most employees
  const findMostCommonPosition = () => {
    const positionCounts = {};

    // Count the occurrences of each position
    employeeData.forEach((employee) => {
      positionCounts[employee.position] = (positionCounts[employee.position] || 0) + 1;
    });

    // Find the maximum count
    const maxCount = Math.max(...Object.values(positionCounts));

    // Find all positions with the maximum count
    const mostCommonPositions = Object.keys(positionCounts).filter(
      (position) => positionCounts[position] === maxCount
    );

    // If there's a tie, return an array of the most common positions; otherwise, return the single position
    return mostCommonPositions.length > 1 ? mostCommonPositions : mostCommonPositions[0];
  };


  const totalEmployees = employeeData.length;
  const averageSalary = calculateAverageSalary();
  const mostCommonPosition = findMostCommonPosition();

  return (
    <div className="card shadow-sm p-4 mb-5 " style={{ backgroundColor: '#f8f9fa' }}>
      <h2 className="card-title h4 mb-4 text-primary">Employee Statistics</h2>
      <div className="row">
        <div className="col-md-4">
          <p className="card-text">
            <strong>Total Employees:</strong> {totalEmployees}
          </p>
        </div>
        <div className="col-md-4">
          <p className="card-text">
            <strong>Average Salary:</strong> INR {averageSalary}
          </p>
        </div>
        <div className="col-md-4">
          <p className="card-text">
            <strong>Most Common Position:</strong> {mostCommonPosition}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStatsCard;
