import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form, Button, ListGroup, Card, CardHeader } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './departement.css'
export const Department = () => {
    const [societies, setSocieties] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [newDepartment, setNewDepartment] = useState({
        coded: "",
        description: "",
        id_societies: "",
    });
    const [editedDepartment, setEditedDepartment] = useState({
        coded: "",
        description: "",
        id_societies: "",
    });

    const editDepartment = (department) => {
        setIsEditing(department.id);
        setEditedDepartment({
            coded: department.coded,
            description: department.description,
            id_societies: department.id_societies,
        });
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/departments");
            setDepartments(response.data.departments);
        } catch (error) {
            console.error("Failed to fetch departments:", error);
        }
    };

    const fetchSocieties = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/societies");
            setSocieties(response.data);
        } catch (error) {
            console.error("Error fetching societies:", error);
        }
    };

    useEffect(() => {
        fetchSocieties();
    }, []);

    const createDepartment = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/departments", newDepartment);
            setDepartments([...departments, response.data.department]);
            setNewDepartment({
                coded: "",
                description: "",
                id_societies: "",
            });
            toast.success('Department created succesfully')
        } catch (error) {
            console.error("Failed to create department:", error);
        }
    };

    const updateDepartment = async () => {
        try {
            await axios.put(`http://localhost:8000/api/departments/${isEditing}`, editedDepartment);
            setDepartments(departments.map((department) => (department.id === isEditing ? editedDepartment : department)));
            setIsEditing(null);
            setEditedDepartment({
                coded: "",
                description: "",
                id_societies: "",
            });
        } catch (error) {
            console.error("Failed to update department:", error);
        }
    };

    const deleteDepartment = async (id) => {
        console.log("Deleting department with ID:", id);
        try {
            await axios.delete(`http://localhost:8000/api/departments/${id}`);
            setDepartments(departments.filter((department) => department.id !== id));
        } catch (error) {
            console.error("Failed to delete department:", error);
        }
    };

    return (
        <Container>
            <Row>
                <Col md={5}>
                <Card style={{backgroundColor:'transparents',background:"transparent" ,border:'none'}}>
                    <Card.Header className='' style={{backgroundColor:'#50b64a',color:'white',textAlign:'center'}}>  <h2>{isEditing ? "Edit Department" : "Create Department"}</h2></Card.Header>                        
                    <Form>
                        <Form.Group controlId="coded">
                            <Form.Label>Coded</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Coded"
                                value={isEditing ? editedDepartment.coded : newDepartment.coded}
                                onChange={(e) => (isEditing ? setEditedDepartment({ ...editedDepartment, coded: e.target.value }) : setNewDepartment({ ...newDepartment, coded: e.target.value }))}
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Description"
                                value={isEditing ? editedDepartment.description : newDepartment.description}
                                onChange={(e) => (isEditing ? setEditedDepartment({ ...editedDepartment, description: e.target.value }) : setNewDepartment({ ...newDepartment, description: e.target.value }))}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicSocietyId">
                            <Form.Label>Society ID</Form.Label>
                            <Form.Control as="select" name="id_societies" onChange={(e) => (isEditing ? setEditedDepartment({ ...editedDepartment, id_societies: e.target.value }) : setNewDepartment({ ...newDepartment, id_societies: e.target.value }))} value={isEditing ? editedDepartment.id_societies : newDepartment.id_societies}>
                                <option value="">Select Society</option>
                                {societies.map((society) => (
                                    <option key={society.id} value={society.id}>
                                        {society.company_name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        {isEditing ? (
                            <Button variant="primary mt-2" onClick={updateDepartment}>
                                Update
                            </Button>
                        ) : (
                            <Button variant="primary mt-2" onClick={createDepartment}>
                                Create
                            </Button>
                        )}
                    </Form>
                    </Card>
                </Col>
                <Col md={7} className="bg-transparent">
                    <Card className='department-table bg-transparent' style={{backgroundColor:'transparent',border:'none'}}>
                    <Card.Header className='' style={{backgroundColor:'#50b64a',color:'white',textAlign:'center'}}><h2>Department List</h2></Card.Header>
                    <table className='departement-table'    style={{ width: "100%", backgroundColor: "transparent" }}>
                        <thead style={{ backgroundColor: "transparent" }}>
                            <tr>
                                <th>coded</th>
                                <th>description</th>
                                <th>society</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((department) => (
                                <tr key={department.id}>
                                    <td>{department.coded}</td>
                                    <td>{department.description}</td>
                                    <td>{department.id_societies}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteDepartment(department.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        <span>&nbsp;</span>
                                        <button className="btn btn-primary ml-2" onClick={() => editDepartment(department)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

