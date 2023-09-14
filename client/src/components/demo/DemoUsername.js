import { Button, Container, Grid, Modal, Stack, Typography } from "@mui/material";
import InputForm from "../../forms/InputForm";
import { useForm } from "react-hook-form";

const DemoUsername = ({open, setOpen, setNote, setUser}) => {

  const {control, reset, handleSubmit} = useForm({mode:"all"});

  const submit = (data) => {
    setUser(data.username);
    setOpen(false);
    reset();
  }; 

  return (
    <Modal open={open} onClose={() => {setOpen(false); setNote(false);}} sx={{overflow:"scroll"}}>            
      <Container maxWidth="xs" sx={{mt: 6, mb: 2, backgroundColor: "white", borderRadius: "1%"}}>            
        <form onSubmit={handleSubmit(submit)}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h5" align={"center"} sx={{mt: 2}}>Add a username</Typography>
            <Typography align={"justify"}>To display and save your data, kindly provide a username:</Typography>
            <InputForm type="text" id="username" label="Username" control={control} rules={{required: "This field is required", maxLength: {value: 20, message: "Username must not exceed 20 characters"}}} defaultValue={""} />
            <Grid container direction={"row"} justifyContent="center">
              <Grid item>
                <Button type="button" onClick={() => {setOpen(false); setNote(false)}} variant="contained" size="large" sx={{mb:2, mr:4}}>Close</Button>
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" size="large" sx={{mb:2, ml:4}}>Add</Button>
              </Grid>
            </Grid>
          </Stack>
        </form>
      </Container>
    </Modal>
  )
}

export default DemoUsername;