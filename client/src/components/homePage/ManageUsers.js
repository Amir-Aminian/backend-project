import { Avatar, Button, Chip, Divider, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";

const ManageUsers = ({setOpen}) => {   
  let users = [{user: "amir", status: 0}, {user: "ali", status: 1}];

  const content = () => { 
    if (users.length == 0) {
      return (<Typography>You do not have any shared users.</Typography>);
    } else if (users.length > 0) {
      return (
        users.map((user) => 
        <>
          <Stack direction="row" justifyContent="left" alignItems={"center"} spacing={1}>
            <Avatar sx={{backgroundColor:"rgb(0, 114, 181)"}}></Avatar>
            <Chip label={user.user} variant="outlined" />
            <Grid container justifyContent="right">
              {
                user.status == 0 ? 
                <Button type="button" variant="contained" size="small">Add</Button> : 
                user.status == 1 && <Button type="button" variant="contained" size="small">Delete</Button>
              }
            </Grid>
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
      {content()}
      <Grid container justifyContent="left">
          <Grid item>
              <Button type="button" onClick={() => setOpen(false)} variant="contained" size="large" sx={{mb:2, mr:4}}>Close</Button>
          </Grid>
      </Grid>
    </Stack>
  );
}

export default ManageUsers;