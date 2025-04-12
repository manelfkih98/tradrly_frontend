import React from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Paper,
  Stack,
} from "@mui/material";

const tags = ["Full-Time", "Marketing", "Design"];
const tagColors = {
  "Full-Time": "success",
  Marketing: "warning",
  Design: "info",
  "Web developers": "secondary",
  "Mobile developpers": "primary",
  "Data scientist": "success",
  "AI Engineer": "error",
};

const tagCloud = [
  "Full-Time",
  "Marketing",
  "Design",
  "Mobile developpers",
  "Data scientist",
  "Web developers",
  "AI Engineer",
];

const OpportunityCard = () => (
  <Paper
    elevation={3}
    sx={{
      borderRadius: 5,
      p: 2,
      backgroundColor: "#fff",
      width: "100%",
    }}
  >
    <Typography variant="subtitle1" fontWeight="bold">
      People & Organization
    </Typography>
    <Typography variant="body2" mt={1}>
      Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
    </Typography>
    <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          color={tagColors[tag]}
          variant="outlined"
          sx={{ fontSize: 12 }}
        />
      ))}
    </Stack>
  </Paper>
);

const CareerOpportunities = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#111",
        borderRadius: "60px",
        p: 6,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 6,
        color: "#fff",
      }}
    >
      {/* LEFT SIDE - Opportunity Cards */}
      <Box flex={1} display="flex" flexDirection="column" gap={3}>
        {[1, 2, 3, 4].map((_, index) => (
          <OpportunityCard key={index} />
        ))}
      </Box>

      {/* RIGHT SIDE - Heading + Tags */}
      <Box flex={1} display="flex" flexDirection="column" justifyContent="center" gap={3}>
        <Typography variant="h4" fontWeight="bold" lineHeight={1.3}>
          Join Us in Full-Time, Part-Time,<br />
          Freelance & Intern Roles!
        </Typography>
        <Typography variant="body1">
          Explore our exciting opportunities for full-time, part-time, freelance, and internship positions!
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={1}>
          {tagCloud.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              color={tagColors[tag] || "default"}
              variant="outlined"
              sx={{ fontSize: 12 }}
            />
          ))}
        </Stack>

        <Box mt={2}>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "40px",
              backgroundColor: "#fff",
              color: "#000",
              px: 3,
              "&:hover": {
                backgroundColor: "#ddd",
              },
            }}
          >
            See more →
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CareerOpportunities;
