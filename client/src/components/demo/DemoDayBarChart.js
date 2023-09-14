import { Bar } from "react-chartjs-2";
import {chart as chartjs} from "chart.js/auto"
import {Chart} from 'chart.js';
import 'chartjs-adapter-luxon';
import { Box } from "@mui/material";
import DemoViewTask from "./DemoViewTask";
import { useState } from "react";
import demoGetTask from "./demoGetTask";

const DemoDayBarChart = ({weekDays, tasks, setTasks, demoTasks}) => {
    const [open, setOpen] = useState(false);

    const [task, setTask] = useState({});

    const [date, setDate] = useState([]);

    const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
    
    const days = ["Sun", "Mon", "Tue", "wed", "Thu", "Fri", "Sat"];

    const dayTasks = weekDays.map((weekDay) => demoGetTask(weekDay, tasks, demoTasks));

    const getDay = (date) => {
        const d = new Date(date);
        const index = d.getDay();
        return(days[index]);
    };

    let finalTasks = [];

    const clickHandler = (e, element) => {
        if (element.length>0) {
            let date = [];
            const dateNumber = finalTasks[element[0].datasetIndex].date;
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
        datasets.push({data:[{x:getDay(data.date), y:[data.startTime, data.endTime]}], backgroundColor:data.color, stack:data.user})
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
            <DemoViewTask open={open} setOpen={setOpen} date={date} task={task} tasks={tasks} setTasks={setTasks} />
        </Box>
    );
}

export default DemoDayBarChart;