import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AllStage from "../components/offre/stage/AllStage";

const OffreStage = () => {
  return (
    <Box sx={{ margin:"auto",mt:8,px:2,  minHeight: "100vh"}}>
      {/* Header avec icône */}
      <Box display="flex" alignItems="center" mb={4}>
        <SchoolOutlinedIcon sx={{ fontSize: 30, color: "#1976d2", mr: 1 }} />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Gestion des Offres de Stage
          </Typography>
         
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <AllStage />
    </Box>
  );
};

export default OffreStage;
