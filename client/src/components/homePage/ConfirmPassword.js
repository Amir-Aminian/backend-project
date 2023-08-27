import { Button, Container, Grid, Typography, Dialog } from "@mui/material";
import { useForm } from "react-hook-form";
import InputForm from "../../forms/InputForm";
import { Stack } from "@mui/system";
import shareUser from "../../requests/shareUser";
import { toast } from 'react-toastify';

const ConfirmPassword = ({passWindow, setPassWindow, email, setSharedUser, setUpdate}) => {
    const {control, reset, handleSubmit} = useForm();

    const submit = async (data) => {
        const result = await shareUser({...email, ...data});
        if (result.error) {
            setPassWindow(false);
            reset();
            toast.error(result.error, {
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
            setPassWindow(false);
            reset();
            setSharedUser("added");
            setUpdate({status: true, userEmail: email.email, from: "sender"});
            toast.success(result, {
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
      
    return (
        <Dialog open={passWindow} onClose={() => setPassWindow(false)} sx={{overflow:"scroll"}}>            
            <Container maxWidth="xs" sx={{mt: 2, mb: 2, backgroundColor: "white", borderRadius: "1%"}}>            
                <form onSubmit={handleSubmit(submit)}>
                    <Stack direction="column" spacing={2}>
                        <Typography>Please type in your password to confirm it is you:</Typography>
                        <InputForm type="password" id="password" label="Password" control={control} rules={{required: "This field is required", minLength: {value: 8, message: "Password must have at least 8 characters"}}} defaultValue={""} />
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

export default ConfirmPassword;