import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import InputForm from "../../../forms/InputForm";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

const UserSQ = ({SQ1, SQ2, SQ3}) => {
    const {setSQ, SA, setSA} = useContext(UserContext);

    const { control, handleSubmit } = useForm();
    
    const submit = (data) => {
        if (data.SA1===SA[0] && data.SA2===SA[1] && data.SA3===SA[2]) {
            setSA(true);
            setSQ(undefined);
        } else {
            alert("You have entered wrong security question's answer")
        }
    };

    return (
        <Box>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                    <h2>Forgot Your Password?</h2>
                </Grid>
                <Grid item>
                    <p>Please answer these three security questions to reset your password.</p>
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
                            <Grid container item justifyContent="center">
                                <Button type="submit" variant="contained" size="small">Submit</Button>
                            </Grid>
                            <Grid container item justifyContent="flex-end" sx={{mb: 4}}>
                                <Link to={"/"} onClick={() => setSQ(undefined)}>Back to Sign In page</Link>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );
}

export default UserSQ;
