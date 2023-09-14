import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SetWeek from "../../utilities/SetWeek";
import DemoWeekTable from "./DemoWeekTable";
import DemoAddGuestUser from "./DemoAddGuestUser";
import DemoManageGuestUsers from "./DemoManageGuestUsers";
import DemoManageSharing from "./DemoManageSharing";
import DemoBar from "./DemoBar";
import image from "./signin.png";
import "./style2.css";
import DemoUsername from "./DemoUsername";

const DemoHomePage = () => {

    const [demoTasks, setDemoTasks] = useState([]);

    const [demoShare, setDemoShare] = useState([]);

    const [invisible, setInvisible] = useState(true);

    const [badge1, setBadge1] = useState(true);

    const [badge2, setBadge2] = useState(true);

    const [tasks, setTasks] = useState([]);

    const [note, setNote] = useState(false);

    const [open, setOpen] = useState(true);

    const [user, setUser] = useState();

    const [openAGU, setOpenAGU] = useState(false);

    const [openMGU, setOpenMGU] = useState(false);

    const [openMS, setOpenMS] = useState(false);

    const [notification, setNotification] = useState(false);

    const scrollToDate = useRef();

    const navigate = useNavigate();

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (scrollToDate.current!=undefined) {
            scrollToDate.current.scrollIntoView({block:"center", behavior:"smooth"});
        }
    },[date]);  

    if (note === false) {
        return (
            <Container maxWidth="lg" style={{padding:"0"}} sx={{mt: 5 , mb: 5, backgroundColor: "white", borderRadius: "0.5%"}}>
                <Stack textAlign={"justify"} spacing={5} paddingBottom={2} paddingTop={2}>
                    <Typography variant="h5" color="primary" gutterBottom textAlign={"center"}>Welcome to Schedule Assistant Demo Page!</Typography>
                    <Typography variant="body1" paddingLeft={2} paddingRight={2}>
                        Welcome to our demo version! Please keep in mind that this is a demonstration and not connected to a database, which means your data won't be saved. If you leave the demo page or refresh it, all your data will be lost.
                        Since our demo isn't connected to a database, some features like "Data Sharing" won't be available. However, we've set up a demo user account so you can explore these features in action.
                        To access all the features and fully experience our platform, we recommend starting by creating your own account. This way, you'll be able to utilize all the capabilities of our software. Enjoy exploring!
                    </Typography>
                    <Typography variant="body1" paddingLeft={2} paddingRight={2}>
                        Please locate the glowing "Sign In" button below and click on it to access the demo page.
                    </Typography>
                    <Box position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <img src={image} width={"95%"} />
                        <Button id="signInButton" variant="contained" onClick={() => {setNote(true); setOpen(true);}} sx={{
                            position: "absolute",
                            top: "73%",
                            left: "51.5%",
                            transform: "translate(-50%, -50%)",
                            minWidth:0,
                            minHeight:0,
                            width:"12.5%",
                            height: "6%",
                            fontSize:"0.8vw"                     
                            }}>Sign In
                        </Button>
                    </Box>           
                </Stack>   
                <Button onClick={() => navigate("/")} variant="contained" size="small" sx={{mb:4, mt:4, ml:4}}>Go Back</Button>             
            </Container>
        )
    } else {
        return (
            <Container maxWidth="lg" style={{padding:"0"}} sx={{mt: 5 , mb: 5, backgroundColor: "white", borderRadius: "0.5%"}}>
                <DemoUsername open={open} setOpen={setOpen} setNote={setNote} setUser={setUser} />
                <DemoBar user={user} setOpenAGU={setOpenAGU} setOpenMGU={setOpenMGU} setOpenMS={setOpenMS} year={SetWeek(date).year} month={SetWeek(date).month} date={date} setDate={setDate} tasks={tasks} notification={notification} setNotification={setNotification} invisible={invisible} setInvisible={setInvisible} badge1={badge1} setBadge1={setBadge1} badge2={badge2} setBadge2={setBadge2} />
                <DemoWeekTable year={SetWeek(date).year} weekDays={SetWeek(date).weekDays} scrollToDate={scrollToDate} tasks={tasks} setTasks={setTasks} user={user} demoTasks={demoTasks} />
                <DemoAddGuestUser open={openAGU} setOpen={setOpenAGU} demoTasks={demoTasks} setDemoTasks={setDemoTasks} demoShare={demoShare} setDemoShare={setDemoShare} setInvisible={setInvisible} setBadge1={setBadge1} setBadge2={setBadge2} />
                <DemoManageGuestUsers open={openMGU} setOpen={setOpenMGU} demoTasks={demoTasks} setDemoTasks={setDemoTasks} />
                <DemoManageSharing open={openMS} setOpen={setOpenMS} demoShare={demoShare} setDemoShare={setDemoShare} />
            </Container>
        );
    }; 
}

export default DemoHomePage;
