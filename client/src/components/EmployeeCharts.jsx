import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
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
import EmployeeStatsCard from './EmployeeStatsCard'

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
        // const response = await axios.get(`http://localhost:3001/api/users`);
        const response = await axios.get(`https://usercrudapifullstack.onrender.com/api/users`);
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

  const getPositionChartData = () => {
    const positionCounts = {};

    employeeData.forEach((employee) => {
      positionCounts[employee.position] = (positionCounts[employee.position] || 0) + 1;
    });

    const labels = Object.keys(positionCounts);
    const data = Object.values(positionCounts);

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


  const getDepartmentPieChartData = () => {
    const departmentCounts = {};

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

  // const getSalaryBoxPlotData = () => {
  //   const sortedSalaries = employeeData.map((employee) => employee.salary).sort((a, b) => a - b);
  //   const q1 = sortedSalaries[Math.floor(sortedSalaries.length / 4)];
  //   const median = sortedSalaries[Math.floor(sortedSalaries.length / 2)];
  //   const q3 = sortedSalaries[Math.floor((3 * sortedSalaries.length) / 4)];
  //   const iqr = q3 - q1;
  //   const lowerOutlier = q1 - 1.5 * iqr;
  //   const upperOutlier = q3 + 1.5 * iqr;

  //   const boxPlotData = [
  //     {
  //       label: 'Box Plot',
  //       data: [
  //         { x: 'Quartile 1', y: q1 },
  //         { x: 'Median', y: median },
  //         { x: 'Quartile 3', y: q3 },
  //       ],
  //       borderColor: 'rgba(75, 192, 192, 1)',
  //       backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //     },
  //     ...sortedSalaries
  //       .filter((salary) => salary < lowerOutlier || salary > upperOutlier)
  //       .map((outlier) => ({
  //         label: 'Outlier',
  //         data: [{ x: 'Outlier', y: outlier }],
  //         backgroundColor: 'rgba(255, 0, 0, 1)',
  //       })),
  //   ];

  //   return boxPlotData;
  // };

  // const boxPlotOptions = {
  //   scales: {
  //     x: {
  //       title: {
  //         display: true,
  //         text: 'Salary Range',
  //       },
  //     },
  //     y: {
  //       title: {
  //         display: true,
  //         text: 'Salary',
  //       },
  //     },
  //   },
  // };

  // // If no data then loading...
  // if (employeeData.length === 0) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container mt-5">
      <EmployeeStatsCard employeeData={employeeData} />
      <div className="row">
        <div className="col-md-6">
          <h6>Employee's age Distribution</h6>
          <Bar data={getAgeDistributionData()} />
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6">
              <h6>Departments Distribution</h6>
              <Pie data={getDepartmentPieChartData()} />
            </div>
            <div className="col-md-6">
              <h6>Employee Position's Distribution</h6>
              <Pie data={getPositionChartData()} />
            </div>
          </div>
        </div>
        {/* <div className="col-md-12 mt-4">
          <h6>Salary Distribution</h6>
          <Scatter data={{ datasets: getSalaryBoxPlotData() }} options={boxPlotOptions} />
        </div> */}
      </div>
    </div>

  );
};

export default EmployeeCharts;

