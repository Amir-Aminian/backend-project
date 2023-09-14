import { Button, Container, Grid, Modal, Typography, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Stack } from "@mui/system";
import { useState } from "react";
import DemoConfirmPassword from "./DemoConfirmPassword";
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

const DemoAddGuestUser = ({open, setOpen, demoTasks, setDemoTasks, demoShare, setDemoShare, setInvisible, setBadge1, setBadge2}) => {
    const {control, handleSubmit} = useForm({mode:"all"});

    const [passWindow, setPassWindow] = useState(false);

    const submit = (data) => {
        setPassWindow(true);
    };    
      
    return (
        <Modal open={open} onClose={() => setOpen(false)} sx={{overflow:"scroll"}}>            
            <Container maxWidth="xs" sx={{mt: 6, mb: 2, backgroundColor: "white", borderRadius: "1%"}}>            
                <form onSubmit={handleSubmit(submit)}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h5" align={"center"} sx={{mt: 2}}>Add a new guest user</Typography>
                        <Typography align={"justify"}>By adding a Guest user to your account you will be able to see all their tasks in real time. Please type in the user's email address you want to add:</Typography>
                        <InputForm type="email" id="email" label="Gust User's Email Address" control={control} rules={{required: "This field is required", pattern: {value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, message: "Please enter a valid email"}}} defaultValue={"demo@test.com"} />
                        <Typography align={"justify"} color={"red"}>Attention! <br /> This is just a demo to show you how this feature works.</Typography>
                        <Grid container direction={"row"} justifyContent="center">
                            <Grid item>
                                <Button type="button" onClick={() => setOpen(false)} variant="contained" size="large" sx={{mb:2, mr:4}}>Close</Button>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained" size="large" sx={{mb:2, ml:4}}>Add User</Button>
                            </Grid>
                        </Grid>
                    </Stack>
                </form>
                <DemoConfirmPassword passWindow={passWindow} setPassWindow={setPassWindow} setOpen={setOpen} demoTasks={demoTasks} setDemoTasks={setDemoTasks} demoShare={demoShare} setDemoShare={setDemoShare} setInvisible={setInvisible} setBadge1={setBadge1} setBadge2={setBadge2} />
            </Container>
        </Modal>
    );
}

export default DemoAddGuestUser;