import { Avatar, Button, Chip, Container, Grid, Modal, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import InputForm from "../../forms/InputForm";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import ConfirmPassword from "./ConfirmPassword";
import ManageUsers from "./ManageUsers";

const AddSharedUser = ({open, setOpen, user, sharedUser, setSharedUser, users}) => {
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
        };
    }, [sharedUser]);
      
    return (
        <Modal open={open} onClose={() => setOpen(false)} sx={{overflow:"scroll"}}>            
            <Container maxWidth="xs" sx={{mt: 2, mb: 2, backgroundColor: "white", borderRadius: "1%"}}>            
                <form onSubmit={handleSubmit(submit)}>
                    <Stack direction="column" spacing={2}>
                        <Avatar sx={{backgroundColor:"rgb(0, 114, 181)", mt: 2}}></Avatar>
                        <Chip label={user} variant="outlined" sx={{width:"30%"}} />
                        <Typography>Type in the user's email address you want to add:</Typography>
                        <InputForm type="email" id="email" label="Email Address" control={control} rules={{required: "This field is required"}} defaultValue={""} />
                        <Grid container justifyContent="right">
                            <Grid item>
                                <Button type="submit" variant="contained" size="large" sx={{mb:2, ml:4}}>Add User</Button>
                            </Grid>
                        </Grid>
                    </Stack>
                </form>
                <ManageUsers setOpen={setOpen} users={users} setSharedUser={setSharedUser} />
                <ConfirmPassword passWindow={passWindow} setPassWindow={setPassWindow} setSharedUser={setSharedUser} email={email} setOpen={setOpen} />
            </Container>
        </Modal>
    );
}

export default AddSharedUser;