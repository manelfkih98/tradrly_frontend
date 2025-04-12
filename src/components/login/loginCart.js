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
  Alert
} from "@mui/material";
import authService from "../../store/services/loginService";

const schema = yup.object().shape({
  email: yup.string().email("Email invalide").required("L'email est requis"),
  password: yup.string().min(6, "Le mot de passe doit avoir au moins 6 caractères").required("Le mot de passe est requis"),
});

const LoginCart = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setError("");
    console.log("Données envoyées :", data);

    try {
      const response = await authService.login(data.email, data.password);
      console.log("Connexion réussie:", response);

      if (response.accessToken) {
        localStorage.setItem("token", response.accessToken);
      }

      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Erreur de connexion :", err);
      setError("Échec de la connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Tradrly
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            placeholder="your@email.com"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <FormControlLabel
              control={<Checkbox />}
              label="Se souvenir de moi"
            />
            <Link href="#" underline="hover">
              Mot de passe oublié ?
            </Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              background: "linear-gradient(to right, #2c3e50, #000000)",
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
              '&:hover': {
                background: "linear-gradient(to right, #000000, #2c3e50)",
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
