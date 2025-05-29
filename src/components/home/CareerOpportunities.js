import React from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Paper,
  Stack,
  useMediaQuery,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Tags disponibles et leurs couleurs
const tagColors = {
  "Temps plein": "success",
  Marketing: "warning",
  Design: "info",
  "Développeurs web": "secondary",
  "Développeurs mobile": "primary",
  "Data scientist": "success",
  "Ingénieur IA": "error",
};

// Nuage de tags (partie droite)
const tagCloud = [
  "Temps plein",
  "Marketing",
  "Design",
  "Développeurs mobile",
  "Data scientist",
  "Développeurs web",
  "Ingénieur IA",
];

// Opportunités dynamiques (partie gauche)
const opportunities = [
  {
    title: "Chef de Projet Marketing",
    description: "Gérez les campagnes et boostez notre visibilité.",
    tags: ["Temps plein", "Marketing"],
  },
  {
    title: "UX/UI Designer",
    description: "Créez des interfaces utilisateur modernes et intuitives.",
    tags: ["Temps plein", "Design"],
  },
  {
    title: "Développeur Web",
    description: "Développez des applications web performantes.",
    tags: ["Temps plein", "Développeurs web"],
  },
  {
    title: "Ingénieur IA",
    description: "Implémentez des modèles intelligents pour nos produits.",
    tags: ["Temps plein", "Ingénieur IA"],
  },
];

// Carte d’opportunité individuelle
const OpportunityCard = ({ title, description, tags }) => (
  <Paper
    elevation={3}
    sx={{
      borderRadius: 5,
      px: 3,
      py: 2,
      backgroundColor: "#fff",
      transition: "transform 0.3s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: 6,
      },
    }}
  >
    <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
      {title}
    </Typography>
    <Typography variant="body2" mt={1}>
      {description}
    </Typography>
    <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          color={tagColors[tag] || "default"}
          variant="outlined"
          sx={{ fontSize: 12 }}
        />
      ))}
    </Stack>
  </Paper>
);

// Composant principal
const CareerOpportunities = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ py: 8,  }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: "#111",
            borderRadius: "60px",
            p: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
            color: "#fff",
            alignItems: "center",
          }}
        >
          {/* LEFT - Liste dynamique des opportunités */}
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            gap={3}
            width="100%"
          >
            {opportunities.map((op, index) => (
              <OpportunityCard
                key={index}
                title={op.title}
                description={op.description}
                tags={op.tags}
              />
            ))}
          </Box>

          {/* RIGHT - Texte, tags et bouton */}
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems={{ xs: "flex-start", md: "center" }}
            gap={3}
            textAlign={{ xs: "left", md: "center" }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              fontWeight="bold"
              lineHeight={1.3}
            >
              Rejoignez-nous en <br />
              Temps plein, Temps partiel, <br />
              Freelance & Stages !
            </Typography>
            <Typography variant="body1">
              Découvrez nos opportunités en temps plein, partiel, freelance et stages passionnants !
            </Typography>

            <Stack
              direction="row"
              flexWrap="wrap"
              gap={1}
              justifyContent={{ xs: "flex-start", md: "center" }}
            >
              {tagCloud.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  color={tagColors[tag] || "default"}
                  variant="outlined"
                  sx={{ fontSize: 12 }}
                />
              ))}
            </Stack>

            <Box mt={2}>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "40px",
                  backgroundColor: "#fff",
                  color: "#000",
                  px: 3,
                  py: 1,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                Voir plus →
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CareerOpportunities;
