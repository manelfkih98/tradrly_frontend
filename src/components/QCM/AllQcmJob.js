import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQcmJob } from "../../store/services/QcmService";
import {addEntretien, refuserEntretien } from "../../store/services/entretienService";
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
  LinearProgress,
  Container,
  Paper,
  Button,
  Divider,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Email as MailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";

const AllQcmJob = () => {
  const QCMs = useSelector((state) => state.Qcms?.QCM || []);
  const loading = useSelector((state) => state.entretien?.loading ?? false);
  const error = useSelector((state) => state.entretien?.error ?? null);
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    heure: "",
    mode: "",
    linkGoogleMeet: "",
  });

  useEffect(() => {
    dispatch(fetchQcmJob());
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

  const handleRefuse = (postId) => {
    dispatch(refuserEntretien(postId))
      .then(() => {
        setSnackbar({
          open: true,
          message: "Refus envoyé avec succès",
          severity: "success",
        });
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error.message || "Erreur lors de l'envoi du refus",
          severity: "error",
        });
      });
  };

  const handleNewTest = (postId) => {
    setSelectedPostId(postId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPostId(null);
    setFormData({ date: "", heure: "", mode: "", linkGoogleMeet: "" });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = () => {
    if (!formData.date || !formData.heure || !formData.mode) {
      setSnackbar({
        open: true,
        message: "Veuillez remplir tous les champs requis",
        severity: "error",
      });
      return;
    }
    if (formData.mode === "en ligne" && !formData.linkGoogleMeet) {
      setSnackbar({
        open: true,
        message: "Le lien Google Meet est requis pour un entretien en ligne",
        severity: "error",
      });
      return;
    }

    dispatch(addEntretien({ postId: selectedPostId, ...formData }))
      .then(() => {
        setSnackbar({
          open: true,
          message: "Entretien créé avec succès",
          severity: "success",
        });
        handleCloseDialog();
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error.message || "Erreur lors de la création de l'entretien",
          severity: "error",
        });
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getScoreColors = (percentage) => {
    if (percentage >= 80)
      return {
        bg: "#e8f5e8",
        color: "#2e7b32",
        border: "#4caf50",
        progressColor: "#4caf50",
      };
    if (percentage >= 60)
      return {
        bg: "#e3f2fd",
        color: "#1565c0",
        border: "#2196f3",
        progressColor: "#2196f3",
      };
    if (percentage >= 40)
      return {
        bg: "#fff3e0",
        color: "#ef6c00",
        border: "#ff9800",
        progressColor: "#ff9800",
      };
    return {
      bg: "#ffebee",
      color: "#c62828",
      border: "#f44336",
      progressColor: "#f44336",
    };
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
    color: "white",
    "& .MuiChip-icon": {
      color: "rgba(255, 255, 255, 0.8)",
    },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)",
      color: "#667eea",
      "& .MuiChip-icon": {
        color: "#667eea",
      },
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
    ...(variant === "reject"
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

  const getScoreBoxStyle = (percentage) => {
    const colors = getScoreColors(percentage);
    return {
      backgroundColor: colors.bg,
      border: `2px solid ${colors.border}`,
      borderRadius: 4,
      p: 2.5,
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "scale(1.02)",
        boxShadow: `0 8px 25px ${colors.border}40`,
      },
    };
  };

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
                    <AssessmentIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h3" fontWeight={700}>
                      Résultats QCM
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Gérez les candidatures et analysez les performances de vos tests
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    backgroundColor: "rgba(229, 14, 14, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: 3,
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: 30, mb: 1 }} />
                  <Typography variant="h3" fontWeight={700}>
                    {QCMs?.length || 0}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Candidats évalués
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {QCMs === undefined ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <Paper sx={{ p: 6, borderRadius: 3, textAlign: "center" }}>
              <CircularProgress size={60} sx={{ color: "#667eea", mb: 3 }} />
              <Typography variant="h6" color="text.secondary">
                Chargement des données...
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Veuillez patienter pendant que nous récupérons les résultats
              </Typography>
            </Paper>
          </Box>
        ) : QCMs.length === 0 ? (
          <Paper sx={{ p: 8, textAlign: "center", borderRadius: 3 }}>
            <PersonIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
            <Typography variant="h5" fontWeight={600} mb={2}>
              Aucun QCM trouvé
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Les résultats des tests apparaîtront ici une fois disponibles
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {QCMs.map((qcm, index) => {
              const total = qcm.questions?.length || 1;
              const score = qcm.resultat || 0;
              const percentage = Math.round((score / total) * 100);
              const colors = getScoreColors(percentage);

              return (
                <Grid item xs={12} sm={6} lg={4} key={qcm._id}>
                  <Fade in timeout={600 + index * 200}>
                    <Card sx={cardStyle}>
                      <Box sx={headerSectionStyle}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                          <Avatar
                            sx={{
                              width: 56,
                              height: 56,
                              backgroundColor: "rgba(255, 255, 255, 0.2)",
                              color: "white",
                              fontSize: "1.4rem",
                              fontWeight: "700",
                              border: "2px solid rgba(255, 255, 255, 0.3)",
                            }}
                          >
                            {qcm.post_id?.nom?.charAt(0).toUpperCase() || "?"}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                              {qcm.post_id?.nom} {qcm.post_id?.prenom}
                            </Typography>
                            <Chip
                              icon={<WorkIcon />}
                              label={qcm.post_id?.jobId?.titre || "Poste non spécifié"}
                              size="small"
                              sx={contactChipStyle}
                            />
                          </Box>
                        </Stack>

                        <Stack spacing={1}>
                          <Chip
                            icon={<MailIcon />}
                            label={qcm.post_id?.email || "Email non rempli"}
                            size="small"
                            sx={contactChipStyle}
                          />
                          <Chip
                            icon={<PhoneIcon />}
                            label={qcm.post_id?.telephone || "Téléphone non rempli"}
                            size="small"
                            sx={contactChipStyle}
                          />
                        </Stack>
                      </Box>

                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, color: "text.secondary" }}>
                            Performance du test
                          </Typography>
                          <Paper sx={getScoreBoxStyle(percentage)}>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                  Score obtenu
                                </Typography>
                                <Typography variant="h4" fontWeight={700} sx={{ color: colors.color }}>
                                  {score}/{total}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="h3" fontWeight={700} sx={{ color: colors.color, mb: 1 }}>
                                  {percentage}%
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={percentage}
                                  sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    "& .MuiLinearProgress-bar": {
                                      backgroundColor: colors.progressColor,
                                      borderRadius: 4,
                                    },
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" spacing={2}>
                          <Button
                            fullWidth
                            onClick={() => handleRefuse(qcm.post_id._id)}
                            sx={getActionButtonStyle("reject")}
                            disabled={loading}
                          >
                            {loading ? <CircularProgress size={24} /> : "Refuser"}
                          </Button>
                          <Button
                            fullWidth
                            onClick={() => handleNewTest(qcm.post_id._id)}
                            sx={getActionButtonStyle("accept")}
                            disabled={loading}
                          >
                            Entretien RH
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Dialog for creating Entretien RH */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Planifier un Entretien RH</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
              <TextField
                label="Heure"
                type="time"
                name="heure"
                value={formData.heure}
                onChange={handleFormChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
              <FormControl fullWidth required>
                <InputLabel>Mode</InputLabel>
                <Select name="mode" value={formData.mode} onChange={handleFormChange}>
                  <MenuItem value="en ligne">En ligne</MenuItem>
                  <MenuItem value="présentiel">Présentiel</MenuItem>
                </Select>
              </FormControl>
              {formData.mode === "en ligne" && (
                <TextField
                  label="Lien Google Meet"
                  name="linkGoogleMeet"
                  value={formData.linkGoogleMeet}
                  onChange={handleFormChange}
                  fullWidth
                  required
                />
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Annuler
            </Button>
            <Button
              onClick={handleFormSubmit}
              variant="contained"
              disabled={loading}
              sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
            >
              {loading ? <CircularProgress size={24} /> : "Planifier"}
            </Button>
          </DialogActions>
        </Dialog>

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

export default AllQcmJob;