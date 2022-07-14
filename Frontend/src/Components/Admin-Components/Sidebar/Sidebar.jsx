import "./sidebar.scss";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddBoxIcon from "@mui/icons-material/AddBox";


const Sidebar = () => {

   const logout = () => {
        localStorage.removeItem("adminInfo");
      };


    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">Admin</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className="title">LISTS</p>
                    <Link to="/admin/userlist" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/admin/doctorlist" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>Doctors</span>
                        </li>
                    </Link>
                    <Link to="/admin/departmentlist" style={{ textDecoration: "none" }}>
                        <li>
                            <AddBoxIcon className="icon" />
                            <span>Departments</span>
                        </li>
                    </Link>

                    <p className="title">SERVICE</p>
                    <Link to="/admin/bannerlist" style={{ textDecoration: "none" }}>
                    <li>
                        <ViewCarouselIcon className="icon" />
                        <span>Banners</span>
                    </li>
                    </Link>
                    <p className="title">USER</p>
                    <li>
                        <ExitToAppIcon className="icon" />
                        <span
                            onClick={() => {
                                logout();
                                navigate("/admin");
                            }}
                        >
                            Logout
                        </span>
                    </li> 
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
