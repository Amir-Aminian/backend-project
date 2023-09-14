import { Avatar, Button, Chip, Container, Divider, Grid, Modal, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Fragment } from "react";
import { toast } from 'react-toastify';

const DemoManageSharing = ({open, setOpen, demoShare, setDemoShare}) => {   
    const deleteHandler = () => {
        setDemoShare([]);
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
    
      const acceptHandler = () => {
        setDemoShare([{
          "id": "Demo",
          "status": true,
          "user": "Demo",
          "date": new Date().setHours(0,0,0,0),
          "taskTitle": "Study",
          "startTime": "08:00",
          "endTime": "10:00",
          "taskDescription": "Study how to code.",
          "color": "rgb(219, 68, 55)",
          "colorLabel": "Red"
      }]);
        toast.info("Successfully accepted the user invitation.", {
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
    
      const requestContent = (requests) => { 
        if (requests.length === 0) {
          return (<Typography align={"center"} sx={{mt: 2}}>You are not sharing yor tasks with anyone.</Typography>);
        } else if (requests.length > 0) {
          return (
            requests.map((request) => 
            <Fragment key={request.date}>
                <Stack direction="row" justifyContent="left" alignItems={"center"} spacing={1} sx={{mt:1, mb:1}}>
                    <Avatar sx={{backgroundColor:"rgb(0, 114, 181)", ml:1}}></Avatar>
                    <Chip label={request.user} variant="outlined" />            
                    {
                        request.status === false ? 
                        <Grid container direction={"column"}>
                            <Typography variant="subtitle2" align={"center"}>User is waiting for you to accept the request...</Typography>
                            <Grid container item direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={1}>
                                <Grid item>
                                    <Button type="button" onClick={() => acceptHandler()} variant="contained" size="small">Accept</Button> 
                                </Grid>
                                <Grid item>
                                    <Button type="button" onClick={() => deleteHandler()} variant="contained" size="small">Delete</Button>
                                </Grid>
                            </Grid>
                        </Grid>: 
                        request.status === true && 
                        <Grid container justifyContent="right">
                            <Button type="button" onClick={() => deleteHandler()} variant="contained" size="small" sx={{mr:1}}>Delete</Button>
                        </Grid>                
                    }            
                </Stack>
                <Divider />
            </Fragment>
            )
          );
        };
      };
      
    return (
        <Modal open={open} onClose={() => setOpen(false)} sx={{overflow:"scroll"}}>            
            <Container maxWidth="xs" sx={{mt: 6, mb: 2, backgroundColor: "white", borderRadius: "1%"}}>            
                <Stack direction="column" spacing={2}>
                    <Typography variant="h5" align={"center"} sx={{mt: 2}}>Manage your Task Sharing</Typography>
                    <Typography align={"justify"}>Here you can see and manage the Users You are sharing your tasks with. You can accept a User's invitation to start sharing your tasks with them. Or you can delete a User so they will not be able to see your tasks.</Typography>
                    <Paper sx={{minHeight:"100px"}}>
                        {requestContent(demoShare)}
                    </Paper>
                    <Typography align={"justify"} color={"red"}>Attention! <br /> This is just a demo to show you how this feature works, so no one can access your data.</Typography>
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

export default DemoManageSharing;