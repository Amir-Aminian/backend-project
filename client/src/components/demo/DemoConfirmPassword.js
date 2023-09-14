import { Button, Container, Grid, Typography, Dialog, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Stack } from "@mui/system";
import { toast } from 'react-toastify';
import { Controller } from 'react-hook-form';

const InputForm = ({ type, id, label, control, rules, defaultValue }) => {

    const getShrink = (type) => {
        if (type === "time" || type === "datetime") {
            return({shrink: true});
        }
    };

    return (
        <Grid container item>
            <Controller
                name={id}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
                render={({field:{onChange, value}, fieldState:{error}}) => (
                    <TextField type={type} id={id} label={label} InputLabelProps={getShrink(type)} onChange={onChange} value={value} error={!!error} helperText={error ? error.message : null} variant="outlined" size="small" fullWidth disabled />
                )}
            />
        </Grid>
    );
}

const DemoConfirmPassword = ({passWindow, setPassWindow, setOpen, demoTasks, setDemoTasks, demoShare, setDemoShare, setInvisible, setBadge1, setBadge2}) => {
    const {control, handleSubmit} = useForm({mode:"all"});

    const submit = () => {
        if (demoTasks.length > 0) {
            setPassWindow(false);
            toast.error("You have already added this email address to your account.", {
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
        setPassWindow(false);
        setDemoTasks([{
            "id": "Demo",
            "status": false,
            "user": "Demo",
            "date": new Date().setHours(0,0,0,0),
            "taskTitle": "Study",
            "startTime": "08:00",
            "endTime": "10:00",
            "taskDescription": "Study how to code.",
            "color": "rgb(219, 68, 55)",
            "colorLabel": "Red"
        }]);
        setTimeout(() => {
            setBadge1(false);
            setInvisible(false);
            setDemoTasks([{
                "id": "Demo",
                "status": true,
                "user": "Demo",
                "date": new Date().setHours(0,0,0,0),
                "taskTitle": "Study",
                "startTime": "08:00",
                "endTime": "10:00",
                "taskDescription": "Study how to code.",
                "color": "rgb(219, 68, 55)",
                "colorLabel": "Red"
            }])},
            5000
        );
        if (demoShare.length === 0) {
            setTimeout(() => {
                setBadge2(false);
                setInvisible(false);
                setDemoShare([{
                    "id": "Demo",
                    "status": false,
                    "user": "Demo",
                    "date": new Date().setHours(0,0,0,0),
                    "taskTitle": "Study",
                    "startTime": "08:00",
                    "endTime": "10:00",
                    "taskDescription": "Study how to code.",
                    "color": "rgb(219, 68, 55)",
                    "colorLabel": "Red"
                }])},
                5000
            );
        }        
        toast.success("Successfully added new user.", {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
        });}
    };     
      
    return (
        <Dialog open={passWindow} onClose={() => setPassWindow(false)} sx={{overflow:"scroll"}}>            
            <Container maxWidth="xs" sx={{mt: 2, mb: 2, backgroundColor: "white", borderRadius: "1%"}}>            
                <form onSubmit={handleSubmit(submit)}>
                    <Stack direction="column" spacing={2}>
                        <Typography>Please type in your password to confirm it is you:</Typography>
                        <InputForm type="password" id="password" label="Password" control={control} rules={{required: "This field is required", minLength: {value: 8, message: "Password must have at least 8 characters"}}} defaultValue={"12345678"} />
                        <Typography align={"justify"} color={"red"}>Attention! <br /> Demo user is also going to send you a share request just to show you how this feature works.</Typography>
                        <Grid container direction="row" justifyContent="center">
                            <Grid item>
                                <Button type="button" onClick={() => setPassWindow(false)} variant="contained" size="large" sx={{mb:2, mr:3}}>Close</Button>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained" size="large" sx={{mb:2, ml:3}}>Confirm</Button>
                            </Grid>
                        </Grid>
                    </Stack>
                </form>
            </Container>
        </Dialog>
    );
}

export default DemoConfirmPassword;