import "./bannerList.scss";

import React, { useState, useEffect } from "react";
import Sidebar from "../../../Components/Admin-Components/Sidebar/Sidebar";
import BannerForm from "../../../Components/Admin-Components/BannerForm/BannerForm";
import { useNavigate } from "react-router-dom";
import AXIOS from "../../../axios";
import BannerDeptTable from "../../../Components/Admin-Components/Banner-Dept_table/BannerDeptTable";
import Loader from "../../../Components/Loader/Loader";

const BannerList = () => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const getBanners = async () => {
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

                const { data } = await AXIOS.get("/admin/getBannerList", config);
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
        } else {
            console.log("no token ,,something issue with token passing or token verification");
        }
    };

    useEffect(() => {
        getBanners();
    }, [refresh]);

    if (loading) {
        return <Loader />;
    }
    return (
        <div className="bannerlist">
            <Sidebar />
            {data.length !== 0 ? (
                <div className="bannerlist-container">
                    <BannerDeptTable
                        refresh={refresh}
                        setRefresh={setRefresh}
                        lists={data}
                        name="Banner Management"
                        content="Banner"
                        bannerForm={"BannerForm"}
                    />
                </div>
            ) : (
                <div className="bannerlist-nodataContainer">
                    <h4 style={{ color: "#1B65A7" }}>Banner Management</h4>

                    <div className="bannerForm">
                        <BannerForm refresh={refresh} setRefresh={setRefresh} />
                    </div>
                    <div className="nodata-container">No Data</div>
                </div>
            )}
        </div>
    );
};

export default BannerList;
