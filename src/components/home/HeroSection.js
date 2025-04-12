import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import backgroundImage from "../../image/home.gif"; // Your cube image
import tradifyLogo from "../../image/image 4.png"; // Replace with the actual path to your Tradify logo image

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        height: "75vh",
        width: "100vw",
        position: "relative",
        top: 0,
        left: 0,
        margin: 0,
        padding: "20px",
        color: "#ffffff",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        top: "13vh",
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={backgroundImage}
        alt="AI Cube"
        sx={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
          objectFit: "cover",
          zIndex: 0,
          opacity: 0.8,
          animation: "float 3s ease-in-out infinite",
        }}
      />

      {/* Tradify Logo Centered at the Top */}
      <Box
        component="img"
        src={tradifyLogo}
        alt="Tradify Logo"
        sx={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)", // Center the logo horizontally
          width: "150px", // Adjust the width as needed
          zIndex: 2,
        }}
      />

      {/* Main Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        {/* Main Headline */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.5rem", md: "4rem" },
            fontWeight: "bold",
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          Beyond Code, Into the Future
        </Typography>

        {/* Subheading */}
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1rem", md: "1.25rem" },
            fontWeight: "light",
            maxWidth: "600px",
            mx: "auto",
            mb: 4,
            color: "#d3d3d3",
          }}
        >
          Blending innovation with intuitive design to create web and mobile
          solutions that learn, adapt, and grow with you
        </Typography>
      </Box>

      {/* Buttons Positioned at Bottom-Right, Stacked Vertically */}
      <Stack
        direction="column" // Changed from "row" to "column" for vertical stacking
        spacing={2}
        sx={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 2,
          alignItems: "flex-end", // Align buttons to the right within the stack
        }}
      >
        <Button
          variant="outlined"
          sx={{
            borderColor: "#ffffff",
            color: "#ffffff",
            borderRadius: "50px",
            padding: "10px 20px",
            textTransform: "none",
            fontSize: "1rem",
              backgroundColor: "rgba(2, 2, 2, 0.59)",
            
          }}
        >
          Who we are? →
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#ffffff",
            color: "#ffffff",
            borderRadius: "50px",
            padding: "10px 20px",
            textTransform: "none",
            fontSize: "1rem",
           borderStyle: "dashed",
            "&:hover": {
              borderColor: "#ffffff",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          Our cool work →
        </Button>
      </Stack>

      {/* CSS Animation for Floating Effect */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </Box>
  );
};

export default HeroSection;