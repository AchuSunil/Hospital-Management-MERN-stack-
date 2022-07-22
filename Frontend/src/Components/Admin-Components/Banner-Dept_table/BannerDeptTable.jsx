import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import swal from "sweetalert";
import AXIOS from "../../../axios";
import DepartmentForm from "../DepartmentForm/DepartmentForm";
import BannerForm from "../BannerForm/BannerForm";
import './bannerDeptDatatable.scss'

const BannerDeptTable = (props) => {
    let deptColumns;
    if (props.content === "Department") {
        deptColumns = [
            { field: "", headerName: "No", width: 70 },
            { field: "_id", headerName: "ID", width: 350 },
            { field: "name", headerName: "Department Name", width: 470 },

            {
                field: "remove",
                headerName: "Remove",
                width: 120,
                renderCell: (params) => {
                    return (
                        <div className="cellAction">
                            <button className="blockButton" onClick={() => removeDepartment(params.row._id)}>
                                Remove
                            </button>
                        </div>
                    );
                },
            },
        ];
    } else if (props.content === "Banner") {
        deptColumns = [
            { field: "", headerName: "No", width: 70 },
            { field: "_id", headerName: "ID", width: 350 },
            {
                field: "name",
                headerName: "Banner Image",
                width: 430,
                renderCell: (params) => {
                    return (
                        <div className="cellWithImg">
                            <img src={params.row.name} width={100} alt="" />
                        </div>
                    );
                },
            },
            {
                field: "remove",
                headerName: "Remove",
                width: 120,
                renderCell: (params) => {
                    return (
                        <div className="cellAction">
                            <button className="blockButton" onClick={() => removeBanner(params.row._id)}>
                                Remove
                            </button>
                        </div>
                    );
                },
            },
        ];
    }

    const removeDepartment = async (id) => {
        swal({
            title: "Are you sure?",
            text: `Do you want to Remove the ${props.content}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willRemove) => {
            if (willRemove) {
                try {
                    const adminInfo = localStorage.getItem("adminInfo");
                    const info = JSON.parse(adminInfo);
                    const config = {
                        headers: {
                            "Content-type": "application/json",
                            "x-access-token": info.token,
                        },
                    };

                    const response = await AXIOS.post(`/admin/removeDepartment/${id}`, config);
                    if (response.data.removed) {
                        props.setRefresh(!props.refresh);
                    }
                } catch (error) {
                    console.log(error.response.data.message, "///error");
                }
            }
        });
    };

    const removeBanner = async (id) => {
        swal({
            title: "Are you sure?",
            text: `Do you want to Remove the ${props.content}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willRemove) => {
            if (willRemove) {
                try {
                    const adminInfo = localStorage.getItem("adminInfo");
                    const info = JSON.parse(adminInfo);
                    const config = {
                        headers: {
                            "Content-type": "application/json",
                            "x-access-token": info.token,
                        },
                    };

                    const response = await AXIOS.post(`/admin/removeBanner/${id}`, config);
                    if (response.data.removed) {
                        props.setRefresh(!props.refresh);
                    }
                } catch (error) {
                    console.log(error.response.data.message, "///error");
                }
            }
        });
    };

    const row = props.lists ? props.lists : " ";

    return (
        <div className="datatable">
            <div className="tableHeading">
                <h4 style={{ color: "#1B65A7" }}>{props.name}</h4>
                {props.departmentForm && <DepartmentForm refresh={props.refresh} setRefresh={props.setRefresh} />}
                {props.bannerForm && <BannerForm refresh={props.refresh} setRefresh={props.setRefresh} />}
            </div>
            
            <DataGrid
                className="datagrid"
                rows={row}
                columns={deptColumns}
                getRowId={(row) => row._id}
                pageSize={7}
                rowsPerPageOptions={[7]}
                // checkboxSelection
            />
        </div>
    );
};

export default BannerDeptTable;
