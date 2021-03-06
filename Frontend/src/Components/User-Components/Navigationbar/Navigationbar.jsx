import React, { useEffect } from "react";
import "./Navigationbar.css";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import { toast } from "react-toastify";
import { toastifyInfo } from "../../../Assets/toastify/toastifyInfo";
import { logout, reset } from "../../../redux-toolkit/features/authSlice";

//reduxtoolkit
import { useDispatch, useSelector } from "react-redux";

const departments = [
    { id: 1, name: "Oncology" },
    { id: 2, name: "Dermatology" },
];

const Navigationbar = () => {
    // const dispatch = useDispatch()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user,isSuccess, isMessage } = useSelector((state) => state.user);
    useEffect(() => {
        console.log("navbar useEffect")
        if (isSuccess) {
            toast.success(isMessage, toastifyInfo.success);
            dispatch(reset());
            navigate("/");
        }
    }, [dispatch]);
    return (
        <Navbar className="navbar" expand="lg" fixed="top">
            <Container>
                <span className="hospitalLogo">
                    <LocalHospitalRoundedIcon />
                </span>
                <Navbar.Brand className="ms-1 me-5 text-color fs-3">
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
                        {user && (
                            <NavDropdown title="Account Info" className="me-4" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Profile Settings</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">My Appointments</NavDropdown.Item>
                            </NavDropdown>
                        )}

                        <NavDropdown title="About Us" className="me-5" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Facilities & Services</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Health Packages</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Contact Us</NavDropdown.Item>
                        </NavDropdown>
                        {user ? (
                            <Button
                                size="sm"
                                className="ms-2"
                                variant="outline-light"
                                onClick={() => {
                                    dispatch(logout());
                                }}
                            >
                                Logout
                            </Button>
                        ) : (
                            <div className="auth">
                                <Button
                                    className="me-3"
                                    size="sm"
                                    variant="outline-light"
                                    onClick={() => {
                                        navigate("/Login");
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    onClick={() => {
                                        navigate("/Signup");
                                    }}
                                >
                                    Signup
                                </Button>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigationbar;
