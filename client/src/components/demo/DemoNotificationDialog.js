import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import notifyLoop from "../../utilities/notifyLoop";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const DemoNotificationDialog = ({open, setOpen, notification, setNotification, tasks}) => {
  const [timerId, setTimerId] = useState();

  useEffect(() => {
    if (Notification.permission === "granted" && notification === true) {
      clearTimeout(timerId);
      const timeout = notifyLoop(tasks);
      setTimerId(timeout);
    } else {
      clearTimeout(timerId);
    }
  }, [tasks, notification]); 

  const turnOn = () => {
    if (!("Notification" in window)) {
      toast.error("This browser does not support desktop notification", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } else if (Notification.permission === "granted") {
      setNotification(true);
      toast.info("Now you will receive notifications 30 minutes before your tasks start time.", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then( async () => {
        if (Notification.permission === "granted") {
          setNotification(true);
          toast.info("Now you will receive notifications 30 minutes before your tasks start time.", {
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
      });
    };    
  };

  const turnOff = () => {
    setNotification(false);
    if (notification == true) {
      toast.info("Your notification is turned off.", {
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

  if (notification === "denied") {
    turnOff();
    return(
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Manage your notification setting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have disabled notifications for this website. <br /> Please change notification settings in your browser first.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (notification === true) {
    return(
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Manage your notification setting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to disable notifications?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {turnOff(); setOpen(false);}}>Yes</Button>
          <Button onClick={() => setOpen(false)}>No</Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (notification === false) {
    return(
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Manage your notification setting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to enable notifications?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {turnOn(); setOpen(false);}}>Yes</Button>
          <Button onClick={() => setOpen(false)}>No</Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (notification === "default") {
    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Manage your notification setting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to enable notifications?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {turnOn(); setOpen(false);}}>Yes</Button>
          <Button onClick={() => setOpen(false)}>No</Button>
        </DialogActions>
      </Dialog>
    )
  };
};

export default DemoNotificationDialog;
