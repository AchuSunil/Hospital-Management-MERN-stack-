import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import DeptCards from "./DeptCards";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function DepartmentTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Doctors" {...a11yProps(0)} />
                    <Tab label="Center Information" {...a11yProps(1)} />
                    <Tab label="Facilities and Services" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <DeptCards />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography component="p" sx={{ color: "#8f8e8e" }}>
                    The Cardiology Department at Health Care Hospital is a pioneer in comprehensive Cardiology Services
                    (Surgical & Medical) since its inception in 1976. The department has a well-equipped 26 bedded Cardiac
                    Care Unit with Central Monitoring & Invasive Haemodynamic Monitoring Systems. The department of
                    cardiology is one of the internationally reputed cardiology centres and offers state-of-the-art
                    technology for cardiology treatments including Digital Cardiac Angiography lab, Electro Physiology Lab,
                    128 Slice Cardiac CT Angiography Facilities, Cardiac MRI, high definition Doppler Echo Cardiography etc.
                </Typography>
                <Typography component="p" sx={{ color: "#8f8e8e" }}>
                    The Department of Cardiology and Cardiac Surgery includes well experienced cardiologists and cardiac
                    surgeons specialized in treatment of all cardiac illnesses. The treatment centre at Medical Trust
                    Hospital has advanced and sophisticated equipment for all cardiac procedures including Coronary
                    Angiograms, Angioplasties with Stenting, Rhythm Management, Electrophysiological studies and
                    Radiofrequency Ablation, Pacemaker Implants, Implantable Cardio verter Defibrillators, Cardiac
                    resynchronisation therapy, BMV, peripheral and aortic interventions.
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ul style={{color:"#8f8e8e"}}>
                    <li>Cardiac Care Unit with Central Monitoring System</li>
                    <li>Invasive Haemodynamic Monitoring</li>
                    <li>Temporary Transvenous Pacing</li>
                    <li>Permanent Pacemaker Implantation</li>
                    <li>Color Doppler Echocardiography</li>
                    <li>CTO Angioplasty</li>
                    <li>Heart Failure Clinic</li>

                </ul>
               
            </TabPanel>
        </Box>
    );
}
export default DepartmentTabs;
