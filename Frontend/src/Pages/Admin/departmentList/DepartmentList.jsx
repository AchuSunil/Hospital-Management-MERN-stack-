import "./departmentList.scss";

import React, { useEffect, useState } from "react";
import Sidebar from "../../../Components/Admin-Components/Sidebar/Sidebar";
import BannerDeptTable from "../../../Components/Admin-Components/Banner-Dept_table/BannerDeptTable";
import { useNavigate } from "react-router-dom";
import AXIOS from "../../../axios";
import DepartmentForm from "../../../Components/Admin-Components/DepartmentForm/DepartmentForm";
import Loader from "../../../Components/Loader/Loader";

const DepartmentList = () => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const getDepartments = async () => {
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

                const { data } = await AXIOS.get("/admin/getDepartmentList", config);
                if (data) {
                    setData(data);
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
        getDepartments();
    }, [refresh]);

  

    if (loading) {
        return <Loader />;
    }
    return (
        <div className="departmentlist">
            <Sidebar />
            {data.length !== 0 ? (
                <div className="departmentlist-container">
                    <BannerDeptTable
                        refresh={refresh}
                        setRefresh={setRefresh}
                        lists={data}
                        name="Department Management"
                        content="Department"
                        departmentForm={"DepartmentForm"} 
                    />
                </div>
            ) : (
                <div className="departmentlist-nodataContainer">
                    <h4 style={{ color: "#1B65A7" }}>Department Management</h4>

                    <div className="departmentForm">
                        <DepartmentForm refresh={refresh} setRefresh={setRefresh} />
                    </div>
                    <div className="nodata-container">No Data</div>
                </div>
            )}
        </div>
    );
};

export default DepartmentList;
