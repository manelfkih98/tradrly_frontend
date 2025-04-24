import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import Groups2Icon from "@mui/icons-material/Groups2";
import AllTeam from "../components/team/allTeam";

const Team = () => {
  return (
    <Box sx={{ margin:"auto",mt:8,px:2,  minHeight: "100vh"}}>
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
