import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import img1 from "../../image/div.ScrollyCards_vidWrapper__pF3HL (1).png"; // adapte à ton chemin
import img2 from "../../image/div.ScrollyCards_vidWrapper__pF3HL (2).png";
import img3 from "../../image/div.ScrollyCards_vidWrapper__pF3HL.png";

const cards = [
  {
    img: img2,
    title: "Lorem Lorem ipsum dolor sit amet",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum felis, sed ullamcorper tempus faucibus in imperdiet. Semper justo mauris sed fusce erat aenean tristique.",
    bg: "#f5f5f5",
    number: "1",
    width: "1300.67px", // Ajout de la largeur spécifique
    height: "200px", // Ajout de la hauteur spécifique
  },
  {
    img: img1,
    title: "Lorem Lorem ipsum dolor sit amet",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum felis, sed ullamcorper tempus faucibus in imperdiet. Semper justo mauris sed fusce erat aenean tristique.",
    bg: "#fff8e1",
    number: "2",
    width: "1200.67px", // Ajout de la largeur spécifique
    height: "200px", // Ajout de la hauteur spécifique
  },
  {
    img: img3,
    title: "Lorem Lorem ipsum dolor sit amet",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum felis, sed ullamcorper tempus faucibus in imperdiet. Semper justo mauris sed fusce erat aenean tristique.",
    bg: "#e3f2fd",
    number: "3",
    width: "1100.74px", // Ajout de la largeur spécifique
    height: "200px", // Ajout de la hauteur spécifique
  },
];

const WhoAreWe = () => {
  return (
    <Box sx={{ px: 4, py: 15, backgroundColor: "#fff" }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Who are we ?
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center" mb={6}>
        Lorem Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      </Typography>

      <Grid container direction="column" spacing={5} justifyContent="center" alignItems="center">
        {cards.map((card, index) => (
          <Grid item key={index}>
            <Box
              sx={{
                backgroundColor: card.bg,
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                boxShadow: 3,
                overflow: "hidden",
                position: "relative",
                width: card.width, // Applique la largeur spécifique
                height: card.height, // Applique la hauteur spécifique
              }}
            >
              <Box
                component="img"
                src={card.img}
                alt={card.title}
                sx={{
                  width: "40%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Box sx={{ p: 4, width: "60%", position: "relative" }}>
                <Typography variant="h6" fontWeight="bold" mb={1}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  {card.text}
                </Typography>
                <Button
                  variant="outlined"
                  endIcon={<span>→</span>}
                  sx={{
                    backgroundColor: "#fff",
                    color: "#000", 
                    borderRadius: 5,
                  }}
                >
                  Wanna know more
                </Button>

                <Typography
                  variant="h1"
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 20,
                    fontWeight: "bold",
                    fontSize: "4rem",
                    color: "#ddd",
                    opacity: 0.3,
                  }}
                >
                  {card.number}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhoAreWe;
