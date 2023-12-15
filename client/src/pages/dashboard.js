import React from 'react'
import EmployeeCharts from '../components/EmployeeCharts'


const Dashboard = () => {
  return (
    <div className='container-fluid mt-5'>
        <h2>Welcome to the Employee Dashboard!</h2>
        <EmployeeCharts />
    </div>
  )
}

export default Dashboard
