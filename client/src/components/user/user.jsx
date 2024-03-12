import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';


export const User = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        id_employees: "",
        id_departments: "", // Update this key
        id_societies: ""
      });
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
          ...userData,
          [name]: value
        });
      };
      

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/users", userData);
      console.log(response.data);
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'User created successfully',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Error creating user:", error);
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create user. Please try again later.'
      });
    }
  };
  

  return (
    <div className="mb-3" >
      <h2>Add User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2 col-md-4" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" name="name" value={userData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-2 col-md-4"  controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={userData.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-2 col-md-4"  controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={userData.password} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-2 col-md-4"  controlId="formBasicRole">
          <Form.Label>Role</Form.Label>
          <Form.Control type="text" placeholder="Role" name="role" value={userData.role} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-2 col-md-4"  controlId="formBasicEmployeeId">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control type="text" placeholder="Employee ID" name="id_employees" value={userData.id_employees} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-2 col-md-4"  controlId="formBasicSocietyId">
          <Form.Label>Society ID</Form.Label>
          <Form.Control type="text" placeholder="Society ID" name="id_societies" value={userData.id_societies} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-2 col-md-4"  controlId="formBasicDepartmentId">
          <Form.Label>Department ID</Form.Label>
          <Form.Control type="text" placeholder="Department ID" name="id_departments" value={userData.id_departments} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add User
        </Button>
      </Form>
    </div>
  );
};
