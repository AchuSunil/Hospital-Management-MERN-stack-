import "./doctorList.scss";
import Sidebar from "../../../Components/Admin-Components/Sidebar/Sidebar";
import Datatable from "../../../Components/Admin-Components/Datatable/Datatable";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AXIOS from "../../../axios";
import { DoctorForm } from "../../../Components/Admin-Components/Doctor-Form/DoctorForm";

const DoctorList = () => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const getDoctors = async () => {
        const adminInfo = localStorage.getItem("adminInfo");

        if (adminInfo) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data } = await AXIOS.get("/admin/getDoctorList", config);
                setData(data);
            } catch (error) {
                console.log(error.response.data.message);
            }
        } else {
            navigate("/admin");
        }
    };

    useEffect(() => {
        getDoctors();
    }, [refresh]);

    return (
        <div className="doctorlist">
            <Sidebar />

            {data.length !== 0 ? (
                <div className="doctorlist-container">
                    <Datatable
                        refresh={refresh}
                        setRefresh={setRefresh}
                        lists={data}
                        name="Doctor Management"
                        user="Doctor"
                        doctorForm={"DoctorForm"}
                    />
                </div>
            ) : (
                <div className="doctorlist-nodataContainer">
                    <h4 style={{ color: "#1B65A7" }}>Doctor Management</h4>

                    <div className="doctorForm">
                        <DoctorForm refresh={refresh} setRefresh={setRefresh} />
                    </div>
                    <div className="nodata-container">No Data</div>
                </div>
            )}
        </div>
    );
};

export default DoctorList;
