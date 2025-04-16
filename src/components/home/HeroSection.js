import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import backgroundImage from "../../image/home.gif"; // Assurez-vous que le chemin est correct
import tradifyLogo from "../../image/image 4.png"; // Assurez-vous que le chemin est correct

const HeroSection = () => {
  return (
    <Box
      sx={{
        
        position: "relative", // Corrigé "flex" en "relative" (valeur non valide pour position)
        display: "flex",
        color: "#ffffff",
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Hauteur pleine page pour une section héroïque
        overflow: "hidden",
      }}
    >
      {/* Image de fond */}
      <Box
        component="img"
        src={backgroundImage}
        alt="AI Cube Background"
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        
          animation: "float 3s ease-in-out infinite",
          "@keyframes float": {
            "0%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-10px)" },
            "100%": { transform: "translateY(0)" },
          },
        }}
      />

      {/* Logo */}
      <Box
        component="img"
        src={tradifyLogo}
        alt="Tradify Logo"
        sx={{
          position: "absolute",
          top: { xs: "15px", md: "20px" }, // Ajustement responsif
          left: "50%",
          transform: "translateX(-50%)",
          width: { xs: "120px", md: "150px" }, // Taille responsif
          zIndex: 2,
        }}
      />

      {/* Contenu principal */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          px: { xs: 2, md: 4 }, // Padding responsif
          maxWidth: "800px", // Limite la largeur du contenu
        }}
      >
        {/* Titre principal */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" }, // Taille responsif
            fontWeight: 700,
            lineHeight: 1.2,
            mb: 2,
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)", // Ombre légère pour lisibilité
          }}
        >
          Beyond Code, Into the Future
        </Typography>

        {/* Sous-titre */}
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "0.875rem", md: "1.25rem" },
            fontWeight: 300,
            maxWidth: "600px",
            mx: "auto",
            mb: { xs: 3, md: 4 },
            color: "#d3d3d3",
            lineHeight: 1.5,
          }}
        >
          Blending innovation with intuitive design to create web and mobile
          solutions that learn, adapt, and grow with you
        </Typography>
      </Box>

      {/* Boutons */}
      <Stack
        direction={{ xs: "column", sm: "row" }} // Colonne sur mobile, ligne sur desktop
        spacing={2}
        sx={{
          position: { xs: "relative", sm: "absolute" }, // Relatif sur mobile pour éviter le chevauchement
          bottom: { sm: "20px" },
          right: { sm: "20px" },
          zIndex: 2,
          alignItems: { xs: "center", sm: "flex-end" },
          mt: { xs: 2, sm: 0 }, // Marge sur mobile
        }}
      >
        <Button
          variant="outlined"
          href="#about" // Ajout d'un lien pour la navigation
          sx={{
            borderColor: "#ffffff",
            color: "#ffffff",
            borderRadius: "50px",
            padding: { xs: "8px 16px", md: "10px 20px" },
            textTransform: "none",
            fontSize: "1rem",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "#ffffff",
            },
          }}
        >
          Who we are? →
        </Button>
        <Button
          variant="outlined"
          href="#work" // Ajout d'un lien pour la navigation
          sx={{
            borderColor: "#ffffff",
            color: "#ffffff",
            borderRadius: "50px",
            padding: { xs: "8px 16px", md: "10px 20px" },
            textTransform: "none",
            fontSize: "1rem",
            borderStyle: "dashed",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "#ffffff",
            },
          }}
        >
          Our cool work →
        </Button>
      </Stack>
    </Box>
  );
};

export default HeroSection;