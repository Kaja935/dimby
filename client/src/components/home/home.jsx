import React, { useState } from "react";
import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt ,faUser, faBuilding, faMobileButton, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import SocietyList from "../society/list.component";
import { User } from "../user/user";
import CreateSociety from "../society/create.component";
import EditSociety from "../society/edit.component";
import "./home.css"

export const Home = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [value, setValue] = useState();
  
    const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
    };
  
    const handleClick = (val) => {
      setValue(val);
    };
  
    const renderContent = () => {
      switch (value) {
        case 1:
          return <SocietyList />;
        case 2:
          return <User />;
        default:
          return <h1>Home</h1>;
      }
    };
  
    return (
      <div className="home">
        <Navbar bg="transparent" variant="light" className="fixed-top text-dark">
          <Button variant="outline-light" style={{ border: "none" }} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} style={{ color: "black" }} />
          </Button>
          <Container>
            <div className="logo"></div>
          </Container>
        </Navbar>
        <Container fluid className="mt-5" style={{ marginTop: "250px" }}>
          <Row>
            {showSidebar && (
              <Col
                xs={2}
                className="sidebar"
                style={{
                  backgroundColor: "#d9d9d9",
                  minHeight: "90vh",
                  marginTop: "25px",
                  borderRadius: "20px",
                  position: "relative"
                }}
              >
                <br></br>
                <div onClick={() => handleClick(1)}>
                  <FontAwesomeIcon icon={faBuilding} style={{ color: "black" }} /> Societe
                </div>
                <div onClick={() => handleClick(2)}>
                  <FontAwesomeIcon icon={faUser} style={{ color: "black" }} /> Utilisateur
                </div>
                <div style={{ position: "absolute", bottom: "20px", left: '15%' }}>
                  <Button style={{ background: "none", border: "none", color: "black" }}>
                    <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "red" }} /> se deconnecter
                  </Button>
                </div>
              </Col>
            )}
            <Col xs={showSidebar ? 10 : 12}>
              <div className=" mt-5">{renderContent()}</div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
  


