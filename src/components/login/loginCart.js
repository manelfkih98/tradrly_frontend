import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import authService from "../../store/services/loginService";
import logo from "../../image/tradrrly.png";

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

  const bubbles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 8 + 4}px`,
    duration: `${Math.random() * 20 + 10}s`,
  }));

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        background:
          "radial-gradient(rgba(145, 64, 145, 0.87),rgba(30, 59, 138, 0.81))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {bubbles.map((b) => (
        <Box
          key={b.id}
          sx={{
            position: "absolute",
            top: 0,
            left: b.left,
            width: b.size,
            height: b.size,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: "50%",
            animation: `float ${b.duration} linear infinite`,
          }}
        />
      ))}

      <Paper
        elevation={8}
        sx={{
          position: "relative",
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box textAlign="center" mb={3}>
          <Box display="flex" justifyContent="center" mb={1}>
            <img src={logo} alt="Logo" style={{ width: "100px", height: "100px" }} />
          </Box>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff" }}>
            Bienvenue
          </Typography>
          <Typography variant="body2" sx={{ color: "#ddd" }}>
            Connectez-vous à votre compte
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
            placeholder="Votre email"
            margin="normal"
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined sx={{ color: "#ccc" }} />
                </InputAdornment>
              ),
              disableUnderline: true,
              style: {
                background: "rgba(145, 64, 145, 0.1)",
                backdropFilter: "blur(5px)",
                color: "#fff",
                borderRadius: 8,
              },
            }}
            InputLabelProps={{ style: { color: "#ccc" } }}
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              input: { color: "#fff" },
            }}
          />

          <TextField
            fullWidth
            placeholder="Mot de passe"
            margin="normal"
            type={showPassword ? "text" : "password"}
            variant="filled"
            InputProps={{
             
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "#fff" }} />
                    ) : (
                      <Visibility sx={{ color: "#fff" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              disableUnderline: true,
              style: {
                background: "rgba(145, 64, 145, 0.1)",
                backdropFilter: "blur(5px)",
                color: "#fff",
                borderRadius: 8,
              },
            }}
            InputLabelProps={{ style: { color: "#ccc" } }}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              input: { color: "#fff" },
            }}
          />

          <Button
            type="submit"
            fullWidth
            size="large"
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              background: "linear-gradient(to right, #914091, #1E3A8A)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(to left, #914091, #1E3A8A)",
              },
            }}
          >
            Connexion
          </Button>
        </Box>
      </Paper>

      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(100vh);
              opacity: 0;
            }
            50% {
              opacity: 0.8;
            }
            100% {
              transform: translateY(-10vh);
              opacity: 0;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default LoginCart;
