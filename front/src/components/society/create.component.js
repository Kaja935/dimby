import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateSociety() {
  const navigate = useNavigate();

  const [company_name, setCompany_name] = useState("")
  const [address, setAddress] = useState("")
  const [company_email, setCompany_email] = useState("")
  const [nif, setNif] = useState("")
  const [stat, setStat] = useState("")
  const [logo, setLogo] = useState()
  const [validationError,setValidationError] = useState({})

  const changeHandler = (event) => {
		setLogo(event.target.files[0]);
	};

  const createSociety = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('company_name', company_name)
    formData.append('address', address)
    formData.append('company_email', company_email)
    formData.append('nif', nif)
    formData.append('stat', stat)
    formData.append('logo', logo)

    await axios.post(`http://localhost:8000/api/societies`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/society")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create Society</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={createSociety}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Company_name">
                            <Form.Label>Company name</Form.Label>
                            <Form.Control type="text" value={company_name} onChange={(event)=>{
                              setCompany_name(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" value={address} onChange={(event)=>{
                              setAddress(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Company_email">
                            <Form.Label>Company email</Form.Label>
                            <Form.Control type="text" value={company_email} onChange={(event)=>{
                              setCompany_email(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Nif">
                            <Form.Label>Nif</Form.Label>
                            <Form.Control type="text" value={nif} onChange={(event)=>{
                              setNif(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Stat">
                            <Form.Label>Stat</Form.Label>
                            <Form.Control type="text" value={stat} onChange={(event)=>{
                              setStat(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Logo" className="mb-3">
                        <Form.Label>Logo</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}