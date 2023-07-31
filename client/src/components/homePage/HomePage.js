import { Container } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SetWeek from "../../utilities/SetWeek";
import WeekTable from "./WeekTable";
import mainPage from "../../requests/mainPage";
import AddGuestUser from "./AddGuestUser";
import ManageGuestUsers from "./ManageGuestUsers";
import ManageSharing from "./ManageSharing";
import getSharedUsers from "../../requests/getSharedUsers";
import manageSharedUsers from "../../requests/manageSharedUsers";
import shareRequests from "../../requests/shareRequests";
import getBadgeNotification from "../../requests/getBadgeNotification";
import editBadgeNotification from "../../requests/editBadgeNotification";
import Bar from "../appBar/Bar";
import { webSocketUrl } from "../../config";

const HomePage = () => {
    const [invisible, setInvisible] = useState(true);

    const [badge1, setBadge1] = useState(true);

    const [badge2, setBadge2] = useState(true);

    const [update, setUpdate] = useState(false);

    const [change, setChange] = useState(false);

    const [sharedUsers, setSharedUsers] = useState(null);

    const [newTask, setNewTask] = useState();

    const [signedIn, setSignedIn] = useState();

    const [tasks, setTasks] = useState([]);

    const [userEmail, setUserEmail] = useState();

    const [user, setUser] = useState();

    const [openAGU, setOpenAGU] = useState(false);

    const [openMGU, setOpenMGU] = useState(false);

    const [openMS, setOpenMS] = useState(false);

    const [sharedUser, setSharedUser] = useState(null);

    const [users, setUsers] = useState();

    const [requests, setRequests] = useState();

    const scrollToDate = useRef();

    const navigate = useNavigate();

    const [date, setDate] = useState(new Date());

    const handleBadgeNotification = (badgeNotification) => {
        if (badgeNotification.badge1 === 0) {
            setInvisible(false);
            setBadge1(false);
        };
        if (badgeNotification.badge2 === 0) {
            setInvisible(false);
            setBadge2(false);
        };
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
                const badgeNotification = await getBadgeNotification();
                handleBadgeNotification(badgeNotification);
                setSignedIn(result.signedIn);
                setTasks(result.tasks);
                setUserEmail(result.userEmail)
                setUser(result.user);
                setSharedUsers(sharedUsers);
                setUsers(users);
                setRequests(requests);
                setSharedUser(null);
                setChange(false);
                setUpdate(false);
            };
        };
        getResult();
    }, [newTask, sharedUser, change]);

    useEffect(() => {
        if (scrollToDate.current!=undefined) {
            scrollToDate.current.scrollIntoView({block:"center", behavior:"smooth"});
        }
    },[date]);  

    if (signedIn === true) {
        const socket = new WebSocket(`ws://${webSocketUrl}`);
        socket.addEventListener("open", () => {
            let sharedEmails = [];
            if (requests.error == undefined) {
                sharedEmails = requests.map((user) => {if (user.status == 1) {return(user.email)}});
            };
            socket.send(JSON.stringify({userEmail, update, sharedEmails}));
        });
        socket.addEventListener("message", async (event) => {
            const data = JSON.parse(event.data);
            if (data.from === "receiver") {
                await editBadgeNotification({badgeName: "badge1", badgeNotification: false});
                setInvisible(false);
                setBadge1(false);
            } else if (data.from === "sender") {
                await editBadgeNotification({badgeName: "badge2", badgeNotification: false});
                setInvisible(false);
                setBadge2(false);
            }
            setChange(data.status);
        });

        return (
            <Container maxWidth="lg" style={{padding:"0"}} sx={{mt: 5 , mb: 5, backgroundColor: "white", borderRadius: "0.5%"}}>
                <Bar user={user} setOpenAGU={setOpenAGU} setOpenMGU={setOpenMGU} setOpenMS={setOpenMS} year={SetWeek(date).year} month={SetWeek(date).month} date={date} setDate={setDate} tasks={tasks} invisible={invisible} setInvisible={setInvisible} badge1={badge1} setBadge1={setBadge1} badge2={badge2} setBadge2={setBadge2} />
                <WeekTable year={SetWeek(date).year} weekDays={SetWeek(date).weekDays} scrollToDate={scrollToDate} tasks={tasks} user={user} setNewTask={setNewTask} sharedUsers={sharedUsers} setUpdate={setUpdate} />
                <AddGuestUser open={openAGU} setOpen={setOpenAGU} sharedUser={sharedUser} setSharedUser={setSharedUser} setUpdate={setUpdate} />
                <ManageGuestUsers open={openMGU} setOpen={setOpenMGU} setSharedUser={setSharedUser} users={users} setUpdate={setUpdate} />
                <ManageSharing open={openMS} setOpen={setOpenMS} setSharedUser={setSharedUser} requests={requests} setUpdate={setUpdate} />
            </Container>
        );
    };   
}

export default HomePage;
