import { AppBar, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, ThemeProvider, Toolbar, Typography, createTheme, responsiveFontSizes } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import clearCookies from "../../requests/clearCookies";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const Bar = ({user, setOpen, year, month, date, setDate}) => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const previousWeek = () => {
    setDate(new Date(date.setDate(date.getDate()-7)));
  };

  const thisWeek = () => {
    setDate(new Date(new Date().setDate(new Date().getDate()-1)));
};

  const nextWeek = () => {
    setDate(new Date(date.setDate(date.getDate()+7)));
};

  const clickHandler = (e) => {
    setAnchorEl(e.currentTarget)
  };

  const logOut = async () => {
    const result = await clearCookies();
    navigate("/");
    alert(result);
  };

  return (
    <>
    <AppBar position="sticky" color="primary" sx={{borderRadius: 0.5, marginBottom:"10px"}}>
      <Toolbar sx={{paddingRight: "0px"}}>
        <IconButton onClick={(e) => clickHandler(e)} color="inherit" size="large" aria-label="menu" edge="start" sx={{paddingRight: "0px", paddingLeft: "8px"}}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Stack direction={"column"} justifyContent={"center"} display={"flex"} flexGrow={1}>
          <Stack direction={"row"} justifyContent={"center"} display={"flex"} flexGrow={1} paddingTop={"6px"}>
            <IconButton onClick={previousWeek} color="inherit" size="large" sx={{padding: 0}}>
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>
            <ThemeProvider theme={theme}>
              <Typography variant={"h5"} color={"inherit"} display={"flex"} alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{month} {year}</Typography>
            </ThemeProvider>
            <IconButton onClick={nextWeek} color="inherit" size="large" sx={{padding: 0}}>
              <NavigateNextIcon fontSize="large" />
            </IconButton>
          </Stack>
          <Stack direction={"row"} justifyContent={"center"} display={"flex"} flexGrow={1}>
            <MenuItem onClick={thisWeek} sx={{paddingTop: "0px"}}>Today</MenuItem>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
    <Menu open={open} onClose={() => setAnchorEl(null)} anchorEl={anchorEl}>
      <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"} sx={{width: 150}} paddingLeft={"16px"}>
        <ListItemIcon>
          <AccountCircleIcon fontSize={"large"} />
        </ListItemIcon>
        <Typography>{user}</Typography>
      </Stack>
      <Divider />
      <MenuItem onClick={() => {setOpen(true); setAnchorEl(null);}}>
        <ListItemIcon style={{minWidth: "56px"}}>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Users" />
      </MenuItem>
      <MenuItem onClick={() => {logOut(); setAnchorEl(null);}}>
        <ListItemIcon style={{minWidth: "56px"}}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    </Menu>
    </>
  );
};

export default Bar;
