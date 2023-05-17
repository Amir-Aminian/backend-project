import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const NotificationDialog = ({open, setOpen, notificationStatus}) => {
  const notifyMe = () => {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification("Hi there!");
      // …
    } else {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!");
          // …
        }
      });
    }  
  }

  if (notificationStatus === "denied") {
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
          <Button onClick={() => {setOpen(false);}}>Yes</Button>
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
          <Button onClick={() => {setOpen(false);}}>Yes</Button>
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
          <Button onClick={() => {notifyMe(); setOpen(false);}}>Yes</Button>
          <Button onClick={() => setOpen(false)}>No</Button>
        </DialogActions>
      </Dialog>
    )
  };
};

export default NotificationDialog;
