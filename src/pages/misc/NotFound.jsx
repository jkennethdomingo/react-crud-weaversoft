import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100%", textAlign: "center", }}
    >
      <Typography variant="h1" sx={{ fontSize: "6rem", fontWeight: "bold", color: "primary.main" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "medium", mb: 2 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ color: "gray", mb: 3 }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/" sx={{ borderRadius: 2, px: 4, py: 1.5 }}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
