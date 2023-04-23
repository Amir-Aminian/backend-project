import { LogoutOutlined } from "@mui/icons-material";
import { Container, Button, Grid, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SetWeek from "../../utilities/SetWeek";
import WeekTable from "./WeekTable";
import mainPage from "../../requests/mainPage";
import clearCookies from "../../requests/clearCookies";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const HomePage = () => {
    const [newTask, setNewTask] = useState();

    const [signedIn, setSignedIn] = useState();

    const [tasks, setTasks] = useState([])

    const [user, setUser] = useState();

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
                setSignedIn(true);
                setTasks(result.tasks);
                setUser(result.user);
                setNewTask(null);
            };
        };
        getResult();
    }, [newTask]);

    useEffect(() => {
        if (scrollToDate.current!=undefined) {
            scrollToDate.current.scrollIntoView({block:"center", behavior:"smooth"});
        }
    });  

    const logOut = async () => {
        const result = await clearCookies();
        alert(result);
        navigate("/")
    };

    if (signedIn === true) {
        return (
            <Container maxWidth="lg" sx={{mt: 5 , mb: 5, backgroundColor: "white", borderRadius: "0.5%"}}>
                <Grid container direction="column" alignItems="center" justifyContent="center" spacing={1}>
                    <Grid container item direction="row" justifyContent="right" spacing={0.34}>
                        <IconButton onClick={() => {localStorage.removeItem("userEmail"); localStorage.removeItem("userName"); navigate("/")}}>
                            <PersonAddIcon />
                        </IconButton> 
                        <IconButton onClick={() => logOut()}>
                            <LogoutOutlined />
                        </IconButton> 
                    </Grid>               
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
                    <WeekTable year={SetWeek(date).year} month={SetWeek(date).month} weekDays={SetWeek(date).weekDays} scrollToDate={scrollToDate} tasks={tasks} user={user} setNewTask={setNewTask} />
                </Grid>
            </Container>
        );
    };   
}

export default HomePage;
