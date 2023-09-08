import { Avatar, Badge, Button, Chip, Container, Fab, Grid, Modal, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import SetTask from "../../utilities/SetTask";
import InputForm from "../../forms/InputForm";
import { DateRange } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { useState } from "react";
import addNewTask from "../../requests/addNewTask";
import { toast } from 'react-toastify';

const AddTask = ({open, setOpen, date, user, setNewTask, setUpdate}) => {
    const {control, reset, handleSubmit} = useForm({mode:"all"});

    const[color, setColor] = useState("rgb(66, 133, 244)");

    const[colorLabel, setColorLabel] = useState("Blue");

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
            const result = await addNewTask({date: new Date(date).getTime() ,...data , color:color, colorLabel:colorLabel});
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
                setNewTask(result.task_id+"added");
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
      
    if (getOS() && getBrowser()) {
        return (
            <Modal open={open} onClose={() => setOpen(false)} sx={{overflow:"scroll"}}>            
                <Container maxWidth="xs" sx={{mt: 2, mb: 2, backgroundColor: "white", borderRadius: "1%"}}>            
                    <form onSubmit={handleSubmit(submit)}>
                        <Stack direction="column" spacing={2}>
                            <Avatar sx={{backgroundColor:"rgb(0, 114, 181)", mt: 2}}></Avatar>
                            <Chip label={user} variant="outlined" sx={{width:"30%"}} />
                            <Stack direction="row" spacing={1}>
                                <DateRange />
                                <Typography>{date[0]}, {date[1]} {date[2]} {date[3]}</Typography>
                            </Stack>                    
                            <InputForm type="text" id="taskTitle" label="Task Title" control={control} rules={{required: "This field is required"}} defaultValue={""} />
                            <InputForm type="datetime" id="startTime" label="Task Start Time" control={control} rules={{required: "This field is required", validate: validateTimeFormat}} defaultValue={"--:--"} />
                            <InputForm type="datetime" id="endTime" label="Task End Time" control={control} rules={{required: "This field is required", validate: validateTimeFormat}} defaultValue={"--:--"} />
                            <InputForm type="text" id="taskDescription" label="Task Description" control={control} rules={{required: "This field is required"}} defaultValue={""} />
                            <Stack direction="row" spacing={2}>
                                <Typography>Pick a color for this task:</Typography>
                                <Badge badgeContent="" sx={{"& .MuiBadge-badge":{backgroundColor:color}}}>
                                    <Chip label={colorLabel} />  
                                </Badge>                         
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Fab onClick={() => {setColor("rgb(66, 133, 244)"); setColorLabel("Blue")}} size="small" sx={{backgroundColor:"rgb(66, 133, 244)", ":hover":{backgroundColor:"rgb(66, 133, 244)"}}} />
                                <Fab onClick={() => {setColor("rgb(219, 68, 55)"); setColorLabel("Red")}} size="small" sx={{backgroundColor:"rgb(219, 68, 55)", ":hover":{backgroundColor:"rgb(219, 68, 55)"}}} />
                                <Fab onClick={() => {setColor("rgb(244, 180, 0)"); setColorLabel("Yellow")}} size="small" sx={{backgroundColor:"rgb(244, 180, 0)", ":hover":{backgroundColor:"rgb(244, 180, 0)"}}} />
                                <Fab onClick={() => {setColor("rgb(15, 157, 88)"); setColorLabel("Green")}} size="small" sx={{backgroundColor:"rgb(15, 157, 88)", ":hover":{backgroundColor:"rgb(15, 157, 88)"}}} />
                            </Stack>
                            <Grid container direction="row" justifyContent="center">
                                <Grid item>
                                    <Button type="button" onClick={() => setOpen(false)} variant="contained" size="large" sx={{mb:2, mr:4}}>Close</Button>
                                </Grid>
                                <Grid item>
                                    <Button type="submit" variant="contained" size="large" sx={{mb:2, ml:4}}>Save</Button>
                                </Grid>
                            </Grid>
                        </Stack>
                    </form>
                </Container>
            </Modal>
        );
    } else {
        return (
            <Modal open={open} onClose={() => setOpen(false)} sx={{overflow:"scroll"}}>            
                <Container maxWidth="xs" sx={{mt: 2, mb: 2, backgroundColor: "white", borderRadius: "1%"}}>            
                    <form onSubmit={handleSubmit(submit)}>
                        <Stack direction="column" spacing={2}>
                            <Avatar sx={{backgroundColor:"rgb(0, 114, 181)", mt: 2}}></Avatar>
                            <Chip label={user} variant="outlined" sx={{width:"30%"}} />
                            <Stack direction="row" spacing={1}>
                                <DateRange />
                                <Typography>{date[0]}, {date[1]} {date[2]} {date[3]}</Typography>
                            </Stack>                    
                            <InputForm type="text" id="taskTitle" label="Task Title" control={control} rules={{required: "This field is required"}} defaultValue={""} />
                            <InputForm type="time" id="startTime" label="Task Start Time" control={control} rules={{required: "This field is required"}} defaultValue={""} />
                            <InputForm type="time" id="endTime" label="Task End Time" control={control} rules={{required: "This field is required"}} defaultValue={""} />
                            <InputForm type="text" id="taskDescription" label="Task Description" control={control} rules={{required: "This field is required"}} defaultValue={""} />
                            <Stack direction="row" spacing={2}>
                                <Typography>Pick a color for this task:</Typography>
                                <Badge badgeContent="" sx={{"& .MuiBadge-badge":{backgroundColor:color}}}>
                                    <Chip label={colorLabel} />  
                                </Badge>                         
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Fab onClick={() => {setColor("rgb(66, 133, 244)"); setColorLabel("Blue")}} size="small" sx={{backgroundColor:"rgb(66, 133, 244)", ":hover":{backgroundColor:"rgb(66, 133, 244)"}}} />
                                <Fab onClick={() => {setColor("rgb(219, 68, 55)"); setColorLabel("Red")}} size="small" sx={{backgroundColor:"rgb(219, 68, 55)", ":hover":{backgroundColor:"rgb(219, 68, 55)"}}} />
                                <Fab onClick={() => {setColor("rgb(244, 180, 0)"); setColorLabel("Yellow")}} size="small" sx={{backgroundColor:"rgb(244, 180, 0)", ":hover":{backgroundColor:"rgb(244, 180, 0)"}}} />
                                <Fab onClick={() => {setColor("rgb(15, 157, 88)"); setColorLabel("Green")}} size="small" sx={{backgroundColor:"rgb(15, 157, 88)", ":hover":{backgroundColor:"rgb(15, 157, 88)"}}} />
                            </Stack>
                            <Grid container direction="row" justifyContent="center">
                                <Grid item>
                                    <Button type="button" onClick={() => setOpen(false)} variant="contained" size="large" sx={{mb:2, mr:4}}>Close</Button>
                                </Grid>
                                <Grid item>
                                    <Button type="submit" variant="contained" size="large" sx={{mb:2, ml:4}}>Save</Button>
                                </Grid>
                            </Grid>
                        </Stack>
                    </form>
                </Container>
            </Modal>
        );
    }
}

export default AddTask;