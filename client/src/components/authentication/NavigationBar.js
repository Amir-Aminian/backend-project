import { Grid, Tabs, Tab, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const NavigationBar =({ tabIndex }) => {
    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" borderBottom={1} borderColor="divider">
            <Grid item sx={{mt: 4 , mb: 2}}>
                <img src="logoWithTitle.png" width={"250px"} />
            </Grid>
            <Tabs value={tabIndex}>
                <Tab component={Link} to={"/"} label="Sign In" />
                <Tab component={Link} to={"/signUp"} label="Sign Up" />
            </Tabs>
        </Grid>
    );
}

export default NavigationBar;
