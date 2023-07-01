import { Avatar, Button, Chip, Container, Divider, Grid, Modal, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import deleteUser from "../../requests/deleteUser";
import acceptUser from "../../requests/acceptUser";

const AddSharedUser = ({open, setOpen, setSharedUser, requests, setUpdate}) => {   
    const deleteHandler = async (data) => {
        const result = await deleteUser(data);
        setSharedUser("deleted");
        setUpdate({status: true, userEmail: result.email});
        alert(result.message);
      };
    
      const acceptHandler = async (data) => {
        const result = await acceptUser(data);
        setSharedUser("accepted");
        setUpdate({status: true, userEmail: result.email});
        alert(result.message);
      };  
    
      const requestContent = (requests) => { 
        if (requests.error != undefined) {
          return (<Typography align={"center"} sx={{mt: 2}}>You do not have any Sharing Data.</Typography>);
        } else if (requests.error == undefined && requests.length > 0) {
          return (
            requests.map((request) => 
            <>
                <Stack direction="row" justifyContent="left" alignItems={"center"} spacing={1} sx={{mt:1, mb:1}}>
                    <Avatar sx={{backgroundColor:"rgb(0, 114, 181)", ml:1}}></Avatar>
                    <Chip label={request.user} variant="outlined" />            
                    {
                        request.status == 0 ? 
                        <Grid container direction={"column"}>
                            <Typography variant="subtitle2" align={"center"}>User is waiting for you to accept the request...</Typography>
                            <Grid container item direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={1}>
                                <Grid item>
                                    <Button type="button" onClick={() => acceptHandler({sharedId: request.sharedId})} variant="contained" size="small">Accept</Button> 
                                </Grid>
                                <Grid item>
                                    <Button type="button" onClick={() => deleteHandler({sharedId: request.sharedId})} variant="contained" size="small">Delete</Button>
                                </Grid>
                            </Grid>
                        </Grid>: 
                        request.status == 1 && 
                        <Grid container justifyContent="right">
                            <Button type="button" onClick={() => deleteHandler({sharedId: request.sharedId})} variant="contained" size="small" sx={{mr:1}}>Delete</Button>
                        </Grid>                
                    }            
                </Stack>
                <Divider />
            </>
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
                        {requestContent(requests)}
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

export default AddSharedUser;