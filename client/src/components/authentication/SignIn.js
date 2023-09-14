import InputForm from "../../forms/InputForm";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, Container, Typography, Box } from "@mui/material";
import NavigationBar from "./NavigationBar";
import { useForm } from "react-hook-form";
import logIn from "../../requests/logIn";
import { toast } from 'react-toastify';
import "./style1.css";

const SignIn = () => {
    const { control, handleSubmit } = useForm({mode:"all"});

    const navigate = useNavigate();
    
    const submit = async (data) => {
        const result = await logIn(data);
        if (result.error == undefined ) {
            navigate("/homePage");
        } else {
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
        };
    };

    const getOS = () => {
        const userAgent = navigator.userAgent;
        if (/iPhone OS/.test(userAgent)) {
            return(true)
        }
    };    

    const getVersion = () => {
        const userAgent = navigator.userAgent;
        const match = userAgent.match(new RegExp("Version/" + '([^;]+)'));
        const result = match ? match[1].trim().split(' ')[0] : null;
        if (parseFloat(result) < 16.4) {
            return(true)
        };        
    };

    if (getOS() && getVersion()) {
        return(
            <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
                <Box
                    p={3}
                    textAlign="center"
                    borderRadius="10px"
                    backgroundColor="rgba(255, 255, 255, 0.95)" 
                    boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <div style={{ fontSize: '48px' }}>🙁</div>
                    <Typography variant="h5" color="primary" gutterBottom>
                        Aw, Snap!
                    </Typography>
                    <Typography sx={{ color: "#555", fontSize: "1.1rem", marginBottom: 2 }}>
                        We're sorry, but your browser does not support this web app.
                    </Typography>
                    <Typography sx={{ color: "#555", fontSize: "1.1rem", marginBottom: 2 }}>
                        Please consider using a newer version of your browser for the best experience.
                    </Typography>
                </Box>
            </Container>
        )
    } else {
        return (
            <Container maxWidth="xs" sx={{mt: 5 , mb: 5, backgroundColor: "white", borderRadius: "2%"}}>
                <NavigationBar tabIndex={0} />
                <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                    <Grid item>
                        <Typography variant="h5" sx={{mt: 2}}>Sign In</Typography>
                    </Grid>
                    <Grid item>
                        <form onSubmit={handleSubmit(submit)}>
                            <Grid container item direction="column" alignItems="center" justifyContent="center" spacing={2} width={250}>
                                <InputForm type="email" id="email" label="Email Address" control={control} rules={{required: "This field is required", pattern: {value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, message: "Please enter a valid email"}}} defaultValue={""} />
                                <InputForm type="password" id="password" label="Password" control={control} rules={{required: "This field is required", minLength: {value: 8, message: "Password must have at least 8 characters"}}} defaultValue={""} />
                                <Grid container item justifyContent="flex-start" style={{paddingTop: 0}}>
                                    <Link to={"/forgotPassword"}>Forgot Your Password?</Link>
                                </Grid>
                                <Grid item>
                                    <Button type="submit" variant="contained" size="small" sx={{mb: 4}}>Sign In</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Button id="demoButton" onClick={() => navigate("/demoHomePage")} variant="text" size="small" sx={{mb: 4, ml: "80%"}}>Try Demo</Button>                                     
                </Grid>
            </Container>
        )
    }
}

export default SignIn;
