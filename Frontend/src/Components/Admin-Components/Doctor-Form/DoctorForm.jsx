import "./doctorForm.scss";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AXIOS from "../../../axios";
import { useEffect } from "react";

const DoctorForm = (props) => {
    const [open, setOpen] = React.useState(false);
    const [departments, setDepartments] = React.useState([]);
    const [error, setError] = React.useState("");
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        phone: "",
        department: "",
    });

    const { name, email, password, phone, gender, department } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const navigate = useNavigate();

    const addDoctor = async (formData) => {
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

                const response = await AXIOS.post("/admin/addDoctor", formData, config);
                if (response.data.success) {
                    props.setRefresh(!props.refresh);
                }
            } catch (error) {
                console.log(error.response.data.message);
                setError(error.response.data.message);
                setTimeout(() => {
                    setError("")
                }, 2000);
            }
        } else {
            navigate("/admin");
        }
    };

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

                const { data } = await AXIOS.get("/admin/getDepartments", config);
                if (data) {
                    setDepartments(data);
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        } else {
            navigate("/admin");
        }
    };

    useEffect(() => {
        getDepartments();
    }, []);

    const reset = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            gender: "",
            phone: "",
            department: "",
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addDoctor(formData);
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
                <AddIcon style={{ color: "primary" }} /> Add Doctor
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ color: "#1B65A7" }}>Doctor Details</DialogTitle>
              {error && <p style={{color:"#ff726f",textAlign:"center"}}>{error}</p>}
                <form onSubmit={onSubmit}>
                    <DialogContent dividers>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name="name"
                                    label="Name"
                                    value={name}
                                    onChange={onChange}
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    label="email"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={onChange}
                                    label="Phone"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    label="password"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-label">Departments</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="department"
                                    value={department}
                                    fullWidth
                                    required
                                    label="Departments"
                                    defaultValue="choose"
                                    onChange={onChange}
                                >
                                    <MenuItem disabled value="Choose">
                                        Choose
                                    </MenuItem>
                                    <MenuItem value="Neurology">Neurology</MenuItem>
                                    <MenuItem value="Dentist">Dentist</MenuItem>
                                    <MenuItem value="Orthopedic">Orthopedic</MenuItem>
                                    <MenuItem value="Cardiology">Cardiology</MenuItem>
                                    <MenuItem value="Dermatology">Dermatology</MenuItem>

                                    {/* {departments &&
                                        departments.map((obj) => {
                                            return (
                                                <MenuItem key={obj._id} value={obj._id}>
                                                    {obj.name}
                                                </MenuItem>
                                            );
                                        })} */}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="gender"
                                    value={gender}
                                    label="gender"
                                    onChange={onChange}
                                    fullWidth
                                    required
                                >
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>female</MenuItem>
                                    <MenuItem value={"Other"}>other</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button variant="contained" size="medium" type="submit">
                                Save
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
};

export default DoctorForm;