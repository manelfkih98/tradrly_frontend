import React from "react";
import {
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const TestInfoPage = () => {
  const navigate = useNavigate();
  const { id: testId } = useParams(); // 👉 récupère le testId depuis l'URL

  const handleStartTest = () => {
    navigate(`/test/${testId}`);
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          py: 10,
          px: 2,
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Test d'Évaluation
          </Typography>
          <Typography variant="h6">
            Une étape clé pour identifier les talents qui construiront notre avenir.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="body1"
              sx={{
                bgcolor: "#ff9800",
                px: 3,
                py: 1,
                display: "inline-block",
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              ⚠️ Ce test ne peut être passé qu'une seule fois.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Pourquoi ce test ?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Nous cherchons des profils motivés et compétents. Ce test nous aide à repérer les meilleurs talents.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {[
            {
              title: "Format",
              description:
                "Test en ligne : QCM, mises en situation et exercices pratiques.",
            },
            {
              title: "Durée",
              description:
                "Entre 60 et 90 minutes selon le poste. Prévoir un créneau calme.",
            },
            {
              title: "Évaluation",
              description:
                "Critères : précision, réflexion, créativité. Résultats en 3 à 5 jours.",
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 1,
                  width: "100%",
                  borderRadius: 3,
                  textAlign: "center",
                  backgroundColor: " rgba(226, 199, 199, 0.12)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.26)",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            p: 4,
            borderRadius: 3,
            backgroundColor: "rgba(255, 0, 123, 0.05)",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Prêt à commencer ?
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleStartTest}
            size="large"
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Oui, je suis prêt !
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "#111827", color: "#d1d5db", py: 4, textAlign: "center" }}>
        <Typography variant="body2">
          © 2025 Tradrly. Tous droits réservés.
        </Typography>
      </Box>
    </>
  );
};

export default TestInfoPage;
