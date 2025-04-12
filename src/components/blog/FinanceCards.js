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
            {/* Left column with image8 and Value-Driven Spending */}
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={image8}
                    alt="Group looking at laptop"
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
                      Value-Driven Spending
                    </Typography>
                    <Typography variant="body2">
                      Focus your spending on what truly aligns with your
                      priorities and long-term goals.
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>

            {/* Center image with text */}
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
                  Set aside 35% of your income.
                </Typography>
                <Typography variant="body2">
                  Save 35% of your income to build financial security and{" "}
                  <strong>develop strong money habits</strong> for future needs
                  and opportunities.
                </Typography>
              </Box>
            </Grid>

           
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
                      Financial Control
                    </Typography>
                    <Typography variant="body2">
                      Thoughtful spending helps reduce waste and strengthens
                      control over your financial future.
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: 3 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={image6}
                    alt="Smiling man with coffee"
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
