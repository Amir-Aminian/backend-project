import InputForm from "../../forms/InputForm";
import DropDownForm from "../../forms/DropDownForm";
import { Link } from "react-router-dom";
import { Container, Button, Grid, Typography } from "@mui/material";
import NavigationBar from "./NavigationBar";
import { useForm } from "react-hook-form";
import addUser from "../../requests/addUser";
import { toast } from 'react-toastify';
import { useState } from "react";
import EmailNotice from "./EmailNotice";

const SignUp = () => {
    const securityQuestions = ["In what city were you born?", "What is the name of your favorite pet?", "What is your mother's maiden name?", "What high school did you attend?", "What was the name of your elementary school?", "What was the make of your first car?", "What was your favorite food as a child?", "Where did you meet your spouse?", "What year was your father (or mother) born?"];

    const { control, handleSubmit, watch } = useForm({mode: "all"});

    const [display1, setDisplay1] = useState("block");

    const [display2, setDisplay2] = useState("none");

    const submit = async (data) => {
        const result = await addUser(data);
        if (result.error != undefined ) {
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
            setDisplay1("none");
            setDisplay2("block");
        };
    };

    const handleOptions = (value1, value2) => {
        let options = securityQuestions.filter((b) => b != value1 & b != value2);
        return options;
    };

    return (
        <>
        <Container maxWidth="xs" sx={{mt: 5 , mb: 5, backgroundColor: "white", borderRadius: "1%", display: display1}}>
            <NavigationBar tabIndex={1} />
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>  
                <Grid item>
                    <Typography variant="h5" sx={{mt: 2}}>Sign Up</Typography>
                </Grid>
                <Grid item>
                    <form onSubmit={handleSubmit(submit)}>
                        <Grid container item direction="column" alignItems="center" justifyContent="center" spacing={2}>
                            <Grid container item direction="column" alignItems="center" justifyContent="center" spacing={2} width={250}>
                                <InputForm type="text" id="username" label="Username" control={control} rules={{required: "This field is required", maxLength: {value: 20, message: "Username must not exceed 20 characters"}}} defaultValue={""} />
                                <InputForm type="email" id="email" label="Email Address" control={control} rules={{required: "This field is required", pattern: {value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, message: "Please enter a valid email"}}} defaultValue={""} />
                                <InputForm type="password" id="password" label="Password" control={control} rules={{required: "This field is required", minLength: {value: 8, message: "Password must have at least 8 characters"}}} defaultValue={""} />
                                <InputForm type="password" id="confirmPassword" label="Confirm Password" control={control} rules={{required: "This field is required", minLength: {value: 8, message: "Password must have at least 8 characters"}, validate: (value) => (value===watch("password") || "Password does not match")}} defaultValue={""} />
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" sx={{mt: 2}}>Security Questions</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">Select and answer three security questions. These questions will help us verify your identity should you forget your password.</Typography>
                            </Grid>
                            <Grid container item direction="column" alignItems="center" justifyContent="center" spacing={2}>
                                <DropDownForm id="SQ1" label={"Select first security question"} options={handleOptions(watch("SQ2"),watch("SQ3"))} control={control} rules={{required: "This field is required"}} defaultValue={""} />
                                <InputForm type="text" id="SA1" label="Answer first security question" control={control} rules={{required: "This field is required"}} />
                                <DropDownForm id="SQ2" label={"Select second security question"} options={handleOptions(watch("SQ1"),watch("SQ3"))} control={control} rules={{required: "This field is required"}} defaultValue={""} />
                                <InputForm type="text" id="SA2" label="Answer second security question" control={control} rules={{required: "This field is required"}} />
                                <DropDownForm id="SQ3" label={"Select third security question"} options={handleOptions(watch("SQ1"),watch("SQ2"))} control={control} rules={{required: "This field is required"}} defaultValue={""} />
                                <InputForm type="text" id="SA3" label="Answer third security question" control={control} rules={{required: "This field is required"}} />
                                <Grid item>
                                    <Button type="submit" variant="contained" size="small">Sign Up</Button>
                                </Grid>
                                <Grid container item justifyContent="flex-start" sx={{mb: 4}}>
                                    <Link to={"/"}>Already have an account? Sign In</Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>  
            </Grid>
        </Container>
        <EmailNotice display={display2} />
        </>
    );
}

export default SignUp;
