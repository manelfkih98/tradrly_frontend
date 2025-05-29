import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
} from "@mui/material";

import image6 from "../../image/blog/image-6.png";
import image7 from "../../image/blog/image7.png";
import image8 from "../../image/blog/image-8.png";

const FinanceCards = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1, py: 4 }}>
          <Grid container spacing={2} justifyContent="center">
            {/* Colonne gauche : image8 + Dépenses guidées par vos valeurs */}
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={image8}
                    alt="Groupe regardant un ordinateur portable"
                  />
                </Card>

                <Card
                  sx={{
                    backgroundColor: "#C4B3FF",
                    borderRadius: 3,
                    height: 200,
                    color: "white",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Dépenses axées sur vos valeurs
                    </Typography>
                    <Typography variant="body2">
                      Concentrez vos dépenses sur ce qui correspond réellement à
                      vos priorités et à vos objectifs à long terme.
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>

            {/* Colonne centrale : image7 avec texte */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  height: 495,
                  backgroundImage: `url(${image7})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  color: "white",
                  p: 2,
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  Mettez de côté 35 % de vos revenus
                </Typography>
                <Typography variant="body2">
                  Épargnez 35 % de vos revenus pour renforcer votre sécurité
                  financière et <strong>adopter de bonnes habitudes</strong> de
                  gestion pour l’avenir.
                </Typography>
              </Box>
            </Grid>

            {/* Colonne droite : Financial Control + image6 */}
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Card
                  sx={{
                    backgroundColor: "#EEF5FF",
                    borderRadius: 3,
                    height: 200,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      Maîtrise financière
                    </Typography>
                    <Typography variant="body2">
                      Dépenser de manière réfléchie permet de réduire le gaspillage
                      et de renforcer votre contrôle sur l’avenir financier.
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: 3 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={image6}
                    alt="Homme souriant avec un café"
                  />
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default FinanceCards;
