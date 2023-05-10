import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import InputForm from "../../../forms/InputForm";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import forgotPassSQ from "../../../requests/forgotPassSQ";

const UserEmail = () => {
    const {setSQ} = useContext(UserContext);
    
    const { control, handleSubmit } = useForm();
    
    const submit = async (data) => {
        const userData =  await forgotPassSQ(data);
        if (userData != undefined) {
            setSQ([userData.SQ1, userData.SQ2, userData.SQ3]);
        } else {
            alert("Invalid Email Address.");
        };
    };

    return (
        <Box>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                    <Typography variant="h5">Forgot Your Password?</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" textAlign={"justify"} sx={{mb: 2}}>Please enter your email address down below to receive your password reset instructions.</Typography>
                </Grid>
                <Grid item>
                    <form onSubmit={handleSubmit(submit)}>
                        <Grid container item direction="column" alignItems="center" justifyContent="center" spacing={2}>
                            <InputForm type="email" id="email" label="Email Address" control={control} rules={{required: "This field is required"}} defaultValue={""} />
                            <Grid item>
                                <Button type="submit" variant="contained" size="small">Submit</Button>
                            </Grid>
                            <Grid container item justifyContent="flex-end" sx={{mb: 4}}>
                                <Link to={"/"}>Back to Sign In page</Link>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );
}

export default UserEmail;
