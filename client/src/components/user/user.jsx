import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Table } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';
import './user.css'

export const User = () => {
  const [isEditing, setIsEditing] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    id_employees: "",
    id_departments: "",
    id_societies: ""
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      console.log("Saving user data:", userData); // Log userData before saving
      await axios.put(`http://localhost:8000/api/users/${userData.id}`, userData);
      Swal.fire({
        icon: 'success',
        title: 'User updated successfully',
        showConfirmButton: false,
        timer: 1500
      });
      fetchUsers();
      setIsEditing(null);
      setUserData({
        name: "",
        email: "",
        password: "",
        role: "",
        id_employees: "",
        id_departments: "",
        id_societies: ""
      });
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update user. Please try again later.'
      });
    }
  };
  
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      console.log("Adding user data:", userData); // Log userData before adding
      await axios.post("http://localhost:8000/api/users", userData);
      Swal.fire({
        icon: 'success',
        title: 'User created successfully',
        showConfirmButton: false,
        timer: 1500
      });
      fetchUsers();
      setUserData({
        name: "",
        email: "",
        password: "",
        role: "",
        id_employees: "",
        id_departments: "",
        id_societies: ""
      });
    } catch (error) {
      console.error("Error creating user:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create user. Please try again later.'
      });
    }
  };
  
  const handleSubmit = isEditing ? handleSave : handleAdd;

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${userId}`);
      // Fetch updated list of users
      fetchUsers();
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'User deleted successfully',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete user. Please try again later.'
      });
    }
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find(user => user.id === userId);
    setIsEditing(userId);
    setUserData(userToEdit);
  };



  const handleCancel = () => {
    setIsEditing(null);
    setUserData({
      name: "",
      email: "",
      password: "",
      role: "",
      id_employees: "",
      id_departments: "",
      id_societies: ""
    });
  };


  return (
    <Row>
      <Col className="col-md-4">
        <Card style={{background:"transparent" ,border:'none',borderRadius:'none', borderRight:"1px solid grey"}}>
          <Card.Body>
            <h2>Add User</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" name="name" value={userData.name} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                autoComplete="off" 
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                autoComplete="off" 
                required
              />
            </Form.Group>
              <Form.Group controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" placeholder="Role" name="role" value={userData.role} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formBasicEmployeeId">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control type="text" placeholder="Employee ID" name="id_employees" value={userData.id_employees} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formBasicSocietyId">
                <Form.Label>Society ID</Form.Label>
                <Form.Control type="text" placeholder="Society ID" name="id_societies" value={userData.id_societies} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formBasicDepartmentId">
                <Form.Label>Department ID</Form.Label>
                <Form.Control type="text" placeholder="Department ID" name="id_departments" value={userData.id_departments} onChange={handleChange} required />
              </Form.Group>
              {isEditing ? (
              <>
                <Button variant="primary" type="submit" className="mt-2">
                  Save
                </Button>
                <Button variant="secondary" className="mt-2 ml-2" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="primary" type="submit" className="mt-2">
                Add User
              </Button>     
            )}

            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="bg-transparent user-card" style={{border:'none'}}>
          <Card.Body>
            <h2>Users</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>

                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="col-md-2" style={{textAlign:'center'}}>
                      <button className="btn btn-success" onClick={() => handleEdit(user.id)}>Edit</button>
                      <span>&nbsp;</span>
                      <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Remove</button>
                    </td>                 
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
