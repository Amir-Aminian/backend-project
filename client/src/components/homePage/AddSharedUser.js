import { Avatar, Button, Chip, Container, Grid, Modal, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import InputForm from "../../forms/InputForm";
import { Stack } from "@mui/system";
import { useState } from "react";
import shareUser from "../../requests/shareUser";

const AddSharedUser = ({open, setOpen, user, setSharedUser}) => {
    const {control, reset, handleSubmit} = useForm();

    const submit = async (data) => {
        const result = await shareUser(data);
        if (result.error) {
            alert(result.error);
        } else {
            reset();
            setOpen(false);
            setSharedUser("added");
            alert(result);
        };
    };     
      
    return (
        <Modal open={open} onClose={() => setOpen(false)} sx={{overflow:"scroll"}}>            
            <Container maxWidth="xs" sx={{mt: 2, mb: 2, backgroundColor: "white", borderRadius: "1%"}}>            
                <form onSubmit={handleSubmit(submit)}>
                    <Stack direction="column" spacing={2}>
                        <Avatar sx={{backgroundColor:"rgb(0, 114, 181)", mt: 2}}></Avatar>
                        <Chip label={user} variant="outlined" sx={{width:"30%"}} />
                        <Typography>Type in the user's email address you want to add:</Typography>
                        <InputForm type="email" id="email" label="Email Address" control={control} rules={{required: "This field is required"}} defaultValue={""} />
                        <Typography>Type in your password:</Typography>
                        <InputForm type="password" id="password" label="Password" control={control} rules={{required: "This field is required", minLength: {value: 8, message: "Password must have at least 8 characters"}}} defaultValue={""} />
                        <Grid container direction="row" justifyContent="center">
                            <Grid item>
                                <Button type="button" onClick={() => setOpen(false)} variant="contained" size="large" sx={{mb:2, mr:4}}>Close</Button>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained" size="large" sx={{mb:2, ml:4}}>Add User</Button>
                            </Grid>
                        </Grid>
                    </Stack>
                </form>
            </Container>
        </Modal>
    );
}

export default AddSharedUser;