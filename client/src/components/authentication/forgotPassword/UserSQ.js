import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import InputForm from "../../../forms/InputForm";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import forgotPassSA from "../../../requests/forgotPassSA";
import { toast } from 'react-toastify';

const UserSQ = ({SQ1, SQ2, SQ3, setErr, setStep}) => {
    const {setSQ, setSA} = useContext(UserContext);

    const { control, handleSubmit } = useForm({mode:"all"});
    
    const submit = async (data) => {
        const userData =  await forgotPassSA(data); 
        if (userData === true) {
            setErr(false);
            setStep(2);
            setSA(userData);
            setSQ(undefined);
        } else {
            setErr(true);
            toast.error("You have entered wrong security question's answer", {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
              });
        }
    };

    return (
        <Box>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                    <Typography variant="h5">Forgot Your Password?</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1"  sx={{mb: 2}}>Please answer these three security questions to reset your password.</Typography>
                </Grid>
                <Grid item>
                    <form onSubmit={handleSubmit(submit)}>
                        <Grid container item direction="column" spacing={2}>
                            <Grid item>
                                <Typography>1. {SQ1}</Typography>
                            </Grid>
                            <InputForm type="text" id="SA1" label="Answer first security question" control={control} rules={{required: "This field is required"}} defaultValue={""} />
                            <Grid item>
                                <Typography>2. {SQ2}</Typography>
                            </Grid>
                            <InputForm type="text" id="SA2" label="Answer second security question" control={control} rules={{required: "This field is required"}} defaultValue={""} />
                            <Grid item>
                                <Typography>3. {SQ3}</Typography>
                            </Grid>
                            <InputForm type="text" id="SA3" label="Answer third security question" control={control} rules={{required: "This field is required"}} defaultValue={""} />
                            <Grid container item direction={"row"} justifyContent="center" spacing={{xs: 12, md: 24}}>
                                <Grid item sx={{mt:1, mb: 1}}>
                                    <Button onClick={() => {setSQ(undefined); setStep(0); setErr();}} variant="contained" size="small">Back</Button>
                                </Grid>
                                <Grid item sx={{mt:1, mb: 1}}>
                                    <Button type="submit" variant="contained" size="small">Next</Button>
                                </Grid>
                            </Grid>
                            <Grid container item justifyContent="flex-start" sx={{mb: 4}}>
                                <Link to={"/"} onClick={() => {setSQ(undefined); setStep(0); setErr();}}>Back to Sign In page</Link>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );
}

export default UserSQ;
