import { AddCircleOutline } from "@mui/icons-material";
import { Grid, IconButton, Typography, Table, Box, TableCell, TableContainer, TableHead, TableRow, TableBody, Avatar, Tooltip } from "@mui/material";
import React, { useState } from "react";
import DemoDayBarChart from "./DemoDayBarChart";
import DemoAddTask from "./DemoAddTask";
import demoGetUser from "./demoGetUser";

const DemoWeekTable = ({year, weekDays, scrollToDate, tasks, setTasks, user, demoTasks}) => {
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

    let users = [];
    weekDays.map((weekDay) =>{ 
        const allUsers = demoGetUser(weekDay, tasks, demoTasks);
        allUsers.forEach((data) => {
            const index = users.findIndex((user) => user === data);
            if (index === -1) {
            users.push(data);
            };
        });
    });

    const getUserStyle = () => {
        if (users.length > 1) {
            return("space-between");
        } else if (users.length === 1) {
            return("center");
        }
    };

    const getPadding = () => {
        if (users.length === 3) {
            return("1%");
        } else if (users.length === 2) {
            return("10%");
        }
    };

    const sortArrayByOther = (array1) => {
        let users = [];      
        const indexMap = new Map();
        weekDays.map((weekDay) =>{ 
            const allUsers = demoGetUser(weekDay, tasks, demoTasks);
            allUsers.forEach((data) => {
                const index = users.findIndex((user) => user === data);
                if (index === -1) {
                users.push(data);
                };
            });
        });
        users.forEach((element, index) => {
            indexMap.set(element, index);
        });
        array1.sort((a, b) => indexMap.get(a) - indexMap.get(b));
        return array1;
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
                        <Grid container direction={"row"} justifyContent={getUserStyle()} paddingRight={getPadding()} paddingLeft={getPadding()}>
                            {users.map((user) => {
                                if (sortArrayByOther(demoGetUser(weekDay, tasks, demoTasks)).includes(user)) {
                                    return(
                                        <Grid item key={weekDay+user}>
                                            <Tooltip title={<Typography variant="subtitle2">{user}</Typography>}>
                                                <Avatar sx={{bgcolor: "RGB(85 85 85)", width:" 3vw", height: "3vw", fontSize:"3vw"}}>
                                                    {user[0].toUpperCase()}
                                                </Avatar>
                                            </Tooltip>
                                        </Grid>
                                    )
                                } else {
                                    return(
                                        <Grid item key={weekDay+user}>
                                            <Avatar sx={{bgcolor: "white", width:" 3vw", height: "3vw", fontSize:"3vw"}} />
                                        </Grid>
                                    )
                                }
                            }
                            )}
                        </Grid>
                    </TableCell>
                )}
            </TableRow>
        </TableBody>
        </Table>
        </TableContainer>
        </Box> 
            <DemoDayBarChart weekDays={weekDays} tasks={tasks} setTasks={setTasks} demoTasks={demoTasks} />
            <DemoAddTask open={open} setOpen={setOpen} date={date} user={user} tasks={tasks} setTasks={setTasks} />
        </Box> 
    );
}

export default DemoWeekTable;