import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import CountUp from "react-countup";
import teamImage from "../../image/Group 3473677.png";
import mobileAppImage from "../../image/Rectangle 18034.png";
import avatarImage from "../../image/Ellipse 1384.png";

const HowWeHelp = () => {
  return (
    <Box sx={{ px: 4, py: 8 }}>
      {/* Titre principal */}
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Comment nous aidons ?
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        align="center"
        maxWidth="500px"
        margin="0 auto"
        color="text.secondary"
      >
        Nous mettons à disposition notre expertise pour accompagner nos clients dans l’atteinte de leurs objectifs. Grâce à des solutions personnalisées et innovantes, nous assurons un impact durable et une croissance optimale.
      </Typography>

      {/* Première rangée de cartes */}
      <Grid
        container
        spacing={2}
        sx={{ mt: 1 }}
        alignItems="stretch"
        justifyContent="center"
      >
        {/* Carte image */}
        <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column" }}>
          <Card
            sx={{
              flex: 1,
              borderRadius: 8,
              overflow: "hidden",
              position: "relative",
              height: "50%",
            }}
          >
            <Box
              component="img"
              src={teamImage}
              alt="Équipe professionnelle"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <CardContent
              sx={{ position: "absolute", color: "#fff", top: 30, left: 30 }}
            >
              <Typography>
                Une équipe dévouée et expérimentée au service de vos ambitions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte compteur */}
        <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column" }}>
          <Card
            sx={{
              flex: 1,
              borderRadius: 8,
              backgroundColor: "#4B8BFF",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box textAlign="center">
              <Typography variant="h3" fontWeight="bold">
                <CountUp
                  end={89}
                  duration={5}
                  suffix=" %"
                  enableScrollSpy
                  scrollSpyDelay={200}
                />
              </Typography>
              <Typography>de nos clients recommandent nos services</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Deuxième rangée de cartes */}
      <Box sx={{ mt: 4, maxWidth: 1200, mx: "auto" }}>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {/* Carte application mobile */}
          <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column" }}>
            <Card
              sx={{
                flex: 1,
                borderRadius: 8,
                backgroundColor: "#1f2937",
                color: "white",
                p: 2,
              }}
            >
              <Typography fontWeight="bold">#Nom de l’application mobile</Typography>
              <Box
                component="img"
                src={mobileAppImage}
                alt="Application mobile"
                sx={{ mt: 2, width: "100%", borderRadius: 2 }}
              />
            </Card>
          </Grid>

          {/* Carte citation */}
          <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column" }}>
            <Card
              sx={{
                flex: 1,
                borderRadius: 4,
                backgroundColor: "#fffbea",
                p: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography fontStyle="italic" mb={2}>
                « Captiver et retenir l’attention de votre audience : un enjeu essentiel dans un monde rempli de distractions. Il s'agit de créer un contenu qui saisit immédiatement. »
              </Typography>
              <Box display="flex" alignItems="center">
                <Avatar
                  alt="Alex Smith"
                  src={avatarImage}
                  sx={{ width: 48, height: 48, mr: 2 }}
                />
                <Box>
                  <Typography fontWeight="bold">Alex Smith</Typography>
                  <Typography variant="body2" color="text.secondary">
                    CEO & Fondateur
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HowWeHelp;
