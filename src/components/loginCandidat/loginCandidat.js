import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CandidatConnecter } from "../../store/services/postsService";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup.string().required("Mot de passe requis"),
});

const LoginCandidat = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.posts); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const candidat = await dispatch(CandidatConnecter(data));
      navigate(`/test/${candidat._id}`);
    } catch (error) {
      console.error("Erreur de connexion :", error);
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

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
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
              "&:hover": {
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

export default LoginCandidat;
