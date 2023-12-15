import React, { useEffect, useState } from 'react';
import { Bar, Pie, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement
)

const EmployeeCharts = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users');
        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error.message);
      }
    };

    fetchData();
  }, []);

  const getAgeDistributionData = () => {
    const ageCounts = {};

    // Count the occurrences of each age
    employeeData.forEach((employee) => {
      ageCounts[employee.age] = (ageCounts[employee.age] || 0) + 1;
    });

    const labels = Object.keys(ageCounts).map((age) => parseInt(age, 10));
    const data = Object.values(ageCounts);

    return {
      labels: labels.map(String),
      datasets: [
        {
          label: 'Age Distribution',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const getDepartmentPieChartData = () => {
    const departmentCounts = {};

    // Count the occurrences of each department
    employeeData.forEach((employee) => {
      departmentCounts[employee.department] = (departmentCounts[employee.department] || 0) + 1;
    });

    const labels = Object.keys(departmentCounts);
    const data = Object.values(departmentCounts);

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const getSalaryBoxPlotData = () => {
    const sortedSalaries = employeeData.map((employee) => employee.salary).sort((a, b) => a - b);
    const q1 = sortedSalaries[Math.floor(sortedSalaries.length / 4)];
    const median = sortedSalaries[Math.floor(sortedSalaries.length / 2)];
    const q3 = sortedSalaries[Math.floor((3 * sortedSalaries.length) / 4)];
    const iqr = q3 - q1;
    const lowerOutlier = q1 - 1.5 * iqr;
    const upperOutlier = q3 + 1.5 * iqr;

    const boxPlotData = [
      {
        label: 'Box Plot',
        data: [
          { x: 'Quartile 1', y: q1 },
          { x: 'Median', y: median },
          { x: 'Quartile 3', y: q3 },
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      ...sortedSalaries
        .filter((salary) => salary < lowerOutlier || salary > upperOutlier)
        .map((outlier) => ({
          label: 'Outlier',
          data: [{ x: 'Outlier', y: outlier }],
          backgroundColor: 'rgba(255, 0, 0, 1)',
        })),
    ];

    return boxPlotData;
  };

  const boxPlotOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Salary Range',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Salary',
        },
      },
    },
  };

  // Check if employeeData is empty before rendering
  if (employeeData.length === 0) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <Bar data={getAgeDistributionData()} />
        </div>
        <div className="col-md-6">
          <Pie data={getDepartmentPieChartData()} />
        </div>
        <div>
          <Scatter data={{ datasets: getSalaryBoxPlotData() }} options={boxPlotOptions} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeCharts;

