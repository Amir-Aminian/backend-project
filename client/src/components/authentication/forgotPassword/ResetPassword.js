import { Box, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../../../forms/InputForm";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import forgotPassReset from "../../../requests/forgotPassReset";
import { toast } from 'react-toastify';

const ResetPassword = ({setErr, setStep}) => {
    const { control, handleSubmit, watch } = useForm();

    const {setSA} = useContext(UserContext);

    const navigate = useNavigate();
    
    const submit = async (data) => {
        const result = await forgotPassReset(data);
        setSA(false);
        setErr(false);
        setStep(3);
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
        navigate("/");
    };

    return (
        <Box>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                    <Typography variant="subtitle1"  sx={{mb: 2}}>Please enter your new password below.</Typography>
                </Grid>
                <Grid item>
                    <form onSubmit={handleSubmit(submit)}>
                        <Grid container item direction="column" alignItems="center" justifyContent="center" spacing={2}>
                            <InputForm type="password" id="newPassword" label="New Password" control={control} rules={{required: "This field is required", minLength: {value: 8, message: "Password must have at least 8 characters"}}} defaultValue={""} />
                            <InputForm type="password" id="confirmNewPassword" label="Confirm New Password" control={control} rules={{required: "This field is required", minLength: {value: 8, message: "Password must have at least 8 characters"}, validate: (value) => (value===watch("newPassword") || "Password does not match")}} defaultValue={""} />
                            <Grid item sx={{mt:1, mb: 1}}>
                                <Button type="submit" variant="contained" size="small">Reset Password</Button>
                            </Grid>
                            <Grid container item justifyContent="flex-start" sx={{mb: 4}}>
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
