import "./departmentForm.scss";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import AXIOS from "../../../axios";

 const DepartmentForm = (props) => {
    const [open, setOpen] = React.useState(false);
    const [deptName, setDeptName] = React.useState("");
    const [error, setError] = React.useState("");

    const onType = (e) => {
        console.log(e.target.value);
        setDeptName(e.target.value);
    };

    const navigate = useNavigate();

    const addDepartment = async (deptName) => {
        const adminInfo = localStorage.getItem("adminInfo");

        if (adminInfo) {
            console.log("inside admin info");
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const response = await AXIOS.post("/admin/addDepartment", { deptName }, config);
                if (response.data.success) {
                    props.setRefresh(!props.refresh);
                }
            } catch (error) {
                setError(error.response.data.message);
                setTimeout(() => {
                    setError("");
                }, 1000);
            }
        } else {
            navigate("/admin");
        }
    };
    const reset = () => {
        setDeptName("");
    };
    const onSubmit = (e) => {
        e.preventDefault();
        addDepartment(deptName);
        reset();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        reset();
        setOpen(false);
    };
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                <AddIcon style={{ color: "primary" }} /> Add Deparmtent
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ color: "#1B65A7" }}>Department Details</DialogTitle>

                <form onSubmit={onSubmit}>
                    <DialogContent>
                        <Grid container>
                            <Grid>
                                <TextField
                                    label="Department Name"
                                    value={deptName}
                                    onChange={onType}
                                    color="primary"
                                    focused
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                        {error && <p style={{ color: "#ff726f", fontSize: "12px" }}>{error}</p>}
                        <DialogActions>
                            <Button variant="contained" size="small" color="warning" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button variant="contained" size="small" type="submit">
                                Save
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
};

export default DepartmentForm;

