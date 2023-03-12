import { Grid, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";

const NavigationBar =({ tabIndex }) => {
    return (
        <Grid container direction="row" alignItems="center" justifyContent="center" borderBottom={1} borderColor="divider">
            <Tabs value={tabIndex}>
                <Tab component={Link} to={"/"} label="Sign In" />
                <Tab component={Link} to={"/signUp"} label="Sign Up" />
            </Tabs>
        </Grid>
    );
}

export default NavigationBar;
