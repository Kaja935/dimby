import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const Department= () => {

    const [departments, setDepartments] = useState([]);
    const [newDepartment, setNewDepartment] = useState({
        coded: '',
        description: '',
        id_societies: '',
    });

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/departments');
            setDepartments(response.data.departments);
        } catch (error) {
            console.error('Failed to fetch departments:', error);
        }
    };

    const createDepartment = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/departments', newDepartment);
            setDepartments([...departments, response.data.department]);
            setNewDepartment({
                coded: '',
                description: '',
                id_societies: '',
            });
        } catch (error) {
            console.error('Failed to create department:', error);
        }
    };

    const deleteDepartment = async (id) => {
        console.log('Deleting department with ID:', id);
        try {
            await axios.delete(`http://localhost:8000/api/departments/${id}`);
            setDepartments(departments.filter(department => department.id !== id));
        } catch (error) {
            console.error('Failed to delete department:', error);
        }
    };
    

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Create Department</h2>
                    <Form>
                        <Form.Group controlId="coded">
                            <Form.Label>Coded</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Coded"
                                value={newDepartment.coded}
                                onChange={(e) => setNewDepartment({ ...newDepartment, coded: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Description"
                                value={newDepartment.description}
                                onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="id_societies">
                            <Form.Label>ID Societies</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter ID Societies"
                                value={newDepartment.id_societies}
                                onChange={(e) => setNewDepartment({ ...newDepartment, id_societies: e.target.value })}
                            />
                        </Form.Group>
                        <Button variant="primary mt-2" onClick={createDepartment}>
                            Create
                        </Button>
                    </Form>
                </Col>
                <Col className='bg-transparent'>
                    <h2>Department List</h2>
                    <table  style={{width:'100%',backgroundColor:'transparent'}}>
                        <thead style={{backgroundColor:'transparent'}}>
                            <tr>
                                <th>coded</th>
                                <th>description</th>
                                <th>society</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                        {departments.map(department => (
                             <tr key={department.coded}>
                                <td>{department.coded}</td>
                                <td>{department.description}</td>
                                <td>{department.id_societies}</td>
                                <td><button className="btn btn-danger" onClick={() => deleteDepartment(department.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                </td>
                             </tr>
                            
                        ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    );
};

