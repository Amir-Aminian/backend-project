import { Bar } from "react-chartjs-2";
import {chart as chartjs} from "chart.js/auto"
import {Chart} from 'chart.js';
import 'chartjs-adapter-luxon';
import { Box } from "@mui/material";
import ViewTask from "../homePage/ViewTask";
import { useState } from "react";
import GetTask from "../../utilities/GetTask";

const DayBarChart = ({date, tasks, user, setNewTask}) => {
    const [open, setOpen] = useState(false);

    const [task, setTask] = useState({});

    const dayTasks = GetTask(date, tasks);

    const clickHandler = (e, element) => {
        if (element.length>0) {
            setOpen(true);
            setTask(dayTasks[element[0].datasetIndex]);
        };
    };

    return (
        <Box sx={{overflowX:"scroll", overflowY:"hidden"}}>
            <Box width={2300}>
                <Bar
                    data={{
                        datasets:
                            dayTasks.map((data) =>( 
                                {data:[{x:[data.task_start_time, data.task_end_time],y:user}], backgroundColor:data.task_color}
                            ))
                    }} 
                    options={{
                        onClick:(e, element) => clickHandler(e, element),
                        maintainAspectRatio:false,
                        indexAxis:"y",
                        borderSkipped:false,
                        borderRadius:"5", 
                        barPercentage:"0.2", 
                        plugins:{
                            legend:{display:false},
                            tooltip:{enabled:false}                    
                        }, 
                        scales:{
                            x:{
                                type:"time",
                                min:"00:00",
                                max:"24:00",
                                time:{
                                    unit:"minute",
                                    displayFormats:{hour:"ha"}
                            }
                            }, 
                            y:{
                                stacked:true,
                                grid:{display:false},
                                ticks:{
                                    font:{size:"15%"}
                                }
                            }
                        }
                    }}
                />
            </Box>
            <ViewTask open={open} setOpen={setOpen} date={date} task={task} user={user} setNewTask={setNewTask} />
        </Box>
    );
}

export default DayBarChart;