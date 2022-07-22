import React from "react";
import "./department.scss";
import deptBanner from "../../../Assets/images/dept-banner/deptbanner.jpg";
import { Breadcrumbs, Typography, Link, Container } from "@mui/material";
import Divider from "@mui/material/Divider";
import DepartmentTabs from "./DepartmentTabs";


const Department = () => {
    return (
        <>
            <div className="department-main">
                <div className="dept-banner">
                    <img src={deptBanner} width={"100%"} height={"240px"} alt="image" />
                </div>
                <div className="dept-info-wrapper">
                    <Container>
                        <div className="title-info">
                            <div className="dept-title">
                                <h4 style={{ color: "#145DA0" }}>Cardiology</h4>
                            </div>
                            <div className="breadcrump">
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link underline="hover" color="inherit" href="/">
                                        Home
                                    </Link>
                                    <Typography component='span' sx={{ color: "inherit", fontWeight: "bold" }}>Departments</Typography>
                                    <Typography component='span'  sx={{ color: "#E55451", fontWeight: "bold" }}>Cardiology</Typography>
                                </Breadcrumbs>
                            </div>
                        </div>
                        <Divider sx={{ width: "100%", backgroundColor: "lightgray", borderBottomWidth: 2 }} />

                        <div className="dept-details">
                            <DepartmentTabs />
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default Department;
