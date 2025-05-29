import React, { useEffect, useRef } from "react";
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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const TeamSection = () => {
  const dispatch = useDispatch();
  const { teams, loading } = useSelector((state) => state.teams);
  const scrollRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        px: { xs: 2, sm: 4 },
        borderTopLeftRadius: 100,
        borderBottomRightRadius: 100,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign={{ xs: "center", sm: "left" }}>
          Notre équipe dévouée
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
            En savoir plus
          </Button>
          {!isMobile && (
            <>
              <IconButton onClick={() => handleScroll("left")}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <IconButton onClick={() => handleScroll("right")}>
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}
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
                minWidth: { xs: "70%", sm: 280 },
                maxWidth: 280,
                height: { xs: "auto", sm: 350 },
                flexShrink: 0,
                borderRadius: 5,
                boxShadow: 3,
                backgroundColor: "#fff",
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent
                sx={{
                  p: 0,
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  {member.title}
                </Typography>
                <Typography variant="h6" mb={1}>
                  {member.name}
                </Typography>
                <CardMedia
                  component="img"
                  image={member.image}
                  alt={member.name}
                  sx={{
                    
                    borderRadius: 3,
                    height: 180,
                    width: 250,
                    objectFit: "cover",
                    mb: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  "{member.quote}"
                </Typography>

                {member.linkedin && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <a
                      href={
                        member.linkedin.startsWith("http")
                          ? member.linkedin
                          : `https://${member.linkedin}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "#0a66c2",
                      }}
                    >
                      <LinkedInIcon fontSize="small" />
                    </a>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>Chargement ou aucun membre trouvé...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default TeamSection;
