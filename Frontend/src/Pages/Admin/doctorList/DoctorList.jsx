import "./doctorList.scss";
import Sidebar from "../../../Components/Admin-Components/Sidebar/Sidebar";
import Datatable from "../../../Components/Admin-Components/Datatable/Datatable";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AXIOS from "../../../axios";
import DoctorForm from "../../../Components/Admin-Components/Doctor-Form/DoctorForm";
import Loader from "../../../Components/Loader/Loader";

const DoctorList = () => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getDoctors = async () => {
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

                const { data } = await AXIOS.get("/admin/getDoctorList", config);
                if (data) {
                    setData(data);
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
        getDoctors();
    }, [refresh]);

    if (loading) {
        return <Loader />;
    }
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
