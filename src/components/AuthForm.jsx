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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

const AuthForm = ({ title, fields, submitLabel, apiEndpoint, linkText, linkTo }) => {
  const initialState = fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {});
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setSnackbar({ open: true, message: data.message || "Request failed!", type: response.ok ? "success" : "error" });

      if (response.ok) setFormData(initialState);
    } catch {
      setSnackbar({ open: true, message: "Network error!", type: "error" });
    }

    setLoading(false);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: "100%", bgcolor: "#f4f6f8" }}>
      <Paper elevation={5} sx={{ p: 4, width: 400, borderRadius: 3, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>{title}</Typography>
        <form onSubmit={handleSubmit}>
          {fields.map(({ label, name, icon, type = "text" }) => (
            <TextField
              key={name}
              fullWidth
              label={label}
              name={name}
              type={name === "password" ? (showPassword ? "text" : "password") : type}
              required
              margin="normal"
              value={formData[name]}
              onChange={handleChange}
              InputProps={{
                startAdornment: icon && <InputAdornment position="start">{icon}</InputAdornment>,
                endAdornment: name === "password" && (
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
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : submitLabel}
          </Button>
        </form>

        {linkText && (
          <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
            {linkText}{" "}
            <Link to={linkTo} style={{ color: "#1976d2", textDecoration: "none", marginLeft: 4 }}>
              {submitLabel === "Register" ? "Log in" : "Sign up"}
            </Link>
          </Typography>
        )}
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snackbar.type} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthForm;
