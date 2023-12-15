import React from 'react';
import EmployeeForm from '../components/EmployeeForm';

const CreateEmployee = () => {
  return (
    <div className="container-fluid d-flex flex-column align-items-center bg-secondary bg-gradient">
      <div className="card p-4 shadow bg-light bg-gradient mt-5 mb-4 w-75">
        <h1 className="text-center mb-4">Create a new Employee</h1>
        <EmployeeForm />
      </div>
    </div>
  );
};

export default CreateEmployee;

