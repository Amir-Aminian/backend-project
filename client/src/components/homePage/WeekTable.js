import { AddCircleOutline } from "@mui/icons-material";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import DayBarChart from "../charts/DayBarChart";
import AddTask from "./AddTask";

const WeekTable = ({year, month, weekDays, scrollToDate}) => {
    const [open, setOpen] = useState(false);

    const [date, setDate] = useState([]);

    const style = (weekDay) => {
        if ((new Date().getDate() === weekDay.weekDate) && (new Date().getMonth() === weekDay.monthNumber) && (new Date().getFullYear() === weekDay.yearNumber)) {
            return({border:5, borderColor:"rgb(46 182 125)"});
        } else {
            return({borderBottom:1});
        };
    };

    const today = (weekDay) => {
        if ((new Date().getDate() === weekDay.weekDate) && (new Date().getMonth() === weekDay.monthNumber) && (new Date().getFullYear() === weekDay.yearNumber)) {
            return(scrollToDate);
        } else {
            return(null);
        };
    };

    return (
        <Grid container item direction="column" alignItems="center" justifyContent="center" spacing={2}>
            <Grid item>
                <Typography variant="h5">{month} &nbsp; {year}</Typography>
            </Grid>   
            <Grid container item direction="column" alignItems="center" justifyContent="center" spacing={1} sx={{mb: 2}}>                                
                {weekDays.map((weekDay) => (
                    <Grid container item key={weekDay.weekDate} direction="row" alignItems="center" sx={style(weekDay)} ref={today(weekDay)}> 
                        <Grid item xs={4.5} sm={2.2} md={1.5} lg={1.3}>                           
                            <Card align="center">
                                <CardContent>
                                    <Typography variant="body1" borderBottom={1}>
                                        {weekDay.weekDay}
                                    </Typography>
                                    <Typography variant="h5" border={1} borderRadius={"10%"} color={"white"} sx={{backgroundColor:"rgb(25, 118, 210)", maxWidth:40}}>
                                        {weekDay.weekDate}
                                    </Typography>
                                    <Typography variant="body2">
                                        {weekDay.weekMonth}
                                    </Typography>                                        
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.7}>                                
                            <IconButton onClick={() => {setDate([weekDay.weekDay, weekDay.weekDate, weekDay.weekMonth, year]);setOpen(true);}}>
                                <AddCircleOutline />
                            </IconButton>
                        </Grid>  
                        <Grid item xs={12} sm={12} md={10} lg={10}>
                            <DayBarChart date={[weekDay.weekDay, weekDay.weekDate, weekDay.weekMonth, year]} />
                        </Grid>                      
                    </Grid>
                ))}
            </Grid> 
            <AddTask open={open} setOpen={setOpen} date={date} />
        </Grid>
    );
}

export default WeekTable;