import React from "react";
import { Box, Typography, Card, CardContent,Divider } from "@mui/material";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ListeSolution from "../components/solution/ListeSolution";

const Solution = () => {
  return (
    <Box
      sx={{
      
        margin: "auto",
        mt: 5,
        px: 2,
       minHeight: "100vh"
      }}
    >
      <Box display="flex" alignItems="center" mb={4}>
        <WorkspacesIcon sx={{ fontSize: 30, color: "#1976d2", mr: 1 }} />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Gestion des Projets
          </Typography>
       
        </Box>
      </Box>
      <Divider sx={{ mb: 4 }} />

      <Card
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <CardContent>
          <ListeSolution />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Solution;
