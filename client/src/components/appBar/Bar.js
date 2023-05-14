import { AppBar, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import clearCookies from "../../requests/clearCookies";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Bar = ({user, setOpen}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

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
    <AppBar position="sticky" color="primary" sx={{borderRadius: 0.5}}>
      <Toolbar>
        <IconButton onClick={(e) => clickHandler(e)} color="inherit" size="large" aria-label="menu" edge="start">
          <MenuIcon />
        </IconButton>
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
