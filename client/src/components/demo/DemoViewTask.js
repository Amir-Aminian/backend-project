import { Avatar, Badge, Button, Chip, Container, Fab, Grid, Modal, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import InputForm from "../../forms/InputForm";
import { DateRange } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import demoUpdateTask from "./demoUpdateTask";
import demoDeleteTask from "./demoDeleteTask";
import { toast } from 'react-toastify';

const ViewTask = ({open, setOpen, date, task, tasks, setTasks}) => {   
    const {control, reset, handleSubmit} = useForm({mode:"all"});

    const[newColor, setNewColor] = useState(task.color);

    const[newColorLabel, setNewColorLabel] = useState(task.colorLabel);

    useEffect(() => {
        setNewColor(task.color);
        setNewColorLabel(task.colorLabel);
    }, [task.color, task.colorLabel]);

    const validateTimeFormat = (value) => {
        const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(value)) {
          return "Please enter a valid time in the 24-hour format (HH:MM).";
        }
        return true;
    };

    const getOS = () => {
        const userAgent = navigator.userAgent;
        if (/Macintosh/.test(userAgent)) {
            return(true)
        }
    };    
    
    const getBrowser = () => {
        const userAgent = navigator.userAgent;
        if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
          return(true);
      }        
    };

    const submit = (data) => {
        if (demoUpdateTask(task.id, {user: task.user, date: new Date(date).getTime(), ...data, color:newColor, colorLabel:newColorLabel, id:task.id}, tasks, setTasks)) {
            setOpen(false);
            reset();            
            toast.success("Successfully updated the task.", {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        };
    }        

    const handleDelete = (id, tasks, setTasks) => {
        if (demoDeleteTask(id, tasks, setTasks)) {
            setOpen(false);
            reset();
            toast.success("Successfully deleted the task.", {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        };         
    };

    if (getOS() && getBrowser()) {
        return (
            <Modal open={open} onClose={() => {setOpen(false); reset(); setNewColor(task.color); setNewColorLabel(task.colorLabel);}} sx={{overflow:"scroll"}}>            
                <Container maxWidth="xs" sx={{mt: 2, mb: 2, backgroundColor: "white", borderRadius: "1%"}}>            
                    <form onSubmit={handleSubmit(submit)}>
                        <Stack direction="column" spacing={2}>
                            <Avatar sx={{backgroundColor:"rgb(0, 114, 181)", mt: 2}}></Avatar>
                            <Chip label={task.user} variant="outlined" sx={{width:"30%"}} />
                            <Stack direction="row" spacing={1}>
                                <DateRange />
                                <Typography>{date[0]}, {date[1]} {date[2]} {date[3]}</Typography>
                            </Stack>                    
                            <InputForm type="text" id="taskTitle" label="Task Title" control={control} rules={{required: "This field is required"}} defaultValue={task.taskTitle} />
                            <InputForm type="datetime" id="startTime" label="Task Start Time" control={control} rules={{required: "This field is required", validate: validateTimeFormat}} defaultValue={task.startTime} />
                            <InputForm type="datetime" id="endTime" label="Task End Time" control={control} rules={{required: "This field is required", validate: validateTimeFormat}} defaultValue={task.endTime} />
                            <InputForm type="text" id="taskDescription" label="Task Description" control={control} rules={{required: "This field is required"}} defaultValue={task.taskescription} />
                            <Stack direction="row" spacing={2}>
                                <Typography>Pick a color for this task:</Typography>
                                <Badge badgeContent="" sx={{"& .MuiBadge-badge":{backgroundColor:newColor}}}>
                                    <Chip label={newColorLabel} />  
                                </Badge>                         
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Fab onClick={() => {setNewColor("rgb(66, 133, 244)"); setNewColorLabel("Blue")}} size="small" sx={{backgroundColor:"rgb(66, 133, 244)", ":hover":{backgroundColor:"rgb(66, 133, 244)"}}} />
                                <Fab onClick={() => {setNewColor("rgb(219, 68, 55)"); setNewColorLabel("Red")}} size="small" sx={{backgroundColor:"rgb(219, 68, 55)", ":hover":{backgroundColor:"rgb(219, 68, 55)"}}} />
                                <Fab onClick={() => {setNewColor("rgb(244, 180, 0)"); setNewColorLabel("Yellow")}} size="small" sx={{backgroundColor:"rgb(244, 180, 0)", ":hover":{backgroundColor:"rgb(244, 180, 0)"}}} />
                                <Fab onClick={() => {setNewColor("rgb(15, 157, 88)"); setNewColorLabel("Green")}} size="small" sx={{backgroundColor:"rgb(15, 157, 88)", ":hover":{backgroundColor:"rgb(15, 157, 88)"}}} />
                            </Stack>
                            <Grid container direction="row" justifyContent="center">
                                <Grid item>
                                    <Button type="button" onClick={() => {setOpen(false); reset(); setNewColor(task.color); setNewColorLabel(task.colorLabel);}} variant="contained" size="large" sx={{mb:2, mr:2}}>Close</Button>
                                </Grid>
                                <Grid item>
                                    <Button type="button" onClick={() => handleDelete(task.id, tasks, setTasks)} variant="contained" size="large" sx={{mb:2}}>Delete</Button>
                                </Grid>
                                <Grid item>
                                    <Button type="submit" variant="contained" size="large" sx={{mb:2, ml:2}}>Update</Button>
                                </Grid>
                            </Grid>
                        </Stack>
                    </form>
                </Container>
            </Modal>
        );
    } else {
        return (
            <Modal open={open} onClose={() => {setOpen(false); reset(); setNewColor(task.color); setNewColorLabel(task.colorLabel);}} sx={{overflow:"scroll"}}>            
                <Container maxWidth="xs" sx={{mt: 2, mb: 2, backgroundColor: "white", borderRadius: "1%"}}>            
                    <form onSubmit={handleSubmit(submit)}>
                        <Stack direction="column" spacing={2}>
                            <Avatar sx={{backgroundColor:"rgb(0, 114, 181)", mt: 2}}></Avatar>
                            <Chip label={task.user} variant="outlined" sx={{width:"30%"}} />
                            <Stack direction="row" spacing={1}>
                                <DateRange />
                                <Typography>{date[0]}, {date[1]} {date[2]} {date[3]}</Typography>
                            </Stack>                    
                            <InputForm type="text" id="taskTitle" label="Task Title" control={control} rules={{required: "This field is required"}} defaultValue={task.taskTitle} />
                            <InputForm type="time" id="startTime" label="Task Start Time" control={control} rules={{required: "This field is required"}} defaultValue={task.startTime} />
                            <InputForm type="time" id="endTime" label="Task End Time" control={control} rules={{required: "This field is required"}} defaultValue={task.endTime} />
                            <InputForm type="text" id="taskDescription" label="Task Description" control={control} rules={{required: "This field is required"}} defaultValue={task.taskDescription} />
                            <Stack direction="row" spacing={2}>
                                <Typography>Pick a color for this task:</Typography>
                                <Badge badgeContent="" sx={{"& .MuiBadge-badge":{backgroundColor:newColor}}}>
                                    <Chip label={newColorLabel} />  
                                </Badge>                         
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Fab onClick={() => {setNewColor("rgb(66, 133, 244)"); setNewColorLabel("Blue")}} size="small" sx={{backgroundColor:"rgb(66, 133, 244)", ":hover":{backgroundColor:"rgb(66, 133, 244)"}}} />
                                <Fab onClick={() => {setNewColor("rgb(219, 68, 55)"); setNewColorLabel("Red")}} size="small" sx={{backgroundColor:"rgb(219, 68, 55)", ":hover":{backgroundColor:"rgb(219, 68, 55)"}}} />
                                <Fab onClick={() => {setNewColor("rgb(244, 180, 0)"); setNewColorLabel("Yellow")}} size="small" sx={{backgroundColor:"rgb(244, 180, 0)", ":hover":{backgroundColor:"rgb(244, 180, 0)"}}} />
                                <Fab onClick={() => {setNewColor("rgb(15, 157, 88)"); setNewColorLabel("Green")}} size="small" sx={{backgroundColor:"rgb(15, 157, 88)", ":hover":{backgroundColor:"rgb(15, 157, 88)"}}} />
                            </Stack>
                            <Grid container direction="row" justifyContent="center">
                                <Grid item>
                                    <Button type="button" onClick={() => {setOpen(false); reset(); setNewColor(task.color); setNewColorLabel(task.colorLabel);}} variant="contained" size="large" sx={{mb:2, mr:2}}>Close</Button>
                                </Grid>
                                <Grid item>
                                    <Button type="button" onClick={() => handleDelete(task.id, tasks, setTasks)} variant="contained" size="large" sx={{mb:2}}>Delete</Button>
                                </Grid>
                                <Grid item>
                                    <Button type="submit" variant="contained" size="large" sx={{mb:2, ml:2}}>Update</Button>
                                </Grid>
                            </Grid>
                        </Stack>
                    </form>
                </Container>
            </Modal>
        );
    }
}

export default ViewTask;