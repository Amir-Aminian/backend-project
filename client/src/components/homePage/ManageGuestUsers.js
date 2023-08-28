import { Avatar, Button, Chip, Container, Divider, Grid, Modal, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import deleteUser from "../../requests/deleteUser";
import { toast } from 'react-toastify';
import editBadgeNotification from "../../requests/editBadgeNotification";

const ManageGuestUsers = ({open, setOpen, users, setSharedUser, setUpdate}) => {   
    const deleteHandler = async (data) => {
        const result = await deleteUser(data);
        await editBadgeNotification({badgeName: "badge2", badgeNotification: false, email: result.email});
        setSharedUser("deleted");
        setUpdate({status: true, userEmail: result.email, from:"sender"});
        toast.info(result.message, {
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

    const shareContent = (users) => { 
        if (users.error != undefined) {
          return (<Typography align={"center"} sx={{mt: 2}}>You do not have any Guest Users yet.</Typography>);
        } else if (users.error == undefined && users.length > 0) {
          return (
            users.map((user) => 
            <>
              <Stack direction="row" justifyContent="left" alignItems={"center"} spacing={1} sx={{mt:1}}>
                <Avatar sx={{backgroundColor:"rgb(0, 114, 181)", ml:1}}></Avatar>
                <Chip label={user.user} variant="outlined" />
                <Grid container justifyContent="right" spacing={1}>
                  {
                    user.status == 0 ? 
                    <Typography variant="subtitle2">Waiting for the user to accept your request...</Typography> : 
                    user.status == 1 && 
                    <Grid item sx={{mr:1}}>
                      <Button type="button" onClick={() => deleteHandler({sharedId: user.sharedId})} variant="contained" size="small">Delete</Button>
                    </Grid>
                  }
                </Grid>
              </Stack>
              <Divider sx={{mt:1}} />
            </>
            )
          );
        };
      };
    
    return (
        <Modal open={open} onClose={() => setOpen(false)} sx={{overflow:"scroll"}}>            
            <Container maxWidth="xs" sx={{mt: 6, mb: 2, backgroundColor: "white", borderRadius: "1%"}}>            
                <Stack direction="column" spacing={2}>
                    <Typography variant="h5" align={"center"} sx={{mt: 2}}>Manage your Guest Users</Typography>
                    <Typography align={"justify"}>Here you can see and manage your guest users. You can delete a Guest User so you will not see their tasks in your account anymore.</Typography>
                    <Paper sx={{minHeight:"100px"}}>
                        {shareContent(users)}
                    </Paper>
                    <Grid container justifyContent="left">
                      <Grid item>
                        <Button type="button" onClick={() => setOpen(false)} variant="contained" size="large" sx={{mb:2, mr:4}}>Close</Button>
                      </Grid>
                    </Grid>
                </Stack>                
            </Container>
        </Modal>
    );
}

export default ManageGuestUsers;