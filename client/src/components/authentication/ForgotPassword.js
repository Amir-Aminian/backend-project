import { Container, Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import UserEmail from "./forgotPassword/UserEmail";
import UserSQ from "./forgotPassword/UserSQ";
import ResetPassword from "./forgotPassword/ResetPassword";


const ForgotPassword = () => {
    const {SQ, SA} = useContext(UserContext);
    const [emailErr, setEmailErr] = useState();
    const [SAErr, setSAErr] = useState();
    const [passErr, setPassErr] = useState();
    const [step, setStep] = useState(0);

    let context = <UserEmail setErr={setEmailErr} setStep={setStep} />;

    if (SQ != undefined) {context = <UserSQ SQ1={SQ[0]} SQ2={SQ[1]} SQ3={SQ[2]} setErr={setSAErr} setStep={setStep} />};

    if (SA === true) {context = <ResetPassword setErr={setPassErr} setStep={setStep} />};

    return (
        <Container maxWidth="xs" sx={{mt: 10 , mb: 5, backgroundColor: "white", borderRadius: "2%"}}>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={5}>
                <Grid item>
                    <Typography variant="h5">Forgot Your Password?</Typography>
                </Grid>
                <Grid item sx={{width: "100%"}}>
                    <Stepper activeStep={step} alternativeLabel>
                        <Step>
                            <StepLabel error={emailErr}>Email Address</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel error={SAErr}>Security Answers</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel error={passErr}>Password Reset</StepLabel>
                        </Step>
                    </Stepper>
                </Grid>
                <Grid item>
                    {context}
                </Grid>
            </Grid>
        </Container>
    );
}

export default ForgotPassword;
