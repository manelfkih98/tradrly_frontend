import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntretien } from "../../store/services/entretienService";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  CircularProgress,
  Chip,
  Stack,
  Fade,
  Container,
  Paper,
  Button,
  Divider,
  Snackbar,
  Alert,
  
} from "@mui/material";
import {
  Person as PersonIcon,
  Work as WorkIcon,
  Event as EventIcon,
  Videocam as VideocamIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";

const AllEntretien = () => {
  const entretiens = useSelector((state) => state.entretiens.entretien|| []);
  const loading = useSelector((state) => state.entretien?.loading ?? false);
  const error = useSelector((state) => state.entretien?.error ?? null);
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    dispatch(fetchEntretien());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: error || "Une erreur est survenue",
        severity: "error",
      });
    }
  }, [error]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCancelEntretien = (entretienId) => {
    // Placeholder pour une action d'annulation (à implémenter dans entretienService)
    setSnackbar({
      open: true,
      message: "Fonctionnalité d'annulation à implémenter",
      severity: "info",
    });
  };

  const handleEditEntretien = (entretienId) => {
    // Placeholder pour une action de modification (à implémenter)
    setSnackbar({
      open: true,
      message: "Fonctionnalité de modification à implémenter",
      severity: "info",
    });
  };

  const cardStyle = {
    borderRadius: 4,
    background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
    position: "relative",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 16px 48px rgba(0, 0, 0, 0.12)",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    },
  };

  const headerSectionStyle = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    p: 3,
    position: "relative",
    overflow: "hidden",
    "&::after": {
      content: '""',
      position: "absolute",
      top: "-50%",
      right: "-20%",
      width: "100px",
      height: "100px",
      background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
      borderRadius: "50%",
    },
  };

  const headerCardStyle = {
    background: "linear-gradient(rgba(118, 75, 162, 0.27) 100%)",
    color: "white",
    borderRadius: 4,
    p: 4,
    mb: 4,
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      width: "200px",
      height: "200px",
      background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
      borderRadius: "50%",
      transform: "translate(50%, -50%)",
    },
  };

  const contactChipStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    color: "#667eea",
    "& .MuiChip-icon": {
      color: "rgba(255, 255, 255, 0.8)",
    },
   
    transition: "all 0.3s ease",
  };

  const getActionButtonStyle = (variant) => ({
    borderRadius: 3,
    textTransform: "none",
    fontWeight: 600,
    py: 1.5,
    px: 3,
    boxShadow: "none",
    transition: "all 0.3s ease",
    ...(variant === "cancel"
      ? {
          backgroundColor: "#ffebee",
          color: "#c62828",
          border: "2px solid #ffcdd2",
          "&:hover": {
            backgroundColor: "#f44336",
            color: "white",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(244, 67, 54, 0.3)",
          },
        }
      : {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          "&:hover": {
            background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
          },
        }),
  });

  return (
    <Box sx={{ backgroundColor: "#f8faff", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Paper sx={headerCardStyle} elevation={0}>
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Stack spacing={2}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <EventIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h3" fontWeight={700}>
                      Liste des Entretiens RH
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Consultez et gérez les entretiens planifiés
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    backgroundColor: "rgba(229, 14, 229, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: 3,
                  }}
                >
                  <EventIcon sx={{ fontSize: 30, mb: 1 }} />
                  <Typography variant="h3" fontWeight={700}>
                    {entretiens.length}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Entretiens planifiés
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <Paper sx={{ p: 6, borderRadius: 3, textAlign: "center" }}>
              <CircularProgress size={60} sx={{ color: "#667eea", mb: 3 }} />
              <Typography variant="h6" color="text.secondary">
                Chargement des entretiens...
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Veuillez patienter pendant la récupération des données
              </Typography>
            </Paper>
          </Box>
        ) : entretiens.length === 0 ? (
          <Paper sx={{ p: 8, textAlign: "center", borderRadius: 3 }}>
            <EventIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
            <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
              Aucun entretien trouvé
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Les entretiens planifiés apparaîtront ici
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {entretiens.map((entretien, index) => (
              <Grid item xs={12} sm={6} md={4} key={entretien._id}>
                <Fade in timeout={600 + index * 200}>
                  <Card sx={cardStyle}>
                    {/* Header */}
                    <Box sx={headerSectionStyle}>
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <Avatar
                          sx={{
                            width: 56,
                            height: 56,
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            color: "white",
                            fontSize: "1.4rem",
                            fontWeight: 700,
                            border: "2px solid rgba(255, 255, 255, 0.3)",
                          }}
                        >
                          {entretien.postId?.nom?.charAt(0).toUpperCase() || "?"}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                            {entretien.postId?.nom} {entretien.postId?.prenom || "Inconnu"}
                          </Typography>
                          <Chip
                            icon={<WorkIcon />}
                            label={entretien.postId?.jobId?.titre || "Poste non spécifié"}
                            size="small"
                            sx={contactChipStyle}
                          />
                        </Box>
                      </Stack>
                    </Box>

                    {/* Card Content */}
                    <CardContent sx={{ p: 3 }}>
                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, color: "text.secondary" }}>
                            Détails de l'entretien
                          </Typography>
                          <Stack spacing={1}>
                            <Chip
                              icon={<EventIcon />}
                              label={new Date(entretien.date).toLocaleDateString("fr-FR", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                              size="small"
                              sx={contactChipStyle}
                            />
                            <Chip
                              icon={<EventIcon />}
                              label={entretien.heure}
                              size="small"
                              sx={contactChipStyle}
                            />
                            <Chip
                            
                              label={entretien.mode === "en ligne" ? "En ligne" : "Présentiel"}
                              size="small"
                              sx={contactChipStyle}
                            />
                            {entretien.mode === "en ligne" && entretien.linkGoogleMeet && (
                              <Chip
                                icon={<VideocamIcon />}
                                label={
                                  <a href={entretien.linkGoogleMeet} target="_blank" rel="noopener noreferrer">
                                    Rejoindre Google Meet
                                  </a>
                                }
                                size="small"
                                sx={contactChipStyle}
                              />
                            )}
                          </Stack>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* Actions */}
                        <Stack direction="row" spacing={2}>
                          <Button
                            fullWidth
                            onClick={() => handleCancelEntretien(entretien._id)}
                            sx={getActionButtonStyle("cancel")}
                            disabled={loading}
                          >
                            {loading ? <CircularProgress size={24} /> : "Annuler"}
                          </Button>
                          <Button
                            fullWidth
                            onClick={() => handleEditEntretien(entretien._id)}
                            sx={getActionButtonStyle("edit")}
                            disabled={loading}
                          >
                            {loading ? <CircularProgress size={24} /> : "Modifier"}
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Snackbar for feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default AllEntretien;