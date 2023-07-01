import { AppBar, Divider, IconButton, Badge, ListItemIcon, ListItemText, Menu, MenuItem, Stack, ThemeProvider, Toolbar, Typography, createTheme, responsiveFontSizes } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import clearCookies from "../../requests/clearCookies";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationDialog from "./NotificationDialog";
import getNotificationStatus from "../../requests/getNotificationStatus";

const Bar = ({user, setOpenAGU, setOpenMGU, setOpenMS, year, month, date, setDate, tasks, invisible, setInvisible}) => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const [ready, setReady] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const [notificationStatus, setNotificationStatus] = useState();

  const [openDialog, setOpenDialog] = useState(false);

  const [options, setOptions] = useState();

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const previousWeek = () => {
    setDate(new Date(date.setDate(date.getDate()-7)));
  };

  const thisWeek = () => {
    setDate(new Date());
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

  const handleBadgeVisibility = () => {
    setInvisible(true);
  };

  useEffect(() => {
    const manageNotification = async () => {
      if ( Notification.permission === "denied") {
        setNotificationStatus("denied");
        setOptions(
          <MenuItem onClick={() => {setAnchorEl(null); setOpenDialog(true);}}>
            <ListItemIcon style={{minWidth: "56px"}}>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Enable notifications" />
          </MenuItem>
        );
        setReady(true);
      } else if (Notification.permission === "granted") {
        const result = await getNotificationStatus();
        setNotificationStatus(Boolean(result.notification));
        if (notificationStatus == true) {
          setOptions(
            <MenuItem onClick={() => {setAnchorEl(null); setOpenDialog(true);}}>
              <ListItemIcon style={{minWidth: "56px"}}>
                <NotificationsOffIcon />
              </ListItemIcon>
              <ListItemText primary="Disable notifications" />
            </MenuItem>
          );
          setReady(true);
        } else if (notificationStatus == false) {
          setOptions(
            <MenuItem onClick={() => {setAnchorEl(null); setOpenDialog(true);}}>
              <ListItemIcon style={{minWidth: "56px"}}>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Enable notifications" />
            </MenuItem>
          );
          setReady(true);
        }
      } else if (Notification.permission === "default") {
        setNotificationStatus("default");
        setOptions(
          <MenuItem onClick={() => {setAnchorEl(null); setOpenDialog(true);}}>
            <ListItemIcon style={{minWidth: "56px"}}>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Enable notifications" />
          </MenuItem>
        );
        setReady(true);
      };
    };
    manageNotification();
  }, [notificationStatus, openDialog, Notification.permission]);

  if (ready === true) {
    return (
      <>
        <AppBar position="sticky" color="primary" sx={{borderRadius: 0.5, marginBottom:"10px"}}>
          <Toolbar sx={{paddingRight: "0px"}}>
            <IconButton onClick={(e) => {clickHandler(e); handleBadgeVisibility();}} color="inherit" size="large" aria-label="menu" edge="start" sx={{padding:"0px", borderRadius:"0", transform:"translateY (2px)", boxShadow:"0 4px 8px rgba(0, 0, 0, 0.6)"}}>
              <Badge color="error" overlap="circular" variant="dot" invisible={invisible}>
                <MenuIcon fontSize="large" />
              </Badge>
            </IconButton>
            <Stack direction={"column"} justifyContent={"center"} display={"flex"} flexGrow={1}>
              <Stack direction={"row"} justifyContent={"center"} display={"flex"} flexGrow={1} paddingTop={"6px"} spacing={0.5}>
                <IconButton onClick={previousWeek} color="inherit" size="large" sx={{padding: "0px", transform:"translateY (2px)", boxShadow:"0 4px 8px rgba(0, 0, 0, 0.6)"}}>
                  <NavigateBeforeIcon fontSize="large" />
                </IconButton>
                <ThemeProvider theme={theme}>
                  <Typography variant={"h6"} color={"inherit"} display={"flex"} alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{month} {year}</Typography>
                </ThemeProvider>
                <IconButton onClick={nextWeek} color="inherit" size="large" sx={{padding: "0px", transform:"translateY (2px)", boxShadow:"0 4px 8px rgba(0, 0, 0, 0.6)"}}>
                  <NavigateNextIcon fontSize="large" />
                </IconButton>
              </Stack>
              <Stack direction={"row"} justifyContent={"center"} display={"flex"} flexGrow={1} paddingBottom={"6px"}>
                <MenuItem onClick={thisWeek} sx={{minHeight:"2px", paddingTop: "0px", paddingBottom: "0px", transform: "translateY (2px)", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)"}}>Today</MenuItem>
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
          <MenuItem onClick={() => {setOpenAGU(true); setAnchorEl(null);}}>
            <ListItemIcon style={{minWidth: "56px"}}>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Guest User" />
          </MenuItem>
          <MenuItem onClick={() => {setOpenMGU(true); setAnchorEl(null);}}>
            <ListItemIcon style={{minWidth: "56px"}}>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Guest Users" />
          </MenuItem>
          <MenuItem onClick={() => {setOpenMS(true); setAnchorEl(null);}}>
            <ListItemIcon style={{minWidth: "56px"}}>
              <Diversity3Icon />
            </ListItemIcon>
            <ListItemText primary="Manage Sharing" />
          </MenuItem>
          {options}
          <MenuItem onClick={() => {logOut(); setAnchorEl(null);}}>
            <ListItemIcon style={{minWidth: "56px"}}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>
        <NotificationDialog open={openDialog} setOpen={setOpenDialog} notificationStatus={notificationStatus} tasks={tasks} />
      </>
    );
  };
};

export default Bar;
