import React from "react";
import "./widgets.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link } from "react-router-dom";

const Widgets = ({ count,type }) => {
    
    let data;

    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isUser: true,
                link: "/admin/userlist",
                linkName:"View all Users",
                icon: (
                    <PersonOutlinedIcon
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "doctor":
            data = {
                title: "DOCTORS",
                isDoctor: true,
                link:"/admin/doctorlist",
                linkName: "View all Doctors",
                icon: (
                    <PersonOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;
       
        case "department":
            data = {
                title: "DEPARTMENTS",
                isDepartment: true,
                link:"/admin/departmentlist",
                linkName: "View all Departments",
                icon: (
                    <AddBoxIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {data.isUser && count} {data.isDoctor && count}
                    {data.isDepartment && count}
                </span>
                <Link className="link"to={data.link}>{data.linkName}</Link>
            </div>
            <div className="right">{data.icon}</div>
        </div>
    );
};

export default Widgets;