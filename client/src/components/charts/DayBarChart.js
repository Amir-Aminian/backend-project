import { Bar } from "react-chartjs-2";
import {chart as chartjs} from "chart.js/auto"
import {Chart} from 'chart.js';
import 'chartjs-adapter-luxon';
import { Box } from "@mui/material";
import ViewTask from "../homePage/ViewTask";
import { useState } from "react";
import GetTask from "../../utilities/GetTask";

const DayBarChart = ({weekDays, tasks, setNewTask, sharedUsers, setUpdate}) => {
    const [open, setOpen] = useState(false);

    const [task, setTask] = useState({});

    const [date, setDate] = useState([]);

    const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
    
    const days = ["Sun", "Mon", "Tue", "wed", "Thu", "Fri", "Sat"];

    const dayTasks = weekDays.map((weekDay) => GetTask(weekDay, tasks, sharedUsers));

    const getDay = (date) => {
        const d = new Date(date);
        const index = d.getDay();
        return(labels[index]);
    };

    let finalTasks = [];

    const clickHandler = (e, element) => {
        if (element.length>0) {
            let date = [];
            const dateNumber = finalTasks[element[0].datasetIndex].task_date;
            const d = new Date(dateNumber);
            const day = days[d.getDay()];
            const dayDate = d.getDate();
            const month = months[d.getMonth()];
            const year = d.getFullYear();
            date.push(day, dayDate, month, year);
            setDate(date)
            setTask(finalTasks[element[0].datasetIndex]);
            setOpen(true);
        };
    };

    const labels = ["Mon", "Tue", "wed", "Thu", "Fri", "Sat", "Sun"];

    let datasets = [];

    dayTasks.forEach((task) =>( 
      task.forEach((data) =>{ 
        finalTasks.push(data);
        datasets.push({data:[{x:getDay(data.task_date), y:[data.task_start_time, data.task_end_time]}], backgroundColor:data.task_color, stack:data.username})
      })
    ));

    const data = {
        labels: labels,
        datasets: datasets
    };
    
    const options= {
        onClick:(e, element) => clickHandler(e, element),
        maintainAspectRatio:false,
        indexAxis:"x",
        borderSkipped:false,
        borderRadius:"5", 
        barPercentage:"0.3", 
        categoryPercentage: "1.1",
        plugins: {
            legend:{display:false},
            tooltip:{enabled:false}
        },
        responsive: true,
        scales: {
          x: {
            position: "top",
            stacked: true, 
            ticks:{
              color: "white"
            }
          },
          y: {
            reverse: true,
            stacked: false,
            type:"time",
            min:"00:00",
            max:"24:00",
            time:{
                unit:"hour",
                displayFormats:{hour:"ha"}
            }
          }
        }
      };

    return (
        <Box height={2300} marginTop={"-21px"}>
            <Bar data={data} options={options}/>
            <ViewTask open={open} setOpen={setOpen} date={date} task={task} setNewTask={setNewTask} setUpdate={setUpdate} />
        </Box>
    );
}

export default DayBarChart;