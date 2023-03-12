import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import InputForm from "../../../forms/InputForm";
import { useForm } from "react-hook-form";
import FindSQ from "../../../utilities/FindSQ";
import FindSA from "../../../utilities/FindSA";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

const UserEmail = () => {
    const {setUserEmail, setSQ, setSA} = useContext(UserContext);
    
    const { control, handleSubmit } = useForm();
    
    const submit = (data) => {
        if (FindSQ(data.email)!=undefined) {
            setUserEmail(data.email);
            setSQ(FindSQ(data.email));
            setSA(FindSA(data.email));
        } else {
            alert("Invalid Email Address");
        };
    };

    return (
        <Box>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                    <h2>Forgot Your Password?</h2>
                </Grid>
                <Grid item>
                    <p>Please enter your email address down below to receive your password reset instructions.</p>
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
