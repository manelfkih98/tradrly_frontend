import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam } from "../../store/services/teamService";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const TeamSection = () => {
  const dispatch = useDispatch();
  const { teams, loading } = useSelector((state) => state.teams);
  const scrollRef = useRef(null); // ✅ CORRECTION : scrollRef défini

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  const handleScroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5edff",
        py: 6,
        px: 4,
        borderTopLeftRadius: 100,
        borderBottomRightRadius: 100,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Our beloved team
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderRadius: 5,
              textTransform: "none",
              backgroundColor: "#000",
              color: "#fff",
            }}
          >
            Wanna know more
          </Button>
          <IconButton onClick={() => handleScroll("left")}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton onClick={() => handleScroll("right")}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: 3,
          overflowX: "auto",
          scrollBehavior: "smooth",
          px: 1,
          py: 2,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {teams && teams.length > 0 ? (
          teams.map((member, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 250,
                flexShrink: 0,
                borderRadius: 5,
                boxShadow: 3,
                backgroundColor: "#fff",
                p: 2,
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" fontWeight="bold">
                  {member.title}
                </Typography>
                <Typography variant="h6" mb={2}>
                  {member.name}
                </Typography>
                <CardMedia
                  component="img"
                  image={member.image}
                  alt={member.name}
                  sx={{ borderRadius: 3, height: 200, objectFit: "cover" }}
                />
                <Typography variant="body2" mt={2}>
                  "{member.quote}"
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    mt: 1,
                  }}
                >
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon fontSize="small" sx={{ color: "#0a66c2" }} />
                  </a>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>Loading or no team members found...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default TeamSection;
