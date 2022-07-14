import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import AXIOS from "../../../axios";
import { IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { UploadImage } from "../../../utilities/imageUploadCloudinary";

const BannerForm = (props) => {
    const [open, setOpen] = React.useState(false);
    const [bannerImg, setBannerImg] = React.useState(null);
    const [displayImg, setDisplayImg] = React.useState(null);
    const [tempImg, setTempImg] = React.useState(null);
    const inputRef = React.useRef(null);


    //Function to Display Selected Image in Banner Form
    const displayImage = (e) => {
        e.preventDefault();
        let imageFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setTempImg(() => reader.result);
        };
        reader.readAsDataURL(imageFile);
        setDisplayImg(imageFile);
    };

    //Function to Upload Selected Banner Image to Cloudinary
    const postImage = async (displayImg) => {
        try {
            const data = await UploadImage(displayImg);
            setBannerImg(data.secure_url.toString());
        } catch (error) {
            console.log(error);
        }
    };

    const navigate = useNavigate();

    //Post Method to BackEnd for saving cloudinary file to Database
    const addBanner = async (bannerImg) => {
        const adminInfo = localStorage.getItem("adminInfo");

        if (adminInfo) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };
                const response = await AXIOS.post("/admin/addBanner", { bannerImg }, config);
                if (response.data.success) {
                    props.setRefresh(!props.refresh);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            navigate("/admin");
        }
    };
    const reset = () => {
        setTempImg(null);
        inputRef.current.value = null;
    };
    const onSubmit = (e) => {
        e.preventDefault();
        postImage(displayImg);
        if (bannerImg) {
            addBanner(bannerImg);
            reset();
        }
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
        reset();
    };
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                <AddIcon style={{ color: "primary" }} /> Add Banner
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ color: "#1B65A7" }}>Banner Details</DialogTitle>

                <form onSubmit={onSubmit}>
                    <DialogContent>
                        <Grid container>
                            <Grid>
                                <label htmlFor="icon-button-file" style={{ color: "grey", cursor: "pointer" }}>
                                    Choose Your Image
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                    <input
                                        accept="image/*"
                                        id="icon-button-file"
                                        type="file"
                                        onChange={displayImage}
                                        ref={inputRef}
                                        required
                                        style={{ display: "none" }}
                                    />
                                </label>
                            </Grid>
                        </Grid>
                        {tempImg && <img src={tempImg} width={"300"} alt="bannerImage" />}

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

export default BannerForm;
