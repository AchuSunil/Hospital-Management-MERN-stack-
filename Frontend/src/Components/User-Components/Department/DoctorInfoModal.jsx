import * as React from "react"; 
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DoctorImg from "../../../Assets/doctTemp/1.jpg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));





function DoctorInfoModal() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                sx={{ fontSize: "11px", backgroundColor: "lightgreen", color: "#ffff" }}
                size="small"
                onClick={handleClickOpen}
            >
                View More
            </Button>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <Box sx={{ backgroundColor: "blue", color: "white", padding: "10px" ,display:"flex", justifyContent:"space-between"}}>
                    <Typography component="span" sx={{ fontWeight: "bold" }}>
                        Doctor Profile
                    </Typography>
                    <CloseRoundedIcon sx={{color:"#ffff"}} onClick={()=>{
                        handleClose()
                    }}/>
                   
                </Box>
                <DialogContent dividers>
                    <Stack direction="row" spacing={2}>
                        <Avatar alt="imageFile" src={DoctorImg} sx={{ width: 100, height: 100 }} />
                        <Box>
                            <Typography component="div" variant="h5" gutterBottom sx={{ color: "#0078BF" }}>
                                Dr.Chkravarthy
                            </Typography>
                            <Typography component="div" gutterBottom sx={{ color: "#8f8b8b" }}>
                                Senior Consultant
                            </Typography>
                            <Typography component="div" gutterBottom sx={{ color: "#8f8b8b", fontSize: "12px" }}>
                                Gender : Male
                            </Typography>
                            <Typography component="div" gutterBottom sx={{ color: "#8f8b8b", fontSize: "12px" }}>
                                Speciality : Cardiology
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack>
                        <Container>
                            <Box sx={{ margin: "10px" }}>
                                <Typography component="p" sx={{ color: "#0078BF" }} gutterBottom>
                                    Medical Qualification
                                </Typography>
                                <ul style={{color:"#8f8b8b"}}>
                                    <li>Post MBBS : Junior Resident - Dept. of Hematology (AIIMS-1998)</li>
                                    <li>Post MD : Registrar - Indraprastha Appollo Hospital, New Delhi (2003)</li>
                                    <li>
                                        Asst. Professor (Cardiology) - Sri Jayadeva Institute of Cardiology, Bangalore,
                                        since February till Jan 2008.
                                    </li>
                                    <li>Health Care Hospital Kochi - Joined in January, 2010</li>
                                </ul>
                            </Box>
                        </Container>
                    </Stack>
                </DialogContent>
              
            </BootstrapDialog>
        </div>
    );
}

export default DoctorInfoModal;
