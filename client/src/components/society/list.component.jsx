import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SocietyList() {
    const [societies, setSocieties] = useState([]);

    useEffect(() => {
        fetchSocieties();
    }, []);

    const fetchSocieties = async () => {
        await axios.get(`http://localhost:8000/api/societies`).then(({ data }) => {
            setSocieties(data);
        });
    };

    const deleteSocieties = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed;
        });

        if (!isConfirm) {
            return;
        }

        await axios.delete(`http://localhost:8000/api/societies/${id}`).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            });
            fetchSocieties();
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            });
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Link className="btn btn-primary mb-2 float-end" to={"/society/create"}>
                        Create Society
                    </Link>
                </div>
                <div className="col-12" style={{border:'none'}}>
                    <Card style={{backgroundColor:'transparent',border:'none'}}>
                        <Card.Body  style={{backgroundColor:'transparent'}}>
                            <div>
                                <table style={{width:"100%" ,background:'transparent'}}>
                                    <thead>
                                        <tr>
                                            <th>Company name</th>
                                            <th>Address</th>
                                            <th>Company email</th>
                                            <th>Nif</th>
                                            <th>Stat</th>
                                            <th>Logo</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            societies.length > 0 && (
                                                societies.map((row, key) => (
                                                    <tr key={key}>
                                                        <td>{row.company_name}</td>
                                                        <td>{row.address}</td>
                                                        <td>{row.company_email}</td>
                                                        <td>{row.nif}</td>
                                                        <td>{row.stat}</td>
                                                        <td>
                                                            <img width="50px" src={`http://localhost:8000/storage/society/logo/${row.logo}`} alt="Society Logo" />
                                                        </td>
                                                        <td>
                                                            <Link to={`/society/edit/${row.id}`} className='btn btn-success me-2'>
                                                                Edit
                                                            </Link>
                                                            <Button variant="danger" onClick={() => deleteSocieties(row.id)}>
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}
