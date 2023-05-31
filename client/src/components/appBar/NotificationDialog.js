import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import editNotification from "../../requests/editNotification";
import notifyLoop from "../../utilities/notifyLoop";

const NotificationDialog = ({open, setOpen, notificationStatus, tasks}) => {
  if (Notification.permission === "granted" && notificationStatus === true) {
    notifyLoop(tasks);
  };

  const turnOn = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      const result = await editNotification({status: true});
      alert(result);
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then( async () => {
        if (Notification.permission === "granted") {
          const result = await editNotification({status: true});
          alert(result);
        };
      });
    };    
  };

  const turnOff = async () => {
    const result = await editNotification({status: false});
    if (notificationStatus == true) {
    alert(result);
    };
  };

  if (notificationStatus === "denied") {
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

  if (notificationStatus === true) {
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

  if (notificationStatus === false) {
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

  if (notificationStatus === "default") {
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

export default NotificationDialog;
