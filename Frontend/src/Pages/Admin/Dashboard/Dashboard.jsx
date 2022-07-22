import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import Sidebar from "../../../Components/Admin-Components/Sidebar/Sidebar";
import Widgets from "../../../Components/Admin-Components/Widgets/Widgets";
import Chart from "../../../Components/Admin-Components/Chart/Chart";
import { useNavigate } from "react-router-dom";
import AXIOS from "../../../axios";
import Loader from "../../../Components/Loader/Loader";

export const Dashboard = () => {
    const [user, setUser] = useState("");
    const [doctor, setDoctor] = useState("");
    const [department, setDepartment] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const getDashboardInfo = async () => {
        const adminInfo = localStorage.getItem("adminInfo");
        if (!adminInfo) return navigate("/admin");

        const info = JSON.parse(adminInfo);
        if (info.token) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        "x-access-token": info.token,
                    },
                };

                const { data } = await AXIOS.get("/admin/getDashboardInfo", config);
                if (data) {
                    setUser(data.user);
                    setDoctor(data.doctor);
                    setDepartment(data.department);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.log(error.response.data.message);
                navigate("/admin");
                localStorage.removeItem("adminInfo");
            }
        }else {
            console.log("no token ,,something issue with token passing or token verification");
        }
    };

    useEffect(() => {
        getDashboardInfo();
    }, []);

    if (loading) {
        return <Loader />;
    }
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboardContainer">
                <div className="widgets">
                    <Widgets count={user} type="user" />
                    <Widgets count={doctor} type="doctor" />
                    <Widgets count={department} type="department" />
                </div>
                <div className="charts">
                    <Chart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
