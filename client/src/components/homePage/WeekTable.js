import { AddCircleOutline } from "@mui/icons-material";
import { Card, CardContent, Grid, IconButton, Typography, Table, Box, TableCell, TableContainer, TableHead, TableRow, TableBody, Stack, Avatar, Tooltip } from "@mui/material";
import React, { useState } from "react";
import DayBarChart from "../charts/DayBarChart";
import AddTask from "./AddTask";
import getUser from "../../utilities/getUser";

const WeekTable = ({year, weekDays, scrollToDate, tasks, user, setNewTask, sharedUsers, setUpdate}) => {
    const [open, setOpen] = useState(false);

    const [date, setDate] = useState([]);

    const style = (weekDay) => {
        if ((new Date().getDate() === weekDay.weekDate) && (new Date().getMonth() === weekDay.monthNumber) && (new Date().getFullYear() === weekDay.yearNumber)) {
            return({borderRadius:"50%", backgroundColor:"rgb(46 182 125)"});
        }
    };

    const today = (weekDay) => {
        if ((new Date().getDate() === weekDay.weekDate) && (new Date().getMonth() === weekDay.monthNumber) && (new Date().getFullYear() === weekDay.yearNumber)) {
            return(scrollToDate);
        } else {
            return(null);
        }
    };

    const getUserStyle = (weekDay) => {
        let users = [];
        weekDays.map((weekDay) =>{ 
            const allUsers = getUser(weekDay, tasks, sharedUsers);
            if (allUsers.length > 1) {
                users.push(1);
            };
        });
        const dayUsers = getUser(weekDay, tasks, sharedUsers);
        if (users.length > 0 && dayUsers.length > 1) {
            return("space-between");
        } else if (users.length > 0 && dayUsers.length === 1) {
            return("left");
        } else {
            return("center");
        }
    };

    const getPadding = (weekDay) => {
        let users = [];
        weekDays.map((weekDay) =>{ 
            const allUsers = getUser(weekDay, tasks, sharedUsers);
            allUsers.forEach((data) => {
                const index = users.findIndex((user) => user === data);
                if (index === -1) {
                users.push(data);
                };
            });
        });
        const dayUsers = getUser(weekDay, tasks, sharedUsers);
        if (users.length > 0 && dayUsers.length === 2) {
            return("10%");
        } else if (users.length > 0 && dayUsers.length === 3) {
            return("2.5%");
        } else if (users.length === 2 && dayUsers.length === 1) {
            return("10%");
        } else if (users.length === 3 && dayUsers.length === 1) {
            return("2.5%");
        }
    };

    return ( 
        <Box width={'100%'} align={'center'}> 
        <Box paddingLeft={'45px'} position="sticky" top={"80px"} sx={{backdropFilter:"blur(3px)"}}>
        <TableContainer>       
        <Table>
        <TableHead>
        <TableRow>                       
            {weekDays.map((weekDay) => (
                <TableCell key={weekDay.weekDate} sx={{borderBottom: 0, borderRight: 1, borderLeft: 1, borderColor: "RGB(222, 225, 230)", width: '11.25%', padding: '0px', fontSize: '20px'}}>
                    <Grid container item direction="column" alignItems="center" ref={today(weekDay)}> 
                        <Grid item sx={{width: "35px"}}>      
                            <Typography variant="body2" justifyContent={"center"} alignItems={"center"} display={"flex"} borderBottom={1}>
                                {weekDay.weekDay}
                            </Typography>
                            <Typography variant="body1" justifyContent={"center"} alignItems={"center"} display={"flex"} border={1} borderRadius={"10%"} color={"white"} sx={{backgroundColor:"rgb(25, 118, 210)", Width:'30px', height:'30px', ...style(weekDay)}}>
                                {weekDay.weekDate}
                            </Typography>
                        </Grid>
                        <Grid item>                                
                            <IconButton onClick={() => {setDate([weekDay.weekDay, weekDay.weekDate, weekDay.weekMonth, year]);setOpen(true);}}>
                                <AddCircleOutline />
                            </IconButton>
                        </Grid>       
                    </Grid>
                </TableCell>
            ))}
        </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                {weekDays.map((weekDay) => 
                    <TableCell key={weekDay.weekDate} sx={{borderBottom: 0, borderRight: 1, borderLeft: 1, borderColor: "RGB(222, 225, 230)", width: '11.25%', padding: '0px', fontSize: '20px'}}>
                        <Grid container direction={"row"} justifyContent={getUserStyle(weekDay)} paddingRight={getPadding(weekDay)} paddingLeft={getPadding(weekDay)}>
                            {getUser(weekDay, tasks, sharedUsers).map((user) => 
                            <Grid item>
                                <Tooltip title={<Typography variant="subtitle2">{user}</Typography>}>
                                    <Avatar sx={{bgcolor: "RGB(85 85 85)", width:" 3vw", height: "3vw", fontSize:"3vw"}}>
                                        {user[0].toUpperCase()}
                                    </Avatar>
                                </Tooltip>
                            </Grid>
                            )}
                        </Grid>
                    </TableCell>
                )}
            </TableRow>
        </TableBody>
        </Table>
        </TableContainer>
        </Box> 
            <DayBarChart weekDays={weekDays} tasks={tasks} setNewTask={setNewTask} sharedUsers={sharedUsers} setUpdate={setUpdate} />
            <AddTask open={open} setOpen={setOpen} date={date} user={user} setNewTask={setNewTask} setUpdate={setUpdate} />
        </Box> 
    );
}

export default WeekTable;