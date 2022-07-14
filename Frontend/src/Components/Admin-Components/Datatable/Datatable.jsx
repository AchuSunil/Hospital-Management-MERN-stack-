import React from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import swal from "sweetalert";
import AXIOS from "../../../axios";
import { DoctorForm } from "../../../Components/Admin-Components/Doctor-Form/DoctorForm";

const Datatable = (props) => {
    let userColumns;
    if (props.user === "Doctor") {
        userColumns = [
            { field: "", headerName: "No", width: 50 },
            { field: "_id", headerName: "ID", width: 150 },
            { field: "name", headerName: "Name", width: 130 },
            {
                field: "email",
                headerName: "Email",
                width: 210,
            },
            {
                field: "phone",
                headerName: "Phone",
                width: 110,
            },
            {
                field: "gender",
                headerName: "Gender",
                width: 80,
            },
            {
                field: "department",
                headerName: "Department",
                width: 110,
            },
            {
                field: "isBlocked",
                headerName: "Actions",
                width: 80,
                renderCell: (params) => {
                    return params.row.isBlocked ? (
                        <div className="cellAction">
                            <button className="blockButton" onClick={() => unBlockUser(params.row._id)}>
                                UnBlock
                            </button>
                        </div>
                    ) : (
                        <div className="cellAction">
                            <button className="blockButton" onClick={() => blockUser(params.row._id)}>
                                Block
                            </button>
                        </div>
                    );
                },
            },
            {
                field: "remove",
                headerName: "Remove",
                width: 80,
                renderCell: (params) => {
                    return (
                        <div className="cellAction">
                            <button className="blockButton" onClick={() => removeDoctor(params.row._id)}>
                                Remove
                            </button>
                        </div>
                    );
                },
            },
        ];
    } else {
        userColumns = [
            { field: "", headerName: "No", width: 50 },
            { field: "_id", headerName: "ID", width: 220 },
            { field: "name", headerName: "Name", width: 130 },
            {
                field: "email",
                headerName: "Email",
                width: 210,
            },
            {
                field: "phone",
                headerName: "Phone",
                width: 120,
            },
            {
                field: "gender",
                headerName: "Gender",
                width: 80,
            },
            {
                field: "isBlocked",
                headerName: "Actions",
                width: 80,
                renderCell: (params) => {
                    return params.row.isBlocked ? (
                        <div className="cellAction">
                            <button className="blockButton" onClick={() => unBlockUser(params.row._id)}>
                                UnBlock
                            </button>
                        </div>
                    ) : (
                        <div className="cellAction">
                            <button className="blockButton" onClick={() => blockUser(params.row._id)}>
                                Block
                            </button>
                        </div>
                    );
                },
            },
        ];
    }

    const blockUser = async (id) => {
        swal({
            title: "Are you sure?",
            text: `Do you want to Block the ${props.user}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willBlock) => {
            if (willBlock) {
                try {
                    const config = {
                        headers: {
                            "Content-type": "application/json",
                        },
                    };
                    let confirm = {};
                    if (props.user === "User") {
                        confirm.isUser = true;
                    } else if (props.user === "Doctor") {
                        confirm.isDoctor = true;
                    }
                  const response  = await AXIOS.post(`/admin/userBlock/${id}`, confirm, config);
                        if (response.data.success) {
                            props.setRefresh(!props.refresh);
                        }
                    
                } catch (error) {
                    throw new error(error.response.data.message);
                }
            }
        });
    };

    const unBlockUser = async (id) => {
        swal({
            title: "Are you sure?",
            text: `Do you want to UnBlock the ${props.user}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willUnBlock) => {
            if (willUnBlock) {
                try {
                    const config = {
                        headers: {
                            "Content-type": "application/json",
                        },
                    };
                    let confirm = {};
                    if (props.user === "User") {
                        confirm.isUser = true;
                    } else if (props.user === "Doctor") {
                        confirm.isDoctor = true;
                    }
                  const response = await AXIOS.post(`/admin/userUnBlock/${id}`, confirm, config);
                        if (response.data.success) {
                            props.setRefresh(!props.refresh);
                        }
                    
                } catch (error) {
                    throw new error(error.response.data.message);
                }
            }
        });
    };

    const removeDoctor = async (id) => {
        swal({
            title: "Are you sure?",
            text: `Do you want to Remove the ${props.user}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willRemove) => {
            if (willRemove) {
                try {
                    const config = {
                        headers: {
                            "Content-type": "application/json",
                        },
                    };
                   
                 const response = await AXIOS.post(`/admin/removeDoctor/${id}`, config);
                        if (response.data.removed) {
                            props.setRefresh(!props.refresh);
                        }
                    
                } catch (error) {
                    throw new error(error.response.data.message);
                }
            }
        });
    };

    const row = props.lists ? props.lists : " ";
    return (
        <div className="datatable">
            <div className="tableHeading">
                <h4 style={{ color: "#1B65A7" }}> {props.name}</h4>
                {props.doctorForm && <DoctorForm refresh={props.refresh} setRefresh={props.setRefresh} />}
            </div>

            <DataGrid
                className="datagrid"
                rows={row}
                columns={userColumns}
                getRowId={(row) => row._id}
                pageSize={7}
                rowsPerPageOptions={[7]}
                // checkboxSelection
            />
        </div>
    );
};

export default Datatable;
