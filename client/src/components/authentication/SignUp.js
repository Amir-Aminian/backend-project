import InputForm from "../../forms/InputForm";
import DropDownForm from "../../forms/DropDownForm";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button, Grid } from "@mui/material";
import NavigationBar from "./NavigationBar";
import { useForm } from "react-hook-form";
import AddUser from "../../requests/addUser";

const SignUp = () => {
    const securityQuestions = ["In what city were you born?", "What is the name of your favorite pet?", "What is your mother's maiden name?", "What high school did you attend?", "What was the name of your elementary school?", "What was the make of your first car?", "What was your favorite food as a child?", "Where did you meet your spouse?", "What year was your father (or mother) born?"];

    const { control, handleSubmit, watch } = useForm();

    const navigate = useNavigate();


    const submit = async (data) => {
        const result = await AddUser(data);
        if (result.error != undefined ) {
            alert(result.error);
        } else {
            alert(result);
            navigate("/");
        };
    };

    const handleOptions = (value1, value2) => {
        let options = securityQuestions.filter((b) => b != value1 & b != value2);
        return options;
    };

    return (
        <Container maxWidth="xs" sx={{mt: 5 , mb: 5, backgroundColor: "white", borderRadius: "1%"}}>
            <NavigationBar tabIndex={1} />
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>  
                <Grid item>
                    <h2>Sign Up</h2>
                </Grid>
                <Grid item>
                    <form onSubmit={handleSubmit(submit)}>
                        <Grid container item direction="column" alignItems="center" justifyContent="center" spacing={2}>
                            <Grid container item direction="column" alignItems="center" justifyContent="center" spacing={2} width={250}>
                                <InputForm type="text" id="username" label="Username" control={control} rules={{required: "This field is required"}} defaultValue={""} />
                                <InputForm type="email" id="email" label="Email Address" control={control} rules={{required: "This field is required"}} defaultValue={""} />
                                <InputForm type="password" id="password" label="Password" control={control} rules={{required: "This field is required", minLength: {value: 8, message: "Password must have at least 8 characters"}}} defaultValue={""} />
                                <InputForm type="password" id="confirmPassword" label="Confirm Password" control={control} rules={{required: "This field is required", minLength: {value: 8, message: "Password must have at least 8 characters"}, validate: (value) => (value===watch("password") || "Password does not match")}} defaultValue={""} />
                            </Grid>
                            <Grid item>
                                <h3>Security Questions</h3>
                            </Grid>
                            <Grid item>
                                <p>Select and answer three security questions. These questions will help us verify your identity should you forget your password.</p>
                            </Grid>
                            <Grid container item direction="column" alignItems="center" justifyContent="center" spacing={2}>
                                <DropDownForm id="SQ1" label={"Select first security question"} options={handleOptions(watch("SQ2"),watch("SQ3"))} control={control} rules={{required: "This field is required"}} defaultValue={""} />
                                <InputForm type="text" id="SA1" label="Answer first security question" control={control} rules={{required: "This field is required"}} />
                                <DropDownForm id="SQ2" label={"Select second security question"} options={handleOptions(watch("SQ1"),watch("SQ3"))} control={control} rules={{required: "This field is required"}} defaultValue={""} />
                                <InputForm type="text" id="SA2" label="Answer second security question" control={control} rules={{required: "This field is required"}} />
                                <DropDownForm id="SQ3" label={"Select third security question"} options={handleOptions(watch("SQ1"),watch("SQ2"))} control={control} rules={{required: "This field is required"}} defaultValue={""} />
                                <InputForm type="text" id="SA3" label="Answer third security question" control={control} rules={{required: "This field is required"}} />
                                <Grid container item justifyContent="flex-end">
                                    <Link to={"/"}>Already have an account? Sign In</Link>
                                </Grid>
                                <Grid item>
                                    <Button type="submit" variant="contained" size="small" sx={{mb: 4}}>Sign Up</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>  
            </Grid>
        </Container>
    );
}

export default SignUp;
