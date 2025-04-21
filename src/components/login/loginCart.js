import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import authService from "../../store/services/loginService";
import logo from "../../image/image 4.png";

const schema = yup.object().shape({
  email: yup.string().email("Email invalide").required("L'email est requis"),
  password: yup.string().required("Le mot de passe est requis"),
});

const LoginCart = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    setError("");
    try {
      const response = await authService.login(data.email, data.password);
      if (response.accessToken) {
        localStorage.setItem("token", response.accessToken);
      }
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Échec de la connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, rgb(70, 75, 86), rgba(108, 152, 228, 0.55))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          maxWidth: 420,
          width: "100%",
          borderRadius: 4,
          backgroundColor: "#ffffff",
        }}
      >
        <Box textAlign="center" mb={3}>
          <img src={logo} alt="Logo" style={{ maxWidth: "120px" }} />
          <Typography variant="subtitle1" color="text.secondary">
            Connectez-vous à votre espace
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Adresse Email"
            placeholder="your@email.com"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              background: "linear-gradient(to right, #1e3c72, #2a5298)",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 2,
              boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
              '&:hover': {
                background: "linear-gradient(to left, #1e3c72, #2a5298)",
              },
            }}
          >
            Connexion
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginCart;
