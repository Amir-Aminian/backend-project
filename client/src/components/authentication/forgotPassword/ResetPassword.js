import { Box, Button, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../../../forms/InputForm";
import { useForm } from "react-hook-form";
import ResetUserPassword from "../../../utilities/ResetUserPassword";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

const ResetPassword = () => {
    const { control, handleSubmit, watch } = useForm();

    const {userEmail, setSA} = useContext(UserContext);

    const navigate = useNavigate();
    
    const submit = (data) => {
        ResetUserPassword(userEmail, data.newPassword);
        navigate("/");
        setSA(false);
    };

    return (
        <Box>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                    <h2>Forgot Your Password?</h2>
                </Grid>
                <Grid item>
                    <p>Please enter your new password below.</p>
                </Grid>
                <Grid item>
                    <form onSubmit={handleSubmit(submit)}>
                        <Grid container item direction="column" alignItems="center" justifyContent="center" spacing={2}>
                            <InputForm type="password" id="newPassword" label="New Password" control={control} rules={{required: "This field is required", minLength: {value: 8, message: "Password must have at least 8 characters"}}} defaultValue={""} />
                            <InputForm type="password" id="confirmNewPassword" label="Confirm New Password" control={control} rules={{required: "This field is required", minLength: {value: 8, message: "Password must have at least 8 characters"}, validate: (value) => (value===watch("newPassword") || "Password does not match")}} defaultValue={""} />
                            <Grid item>
                                <Button type="submit" variant="contained" size="small">Submit</Button>
                            </Grid>
                            <Grid container item justifyContent="flex-end" sx={{mb: 4}}>
                                <Link to={"/"} onClick={() => setSA(false)}>Back to Sign In page</Link>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ResetPassword;
