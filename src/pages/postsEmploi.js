import React from "react";
import AllPost from "../components/posts/emploi/AllPostEmploi";
import {
  Container,
  Typography,
  Box,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

const Posts = () => {
  return (
    <Box sx={{ margin:"auto",mt:8,px:2,  minHeight: "100vh"}}>
      {/* Header avec icône */}
      <Box display="flex" alignItems="center" mb={4}>
        <WorkOutlineIcon sx={{ fontSize: 30, color: "#914091", mr: 1 }} />
        <Box>
          <Typography variant="h5" fontWeight="bold"  color="#1E3A8A">
          Gestion des Candidatures - Emploi
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
        }}
      >
        <CardContent>
          <AllPost />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Posts;
