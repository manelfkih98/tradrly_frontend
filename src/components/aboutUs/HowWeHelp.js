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
        How we help ?
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        align="center"
        maxWidth="500px"
        margin="0 auto"
        color="text.secondary"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
        felis, sed ullamcorper tempus faucibus in imperdiet. Semper justo
        mauris sed fusce erat aenean tristique.
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
              alt="testimonial"
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
                  end={89} // Valeur finale
                  duration={5} // Durée de l'animation
                  suffix=" %" // Suffixe
                  enableScrollSpy // Lancer l'animation quand l'élément est visible
                  scrollSpyDelay={200} // Délai avant le début de l'animation
                />
              </Typography>
              <Typography>Of Customers Recommend Our Services</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Deuxième rangée de cartes */}
      <Box sx={{ mt: 4, maxWidth: 1200, mx: "auto" }}>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {/* Carte mobile app */}
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
              <Typography fontWeight="bold">#Mobile App Name</Typography>
              <Box
                component="img"
                src={mobileAppImage}
                alt="Mobile App"
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
                “ Grabbing and holding your audience's attention: This is
                crucial in a world filled with distractions. It's about creating
                content that immediately captures ”
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
                    CEO & Founder
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