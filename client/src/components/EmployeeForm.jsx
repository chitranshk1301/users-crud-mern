import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    age: '',
    department: '',
    email: '',
    phone: '',
    position: '',
    salary: '',
  });

  const [errors, setErrors] = useState({});

  const departments = ['HR', 'IT', 'Finance', 'Marketing'];
  const positions = ['Manager', 'Developer', 'Designer', 'Analyst'];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Add validation checks for each field
    if (!employeeData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!employeeData.age.trim() || isNaN(employeeData.age) || +employeeData.age <= 0) {
      newErrors.age = 'Age must be a positive number';
    }

    if (!employeeData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!employeeData.email.trim() || !/^\S+@\S+\.\S+$/.test(employeeData.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!employeeData.phone.trim() || !/^\d{10}$/.test(employeeData.phone)) {
      newErrors.phone = 'Phone must be a 10-digit number';
    }

    if (!employeeData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    if (!employeeData.salary.trim() || isNaN(employeeData.salary) || +employeeData.salary <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // await axios.post('http://localhost:3001/api/user', employeeData);
        await axios.post('https://usercrudapifullstack.onrender.com/api/user', employeeData);
        console.log('Employee Data:', employeeData);

        // Reset the form after submission
        setEmployeeData({
          name: '',
          age: '',
          department: '',
          email: '',
          phone: '',
          position: '',
          salary: '',
        });
      } catch (error) {
        console.error('Error submitting form:', error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={employeeData.name}
          onChange={handleChange}
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          required
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age:
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={employeeData.age}
          onChange={handleChange}
          className={`form-control ${errors.age ? 'is-invalid' : ''}`}
          required
        />
        {errors.age && <div className="invalid-feedback">{errors.age}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="department" className="form-label">
          Department:
        </label>
        <select
          id="department"
          name="department"
          value={employeeData.department}
          onChange={handleChange}
          className={`form-select ${errors.department ? 'is-invalid' : ''}`}
          required
        >
          <option value="" disabled>Select department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        {errors.department && <div className="invalid-feedback">{errors.department}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={employeeData.email}
          onChange={handleChange}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          required
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={employeeData.phone}
          onChange={handleChange}
          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          required
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="position" className="form-label">
          Position:
        </label>
        <select
          id="position"
          name="position"
          value={employeeData.position}
          onChange={handleChange}
          className={`form-select ${errors.position ? 'is-invalid' : ''}`}
          required
        >
          <option value="" disabled>Select position</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
        {errors.position && <div className="invalid-feedback">{errors.position}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="salary" className="form-label">
          Salary:
        </label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={employeeData.salary}
          onChange={handleChange}
          className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
          required
        />
        {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
