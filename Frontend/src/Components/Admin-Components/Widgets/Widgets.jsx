import React, { useEffect, useState } from "react";
import "./widgets.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link, useNavigate } from "react-router-dom";
import AXIOS from "../../../axios";

const Widgets = ({ type }) => {
    const [user, setUser] = useState("");
    const [doctor, setDoctor] = useState("");
    const [department, setDepartment] = useState("");

    const navigate = useNavigate();

    const getDashboardInfo = async () => {
        const adminInfo = localStorage.getItem("adminInfo");

        if (adminInfo) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const {data} = await AXIOS.get("/admin/getDashboardInfo", config);
                if (data) {
                    setUser(data.user);
                    setDoctor(data.doctor);
                    setDepartment(data.department)
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        } else {
            navigate("/admin");
        }
    };

    useEffect(() => {
        getDashboardInfo();
    }, [user,doctor,department]);

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
                    {data.isUser && user} {data.isDoctor && doctor}
                    {data.isDepartment && department}
                </span>
                <Link className="link"to={data.link}>{data.linkName}</Link>
            </div>
            <div className="right">{data.icon}</div>
        </div>
    );
};

export default Widgets;
