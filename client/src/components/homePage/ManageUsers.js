import { Avatar, Button, Chip, Divider, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import deleteUser from "../../requests/deleteUser";
import acceptUser from "../../requests/acceptUser";

const ManageUsers = ({setOpen, users, setSharedUser, requests, setUpdate}) => {   
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

  const shareContent = (users) => { 
    if (users.error != undefined) {
      return (<Typography>You do not have any shared users.</Typography>);
    } else if (users.error == undefined && users.length > 0) {
      return (
        users.map((user) => 
        <>
          <Stack direction="row" justifyContent="left" alignItems={"center"} spacing={1}>
            <Avatar sx={{backgroundColor:"rgb(0, 114, 181)"}}></Avatar>
            <Chip label={user.user} variant="outlined" />
            <Grid container justifyContent="right" spacing={1}>
              {
                user.status == 0 ? 
                <Typography variant="subtitle2">Waiting for the user to accept your request...</Typography> : 
                user.status == 1 && 
                <>
                  <Grid item>
                    <Typography variant="subtitle2">Added shared user</Typography>
                  </Grid>
                  <Grid item>
                    <Button type="button" onClick={() => deleteHandler({sharedId: user.sharedId})} variant="contained" size="small">Delete</Button>
                  </Grid>
                </>
              }
            </Grid>
          </Stack>
          <Divider />
        </>
        )
      );
    };
  };

  const requestContent = (requests) => { 
    if (requests.error != undefined) {
      return (<Typography>You do not have any share requests.</Typography>);
    } else if (requests.error == undefined && requests.length > 0) {
      return (
        requests.map((request) => 
        <>
          <Stack direction="row" justifyContent="left" alignItems={"center"} spacing={1}>
            <Avatar sx={{backgroundColor:"rgb(0, 114, 181)"}}></Avatar>
            <Chip label={request.user} variant="outlined" />            
            {
              request.status == 0 ? 
              <Grid container direction={"column"} justifyContent="right" alignItems={"center"}>
                <Typography variant="subtitle2">User is waiting for you to accept the request...</Typography> 
                <Grid container item direction={"row"} justifyContent={"right"} alignItems={"center"} spacing={1}>
                  <Grid item>
                    <Button type="button" onClick={() => acceptHandler({sharedId: request.sharedId})} variant="contained" size="small">Accept</Button> 
                  </Grid>
                  <Grid item>
                    <Button type="button" onClick={() => deleteHandler({sharedId: request.sharedId})} variant="contained" size="small">Delete</Button>
                  </Grid>
                </Grid>
              </Grid> : 
              request.status == 1 && 
              <Grid container justifyContent="right">
                <Typography variant="subtitle2">You have shared your events with this user.</Typography> 
                <Button type="button" onClick={() => deleteHandler({sharedId: request.sharedId})} variant="contained" size="small">Delete</Button>
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
    <Stack direction="column" spacing={2}>
      <Typography>You can manage your shared users here:</Typography>
      {shareContent(users)}
      {requestContent(requests)}
      <Grid container justifyContent="left">
          <Grid item>
              <Button type="button" onClick={() => setOpen(false)} variant="contained" size="large" sx={{mb:2, mr:4}}>Close</Button>
          </Grid>
      </Grid>
    </Stack>
  );
}

export default ManageUsers;