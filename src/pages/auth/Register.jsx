import { useState } from "react";
import {
  Paper,
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Person, Email } from "@mui/icons-material";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setSnackbar({ open: true, message: data.message || "Registration failed!", type: response.ok ? "success" : "error" });

      if (response.ok) setFormData({ name: "", email: "", password: "" });
    } catch {
      setSnackbar({ open: true, message: "Network error!", type: "error" });
    }

    setLoading(false);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: "100%" }}>
      <Paper elevation={5} sx={{ p: 4, width: 400, borderRadius: 3, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Create an Account
        </Typography>
        <form onSubmit={register}>
          {[
            { label: "Name", name: "name", icon: <Person /> },
            { label: "Email", name: "email", icon: <Email />, type: "email" },
            { label: "Password", name: "password", type: showPassword ? "text" : "password", toggle: true },
          ].map(({ label, name, type = "text", icon, toggle }) => (
            <TextField
              key={name}
              fullWidth
              label={label}
              name={name}
              type={type}
              required
              margin="normal"
              value={formData[name]}
              onChange={handleChange}
              InputProps={{
                startAdornment: icon && <InputAdornment position="start">{icon}</InputAdornment>,
                endAdornment: toggle && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ))}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1, borderRadius: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Register"}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
          Already have an account?
          <Link to="/login" style={{ color: "#1976d2", textDecoration: "none", marginLeft: 4 }}>Log in</Link>
        </Typography>
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snackbar.type} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterForm;
