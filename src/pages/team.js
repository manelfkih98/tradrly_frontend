import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import Groups2Icon from "@mui/icons-material/Groups2";
import AllTeam from "../components/team/allTeam";

const Team = () => {
  return (
    <Box sx={{ padding: 2, minHeight: "100vh", margin: "auto" }}>
      {/* En-tête avec icône */}
      <Box display="flex" alignItems="center" mb={4}>
        <Groups2Icon sx={{ fontSize: 30, color: "#1976d2", mr: 1 }} />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Notre Équipe
          </Typography>
         
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Liste des membres de l’équipe */}
      <AllTeam />
    </Box>
  );
};

export default Team;
