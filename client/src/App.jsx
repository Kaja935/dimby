import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Home } from "./components/home/home";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import { Login } from "./components/login/login";
import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import EditSociety from "./components/society/edit.component";
import SocietyList from "./components/society/list.component";
import CreateSociety from "./components/society/create.component";
// import Index from "./components";
// import DepartmentList from "./components/department/DepartmentList";
// import CreateDepartment from "./components/department/CreateDepartment";
// import EditDepartment from "./components/department/EditDepartment";

function App() {
  return (
  // <Router>
  //   <Navbar bg="primary">
  //     <Container>
  //       <Link to={"/"} className="navbar-brand text-white">
  //         CT Motors
  //       </Link>
  //       <Link to={"/society"} className="navbar-brand text-white">
  //         Society
  //       </Link>
  //       <Link to={"/department"} className="navbar-brand text-white">
  //         Département
  //       </Link>
  //     </Container>
  //   </Navbar>

  //   <Container className="mt-5">
  //     <Row>
  //       <Col md={12}>
  //         <Routes>
  //           <Route path="/society/create" element={<CreateSociety />} />
  //           <Route path="/society/edit/:id" element={<EditSociety />} />
  //           <Route path="/society" element={<SocietyList />} />
  //           {/* <Route path="/department" element={<DepartmentList />} />
  //           <Route path="/department/create" element={<CreateDepartment />} />
  //           <Route path="/department/edit/:id" element={<EditDepartment />} /> */}
  //           {/* <Route exact path='/' element={<Index />} /> */}
  //         </Routes>
  //       </Col>
  //     </Row>
  //   </Container>
  // </Router>
  <Router>
    <Routes>
     <Route path="/society/create" element={<CreateSociety />} />
     <Route path="/society/edit/:id" element={<EditSociety />} />
    <Route path="/society" element={<SocietyList />} />
    <Route path="/home" element={<Home />} />
    <Route path='/' element={<Login />} />
    </Routes> 
  </Router>
  )
}


export default App; 