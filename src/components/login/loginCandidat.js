import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { CandidatConnecter } from "../../store/services/postsService";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

import logo from "../../image/image 4.png";

// Validation schema using Yup
const schema = yup.object().shape({
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup.string().required("Mot de passe requis"),
});

const LoginCandidat = () => {
  const { id } = useParams(); 
  console.log(id); // Log the id to check if it's being passed correctly
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const candidat = await dispatch(CandidatConnecter(data));
      navigate(`/page_info/${id}`);
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Paper
        sx={{
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          p: 4,
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease",
        }}
      >
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100px", height: "50px", marginBottom: "16px" }}
          />
          <Typography
            variant="h6"
            sx={{ color: "#374151", fontWeight: 500, mb: 2 }}
          >
            Connexion au Test d'Évaluation
          </Typography>
          <Typography
            sx={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: 1.5 }}
          >
            Connectez-vous pour accéder à votre test. Ce test est une opportunité
            unique et ne peut être passé qu'une seule fois.
          </Typography>
        </Box>

        <Alert
          severity="warning"
          sx={{
            mb: 3,
            borderRadius: 2,
            bgcolor: "#fef3c7",
            color: "#92400e",
            "& .MuiAlert-icon": { color: "#d97706" },
          }}
        >
          <Typography sx={{ fontSize: "0.9rem" }}>
            <strong>Attention :</strong> Ce test ne peut être passé qu'une seule
            fois. Assurez-vous d'être dans un environnement calme et prêt(e) avant
            de commencer.
          </Typography>
        </Alert>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            placeholder="votre@email.com"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2563eb",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#4b5563",
                "&.Mui-focused": {
                  color: "#2563eb",
                },
              },
            }}
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
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2563eb",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#4b5563",
                "&.Mui-focused": {
                  color: "#2563eb",
                },
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
              mb: 3,
            }}
          ></Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              background: "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(90deg, #1e40af 0%, #2563eb 100%)",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
              },
              position: "relative",
              overflow: "hidden",
              "&::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 0,
                height: 0,
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                transition: "width 0.6s ease, height 0.6s ease",
              },
              "&:hover::after": {
                width: "400px",
                height: "400px",
              },
            }}
          >
            Accéder au Test
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginCandidat;
