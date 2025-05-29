import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import backgroundImage from "../../image/home.gif"; // Assurez-vous que le chemin est correct
import tradifyLogo from "../../image/image 4.png"; // Assurez-vous que le chemin est correct

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        color: "#ffffff",
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Image de fond */}
      <Box
        component="img"
        src={backgroundImage}
        alt="Arrière-plan AI Cube"
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
        alt="Logo Tradify"
        sx={{
          position: "absolute",
          top: { xs: "15px", md: "20px" },
          left: "50%",
          transform: "translateX(-50%)",
          width: { xs: "120px", md: "150px" },
          zIndex: 2,
        }}
      />

      {/* Contenu principal */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          px: { xs: 2, md: 4 },
          maxWidth: "800px",
        }}
      >
        {/* Titre principal */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
            fontWeight: 700,
            lineHeight: 1.2,
            mb: 2,
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Au-delà du code, vers le futur
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
          Allier l’innovation à un design intuitif pour créer des solutions web
          et mobiles qui apprennent, s’adaptent et évoluent avec vous
        </Typography>
      </Box>

      {/* Boutons */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          position: { xs: "relative", sm: "absolute" },
          bottom: { sm: "20px" },
          right: { sm: "20px" },
          zIndex: 2,
          alignItems: { xs: "center", sm: "flex-end" },
          mt: { xs: 2, sm: 0 },
        }}
      >
        <Button
          variant="outlined"
          href="/about"
          sx={{
            borderColor: "#ffffff",
            color: "#ffffff",
            borderRadius: "50px",
            padding: { xs: "8px 16px", md: "10px 20px" },
            textTransform: "none",
            fontSize: "1rem",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "#ffffff",
            },
          }}
        >
          Qui sommes-nous ? →
        </Button>
        <Button
          variant="outlined"
          href="#work"
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
          Nos réalisations →
        </Button>
      </Stack>
    </Box>
  );
};

export default HeroSection;
