import { useEffect } from 'react'
import InputForm from "../../forms/InputForm";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, Container } from "@mui/material";
import NavigationBar from "./NavigationBar";
import { useForm } from "react-hook-form";
import logIn from "../../requests/logIn";
import mainPage from '../../requests/mainPage';

const SignIn = () => {
    const { control, handleSubmit } = useForm();

    const navigate = useNavigate();
    
    const submit = async (data) => {
        const result = await logIn(data);
        if (result.error == undefined ) {
            navigate("/homePage");
        } else {
            alert(result.error);
        };
    };
    
    useEffect(() => {
        const getResult = async () => {
            const result = await mainPage();
            if (result.error != undefined) {
                alert("You are not signed in");
            } else if (result.signedIn === true) {
                navigate("/homePage");
            };
        };
        getResult();
    }, []);

     
        return (
            <Container maxWidth="xs" sx={{mt: 5 , mb: 5, backgroundColor: "white", borderRadius: "2%"}}>
                <NavigationBar tabIndex={0} />
                <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                    <Grid item>
                        <h2>Sign In</h2>
                    </Grid>
                    <Grid item>
                        <form onSubmit={handleSubmit(submit)}>
                            <Grid container item direction="column" alignItems="center" justifyContent="center" spacing={2} width={250}>
                                <InputForm type="email" id="email" label="Email Address" control={control} rules={{required: "This field is required"}} defaultValue={""} />
                                <InputForm type="password" id="password" label="Password" control={control} rules={{required: "This field is required", minLength: {value: 8, message: "Password must have at least 8 characters"}}} defaultValue={""} />
                                <Grid container item justifyContent="flex-end">
                                    <Link to={"/forgotPassword"}>Forgot Your Password?</Link>
                                </Grid>
                                <Grid item>
                                    <Button type="submit" variant="contained" size="small" sx={{mb: 4}}>Sign In</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        );
    
}

export default SignIn;
