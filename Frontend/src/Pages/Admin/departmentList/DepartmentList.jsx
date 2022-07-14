import "./departmentList.scss";

import React, { useEffect, useState } from "react";
import Sidebar from "../../../Components/Admin-Components/Sidebar/Sidebar";
import BannerDeptTable from "../../../Components/Admin-Components/Banner-Dept_table/BannerDeptTable";
import { useNavigate } from "react-router-dom";
import AXIOS from "../../../axios";
import DepartmentForm from "../../../Components/Admin-Components/DepartmentForm/DepartmentForm";

const DepartmentList = () => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const getDepartments = async () => {
        const adminInfo = localStorage.getItem("adminInfo");

        if (adminInfo) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data } = await AXIOS.get("/admin/getDepartmentList", config);
                setData(data);
            } catch (error) {
                throw new error(error.response.data.message);
            }
        } else {
            navigate("/admin");
        }
    };

    useEffect(() => {
        getDepartments();
    }, [refresh]);

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
