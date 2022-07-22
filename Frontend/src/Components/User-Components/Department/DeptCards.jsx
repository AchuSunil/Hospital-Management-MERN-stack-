import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import image1 from "../../../Assets/doctTemp/1.jpg";
import { Box, Grid } from "@mui/material";
import DoctorInfoModal from "./DoctorInfoModal";

const DeptCards = () => {
    const data = [
        {
            id: 1,
            pic: image1,
        },
        {
            id: 2,

            pic: image1,
        },
        {
            id: 3,

            pic: image1,
        },
        {
            id: 4,

            pic: image1,
        },
        {
            id: 5,

            pic: image1,
        },
        {
            id: 6,

            pic: image1,
        },
    ];

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    {data &&  
                        data.map((obj) => {
                            return  ( 
                                <Grid item xs={3} key={obj.id}>
                                    <Card style={{width:"200px"}}>
                                        <CardMedia component="img"  height="130" image={obj.pic} alt="green iguana" />
                                        <CardContent>
                                            <Typography variant="h6" component="span">
                                                Dr.Chakravarthy
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                sx={{ fontSize: "11px", backgroundColor: "lightblue", color: "#ffff" }}
                                                size="small"
                                            >
                                                Book
                                            </Button>
                                            <div style={{ marginLeft: "5px" }}>
                                                <DoctorInfoModal />
                                            </div>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })}
                </Grid>
            </Box>
        </>
    );
};

export default DeptCards;
