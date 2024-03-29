import { Avatar, Badge, Button, Chip, Container, Fab, Grid, Modal, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import InputForm from "../../forms/InputForm";
import { DateRange } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import SetTask from "../../utilities/SetTask";
import removeTask from "../../requests/removeTask";
import updateTask from "../../requests/updateTask";
import { toast } from 'react-toastify';

const ViewTask = ({open, setOpen, date, task, setNewTask, setUpdate}) => {   
    const {control, reset, handleSubmit} = useForm({mode:"all"});

    const[newColor, setNewColor] = useState(task.task_color);

    const[newColorLabel, setNewColorLabel] = useState(task.task_color_label);

    useEffect(() => {
        setNewColor(task.task_color);
        setNewColorLabel(task.task_color_label);
    }, [task.task_color, task.task_color_label]);

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

    const submit = async (data) => {
        if (SetTask(data.startTime, data.endTime) != false) {
            const result = await updateTask({date: new Date(date).getTime(), taskId: task.task_id ,...data , color:newColor, colorLabel:newColorLabel});
            if (result.error) {
                toast.warning(result.error, {
                    position: "top-center",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                reset();
                setOpen(false);
                setNewTask(task.task_id+"updated");
                setUpdate(true);
                toast.success(result.message, {
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
    };

    const deleteTask = async () => {
        const result = await removeTask({taskId: task.task_id});
        if (result.error) {
            toast.warning(result.error, {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        } else {
            setOpen(false);
            setNewTask(task.task_id+"deleted");
            setUpdate(true);
            toast.success(result.message, {
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
            <Modal open={open} onClose={() => {setOpen(false); reset(); setNewColor(task.task_color); setNewColorLabel(task.task_color_label);}} sx={{overflow:"scroll"}}>            
                <Container maxWidth="xs" sx={{mt: 2, mb: 2, backgroundColor: "white", borderRadius: "1%"}}>            
                    <form onSubmit={handleSubmit(submit)}>
                        <Stack direction="column" spacing={2}>
                            <Avatar sx={{backgroundColor:"rgb(0, 114, 181)", mt: 2}}></Avatar>
                            <Chip label={task.username} variant="outlined" sx={{width:"30%"}} />
                            <Stack direction="row" spacing={1}>
                                <DateRange />
                                <Typography>{date[0]}, {date[1]} {date[2]} {date[3]}</Typography>
                            </Stack>                    
                            <InputForm type="text" id="taskTitle" label="Task Title" control={control} rules={{required: "This field is required"}} defaultValue={task.task_title} />
                            <InputForm type="datetime" id="startTime" label="Task Start Time" control={control} rules={{required: "This field is required", validate: validateTimeFormat}} defaultValue={task.task_start_time} />
                            <InputForm type="datetime" id="endTime" label="Task End Time" control={control} rules={{required: "This field is required", validate: validateTimeFormat}} defaultValue={task.task_end_time} />
                            <InputForm type="text" id="taskDescription" label="Task Description" control={control} rules={{required: "This field is required"}} defaultValue={task.task_description} />
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
                                    <Button type="button" onClick={() => {setOpen(false); reset(); setNewColor(task.task_color); setNewColorLabel(task.task_color_label);}} variant="contained" size="large" sx={{mb:2, mr:2}}>Close</Button>
                                </Grid>
                                <Grid item>
                                    <Button type="button" onClick={() => deleteTask()} variant="contained" size="large" sx={{mb:2}}>Delete</Button>
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
            <Modal open={open} onClose={() => {setOpen(false); reset(); setNewColor(task.task_color); setNewColorLabel(task.task_color_label);}} sx={{overflow:"scroll"}}>            
                <Container maxWidth="xs" sx={{mt: 2, mb: 2, backgroundColor: "white", borderRadius: "1%"}}>            
                    <form onSubmit={handleSubmit(submit)}>
                        <Stack direction="column" spacing={2}>
                            <Avatar sx={{backgroundColor:"rgb(0, 114, 181)", mt: 2}}></Avatar>
                            <Chip label={task.username} variant="outlined" sx={{width:"30%"}} />
                            <Stack direction="row" spacing={1}>
                                <DateRange />
                                <Typography>{date[0]}, {date[1]} {date[2]} {date[3]}</Typography>
                            </Stack>                    
                            <InputForm type="text" id="taskTitle" label="Task Title" control={control} rules={{required: "This field is required"}} defaultValue={task.task_title} />
                            <InputForm type="time" id="startTime" label="Task Start Time" control={control} rules={{required: "This field is required"}} defaultValue={task.task_start_time} />
                            <InputForm type="time" id="endTime" label="Task End Time" control={control} rules={{required: "This field is required"}} defaultValue={task.task_end_time} />
                            <InputForm type="text" id="taskDescription" label="Task Description" control={control} rules={{required: "This field is required"}} defaultValue={task.task_description} />
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
                                    <Button type="button" onClick={() => {setOpen(false); reset(); setNewColor(task.task_color); setNewColorLabel(task.task_color_label);}} variant="contained" size="large" sx={{mb:2, mr:2}}>Close</Button>
                                </Grid>
                                <Grid item>
                                    <Button type="button" onClick={() => deleteTask()} variant="contained" size="large" sx={{mb:2}}>Delete</Button>
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