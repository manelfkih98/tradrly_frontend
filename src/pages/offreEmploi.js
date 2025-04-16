import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AllEmploi from "../components/offre/emploi/AllEmploi";

const Offre = () => {
  return (
    <Box sx={{ padding: 2, minHeight: "100vh", margin: "auto" }}>
      {/* En-tête avec icône et titre */}
      <Box display="flex" alignItems="center" mb={4}>
        <WorkOutlineIcon sx={{ fontSize: 30, color: "#1976d2", mr: 1 }} />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Gestion des Offres d'Emploi
          </Typography>
          
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <AllEmploi />
    </Box>
  );
};

export default Offre;
