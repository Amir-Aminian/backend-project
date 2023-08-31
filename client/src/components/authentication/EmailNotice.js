import { Box, Typography, Container } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const EmailNotice= ({display}) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5, display: {display} }}>
      <Box
        p={3}
        textAlign="center"
        borderRadius="10px"
        backgroundColor="rgba(255, 255, 255, 0.95)" 
        boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <CheckCircleOutlineIcon color="primary" fontSize="large" sx={{ marginBottom: 2 }} />
        <Typography variant="h5" color="primary" gutterBottom>
          Welcome to Our Adorable Site!
        </Typography>
        <Typography sx={{ color: "#555", fontSize: "1.1rem", marginBottom: 2 }}>
          You're officially part of our cute community! 🎉
        </Typography>
        <Typography sx={{ color: "#555", fontSize: "1.1rem", marginBottom: 2 }}>
          We've just sent you an email with a magical link. Click on it to unlock the wonders!
        </Typography>
        <Typography sx={{ color: "#555", fontSize: "1.1rem" }}>
          If you don't see the email, don't worry! It might be napping in your spam folder. 💌
        </Typography>
      </Box>
    </Container>
  )
}

export default EmailNotice;
