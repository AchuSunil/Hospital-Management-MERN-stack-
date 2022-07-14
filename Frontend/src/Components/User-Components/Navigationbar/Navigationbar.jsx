import React from "react";
import "./Navigationbar.css";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';

const departments = [
    { id: 1, name: "Oncology" },
    { id: 2, name: "Dermatology" },
];

const Navigationbar = () => {
    const navigate = useNavigate();

    return (
        <Navbar className="navbar" expand="lg" fixed="top">
            <Container>
            <span className="hospitalLogo"><LocalHospitalRoundedIcon/></span>
                <Navbar.Brand className="ms-3 me-5 text-color fs-3">
                  
                    <NavLink className="link" to="/">
                        Health Care Hospital
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-3 my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
                        <NavLink className="my-auto me-4 text-color" to="/">
                            Home
                        </NavLink>

                        <NavDropdown title="Departments" className="me-4" id="navbarScrollingDropdown">
                            {departments?.map((item) => {
                                return (
                                    <NavDropdown.Item key={item.id}>
                                        <NavLink className="departments" to={`/departments/${item.id}`}>
                                            {item.name}
                                        </NavLink>
                                    </NavDropdown.Item>
                                );
                            })}
                        </NavDropdown>
                        <NavLink className="my-auto me-4 text-color" to="/bookappointment">
                            Book An Apointment
                        </NavLink>
                        <Nav.Link href="#action1" className="me-4 text-color">
                            Account Info
                        </Nav.Link>
                        <NavDropdown title="About Us" className="me-5" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Facilities & Services</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Health Packages</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Contact Us</NavDropdown.Item>
                        </NavDropdown>
                        <div className="auth">
                            <Button
                                className="me-3"
                                variant="outline-light"
                                onClick={() => {
                                    navigate("/Login");
                                }}
                            >
                                Login
                            </Button>
                            <Button variant="outline-light"  onClick={() => {
                                    navigate("/Signup");
                                }}>Signup</Button>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigationbar;
