import React, { useEffect } from "react";
import "./dashboard.scss";
import Sidebar from "../../../Components/Admin-Components/Sidebar/Sidebar";
import Widgets from "../../../Components/Admin-Components/Widgets/Widgets";
import Chart from "../../../Components/Admin-Components/Chart/Chart";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const adminInfo = localStorage.getItem("adminInfo");

        if (adminInfo) {
            navigate("/admin/dashboard");
        } else {
            navigate("/admin");
        }
    }, [navigate]);

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboardContainer">
                <div className="widgets">
                    <Widgets type="user" />
                    <Widgets type="doctor" />
                    <Widgets type="department" />
                    {/* <Widgets type="earning" /> */}
                </div>
                <div className="charts">
                    <Chart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
