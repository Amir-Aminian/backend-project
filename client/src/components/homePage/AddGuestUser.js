import { Button, Container, Grid, Modal, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import InputForm from "../../forms/InputForm";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import ConfirmPassword from "./ConfirmPassword";

const AddGuestUser = ({open, setOpen, sharedUser, setSharedUser, setUpdate}) => {
    const {control, reset, handleSubmit} = useForm();

    const [passWindow, setPassWindow] = useState(false);

    const [email, setEmail] = useState();

    const submit = (data) => {
        setEmail(data);
        setPassWindow(true);
    };    

    useEffect(() => {
        if (sharedUser == "added") {
            reset();
            setOpen(false);
        };
    }, [sharedUser]);
      
    return (
        <Modal open={open} onClose={() => setOpen(false)} sx={{overflow:"scroll"}}>            
            <Container maxWidth="xs" sx={{mt: 6, mb: 2, backgroundColor: "white", borderRadius: "1%"}}>            
                <form onSubmit={handleSubmit(submit)}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h5" align={"center"} sx={{mt: 2}}>Add a new guest user</Typography>
                        <Typography align={"justify"}>By adding a Guest user to your account you will be able to see all their tasks in real time. Please type in the user's email address you want to add:</Typography>
                        <InputForm type="email" id="email" label="Gust User's Email Address" control={control} rules={{required: "This field is required"}} defaultValue={""} />
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
                <ConfirmPassword passWindow={passWindow} setPassWindow={setPassWindow} setSharedUser={setSharedUser} email={email} setOpen={setOpen} setUpdate={setUpdate} />
            </Container>
        </Modal>
    );
}

export default AddGuestUser;