import { Avatar, Button, Chip, Container, Divider, Grid, Modal, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { toast } from 'react-toastify';

const DemoManageGuestUsers = ({open, setOpen, demoTasks, setDemoTasks}) => {   
    const deleteHandler = () => {
        setDemoTasks([]);
        toast.info("Successfully deleted the user.", {
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
        if (users.length === 0) {
          return (<Typography align={"center"} sx={{mt: 2}}>You do not have any Guest Users yet.</Typography>);
        } else if (users.length > 0) {
          return (
            <>
              <Stack direction="row" justifyContent="left" alignItems={"center"} spacing={1} sx={{mt:1}}>
                <Avatar sx={{backgroundColor:"rgb(0, 114, 181)", ml:1}}></Avatar>
                <Chip label={"Demo"} variant="outlined" />
                <Grid container justifyContent="right" spacing={1}>
                  {
                    users[0].status === false ? 
                    <Typography variant="subtitle2">Waiting for the user to accept your request...</Typography> : 
                    users[0].status === true && 
                    <Grid item sx={{mr:1}}>
                      <Button type="button" onClick={() => deleteHandler()} variant="contained" size="small">Delete</Button>
                    </Grid>
                  }
                </Grid>
              </Stack>
              <Divider sx={{mt:1}} />
            </>
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
                        {shareContent(demoTasks)}
                    </Paper>
                    <Typography align={"justify"} color={"red"}>Attention! <br /> This is just a demo to show you how this feature works.</Typography>
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

export default DemoManageGuestUsers;