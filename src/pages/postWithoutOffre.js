import React from "react";
import { Box, Typography, Divider, Card, CardContent } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Demande from "../components/posts/demande";

const PostWithoutOffre = () => {
  return (
    <Box sx={{ margin: "auto", mt: 5, px: 2, minHeight: "100vh" }}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={4}>
        <WorkOutlineIcon sx={{ fontSize: 30, color: "#1976d2", mr: 1 }} />
        <Typography variant="h5" fontWeight="bold">
          Candidatures Spontanées
        </Typography>
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
          <Demande />
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostWithoutOffre;
