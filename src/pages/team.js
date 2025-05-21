import React from "react";
import { Box, Typography, Divider, Card, IconButton } from "@mui/material";
import Groups2Icon from "@mui/icons-material/Groups2";
import AllTeam from "../components/team/allTeam";
import { styled } from "@mui/material/styles";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "#914091",

 
}));


const Team = () => {
  return (
    <Box
    sx={{ margin: "auto", mt: 8, px: 2, minHeight: "100vh", }}
    >
     
        {/* En-tête avec icône */}
        <Box display="flex" alignItems="center" mb={4}>
          <StyledIconButton aria-label="Icône de l'équipe">
            <Groups2Icon sx={{ fontSize: 30 }} />
          </StyledIconButton>
          <Box>
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              color="#1E3A8A"
            >
              Notre Équipe
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4, borderColor: "#E5E7EB" }} />

        {/* Liste des membres de l’équipe */}
        <AllTeam />
    
    </Box>
  );
};

export default Team;