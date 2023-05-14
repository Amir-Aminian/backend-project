import { Container, Button, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SetWeek from "../../utilities/SetWeek";
import WeekTable from "./WeekTable";
import mainPage from "../../requests/mainPage";
import AddSharedUser from "./AddSharedUser";
import getSharedUsers from "../../requests/getSharedUsers";
import manageSharedUsers from "../../requests/manageSharedUsers";
import shareRequests from "../../requests/shareRequests";
import Bar from "../appBar/Bar";

const HomePage = () => {
    const [sharedUsers, setSharedUsers] = useState(null);

    const [newTask, setNewTask] = useState(null);

    const [signedIn, setSignedIn] = useState();

    const [tasks, setTasks] = useState([]);

    const [user, setUser] = useState();

    const [open, setOpen] = useState(false)

    const [sharedUser, setSharedUser] = useState(null);

    const [users, setUsers] = useState();

    const [requests, setRequests] = useState();

    const scrollToDate = useRef();

    const navigate = useNavigate();

    const [date, setDate] = useState(new Date(new Date().setDate(new Date().getDate()-1)));

    const nextWeek = () => {
        setDate(new Date(date.setDate(date.getDate()+7)));
    };

    const thisWeek = () => {
        setDate(new Date(new Date().setDate(new Date().getDate()-1)));
    };

    const previousWeek = () => {
        setDate(new Date(date.setDate(date.getDate()-7)));
    };

    useEffect(() => {
        const getResult = async () => {
            const result = await mainPage();
            if (result.error != undefined) {
                alert("You are not signed in");
                navigate("/");
            } else if (result.signedIn === true) {
                const sharedUsers = await getSharedUsers();
                const users = await manageSharedUsers();
                const requests = await shareRequests();
                setSignedIn(true);
                setTasks(result.tasks);
                setUser(result.user);
                setSharedUsers(sharedUsers);
                setUsers(users);
                setRequests(requests);
                setNewTask(null);
                setSharedUser(null);
            };
        };
        getResult();
    }, [newTask, sharedUser]);

    useEffect(() => {
        if (scrollToDate.current!=undefined) {
            scrollToDate.current.scrollIntoView({block:"center", behavior:"smooth"});
        }
    });  

    if (signedIn === true) {
        return (
            <Container maxWidth="lg" style={{padding:"0"}} sx={{mt: 5 , mb: 5, backgroundColor: "white", borderRadius: "0.5%"}}>
                <Bar user={user} setOpen={setOpen} />
                <Grid container direction="column" alignItems="center" justifyContent="center" spacing={1}>             
                    <Grid container item direction="row" alignItems="center" justifyContent="center" spacing={0.34}>
                        <Grid item>
                            <Button onClick={previousWeek} variant="contained" size="small">Previous Week</Button>
                        </Grid>
                            <Grid item>
                        <Button onClick={thisWeek} variant="contained" size="small">This Week</Button>
                            </Grid>
                        <Grid item>
                            <Button onClick={nextWeek} variant="contained" size="small">Next Week</Button>
                        </Grid>
                    </Grid>
                    <WeekTable year={SetWeek(date).year} month={SetWeek(date).month} weekDays={SetWeek(date).weekDays} scrollToDate={scrollToDate} tasks={tasks} user={user} setNewTask={setNewTask} sharedUsers={sharedUsers} />
                </Grid>
                <AddSharedUser open={open} setOpen={setOpen} user={user} sharedUser={sharedUser} setSharedUser={setSharedUser} users={users} requests={requests} />
            </Container>
        );
    };   
}

export default HomePage;
