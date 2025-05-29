import React from "react";
import { Box, Typography, Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import img1 from "../../image/div.ScrollyCards_vidWrapper__pF3HL (1).png"; 
import img2 from "../../image/div.ScrollyCards_vidWrapper__pF3HL (2).png";
import img3 from "../../image/div.ScrollyCards_vidWrapper__pF3HL.png";

const cards = [
  {
    img: img2,
    title: "Qui sommes-nous ?",
    text: "Nous sommes une équipe passionnée, unie par la volonté d’innover et de proposer des solutions performantes et durables. Forte d’une expertise multidisciplinaire, notre structure s’engage à accompagner ses partenaires avec rigueur, transparence et engagement. Chaque projet que nous menons repose sur des valeurs humaines fortes, un sens aigu de l’écoute et une culture de l’excellence.",
    bg: "#f5f5f5",
    number: "1",
  },
  {
    img: img1,
    title: "Notre mission et nos valeurs",
    text: "Notre mission est de créer de la valeur ajoutée à travers des services et des produits à fort impact, conçus dans une logique de qualité, d’éthique et d’innovation. Nous plaçons la satisfaction de nos clients, le respect de nos collaborateurs et la responsabilité sociétale au cœur de notre démarche. Nos valeurs fondamentales — intégrité, engagement, excellence et collaboration — guident chacune de nos décisions stratégiques et opérationnelles.",
    bg: "#fff8e1",
    number: "2",
  },
  {
    img: img3,
    title: "Nos engagements",
    text: "Conscients des enjeux économiques, sociaux et environnementaux actuels, nous nous engageons à agir de manière responsable et durable. Cela passe par une gestion éthique de nos activités, la valorisation des talents, le respect de l’environnement et l’intégration constante de pratiques innovantes. Nous aspirons à bâtir une relation de confiance durable avec nos parties prenantes, en garantissant performance, transparence et impact positif.",
    bg: "#e3f2fd",
    number: "3",
  },
];

const WhoAreWe = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ px: 4, py: 15, backgroundColor: "#fff" }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Qui sommes-nous ?
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center" mb={6}>
        Découvrez notre identité, nos valeurs et notre vision.
      </Typography>

      <Grid container direction="column" spacing={5} justifyContent="center" alignItems="center">
        {cards.map((card, index) => (
          <Grid item key={index} width="100%">
            <Box
              sx={{
                backgroundColor: card.bg,
                borderRadius: 5,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                boxShadow: 3,
                overflow: "hidden",
                position: "relative",
                width: "100%",
                maxWidth: "1300px",
                height: { xs: "auto", md: "250px" },
                mx: "auto",
              }}
            >
              <Box
                component="img"
                src={card.img}
                alt={card.title}
                sx={{
                  width: { xs: "100%", md: "40%" },
                  height: { xs: "200px", md: "100%" },
                  objectFit: "cover",
                }}
              />
              <Box sx={{ p: 4, width: { xs: "100%", md: "60%" }, position: "relative" }}>
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
                  En savoir plus
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
                    display: { xs: "none", md: "block" },
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
