import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AllStage from "../components/offre/stage/AllStage";

const OffreStage = () => {
  return (
    <Box sx={{ margin: "auto", mt: 8, px: 2, minHeight: "100vh", }}>
      <Box display="flex" alignItems="center" mb={4}>
        <SchoolOutlinedIcon sx={{ fontSize: 30, color: "#914091", mr: 1, transition: "color 0.3s" }} />
        <Box>
          <Typography variant="h5" fontWeight="bold" color="#1E3A8A">
            Gestion des Offres de Stage
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 4, borderColor: "#E5E7EB" }} />

      <AllStage />
    </Box>
  );
};

export default OffreStage;