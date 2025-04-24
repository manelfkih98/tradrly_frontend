import React from "react";
import AllQcm from "../components/QCM/allQcm";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";

const Qcm = () => {
  return (
    <Box sx={{ margin: "auto", mt: 8, px: 2, minHeight: "100vh" }}>
      {/* En-tête de la page */}
      <Box display="flex" alignItems="center" mb={4}>
        <FactCheckIcon sx={{ fontSize: 30, color: "#1976d2", mr: 1 }} />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Espace Résultats QCM
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Retrouvez ici les résultats de tests passés par les candidats.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Contenu principal */}
      <Card
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <CardContent>
          <AllQcm />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Qcm;
