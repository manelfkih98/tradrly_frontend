import React from "react";
import { Box, Typography, Divider, Card, CardContent } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import AllQuestioPsy from "../components/questionPsy/allQuestioPsy";

const QuestionPsy = () => {
  return (
    <Box sx={{ margin: "auto", mt: 8, px: 2, minHeight: "100vh" }}>
      {/* Header de la page */}
      <Box display="flex" alignItems="center" mb={4}>
        <QuizIcon sx={{ fontSize: 30, color: "#1976d2", mr: 1 }} />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Gestion des Questions de Psychologie
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
          <AllQuestioPsy />
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuestionPsy;
