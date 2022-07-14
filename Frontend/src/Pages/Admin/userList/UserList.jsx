import "./userList.scss";
import Sidebar from "../../../Components/Admin-Components/Sidebar/Sidebar";
import Datatable from "../../../Components/Admin-Components/Datatable/Datatable";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AXIOS from "../../../axios";



const UserList = () => {

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const getUsers = async () => {
        const adminInfo = localStorage.getItem("adminInfo");

        if (adminInfo) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data } = await AXIOS.get("/admin/userlist", config);
                setData(data);
            } catch (error) {
                throw new error(error.response.data.message);
            }
        } else {
            navigate("/admin");
        }
    };

    useEffect(() => {
        getUsers();
    }, [refresh]);
  
  return (
        <div className="userlist">
            <Sidebar />
            <div className="userlist-container">
                <Datatable refresh={refresh} setRefresh={setRefresh} lists={data} name="User Management" user="User"/>
            </div>
        </div>
    );
};

export default UserList;
