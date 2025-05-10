import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postByCondidat, update_cv } from "../../store/services/postsService";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Paper,
  Link,
  Chip,

  IconButton,

  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TableSortLabel,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
 
  Input,
  Tooltip,
  Snackbar,
  Alert,

 
  Grid,
  Slide,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Business as BusinessIcon,
  Cancel as CancelIcon,
  Save as SaveIcon,
  ErrorOutline as ErrorOutlineIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Utility function to format dates
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Utility function to get status label and color
const getStatusProps = (status) => {
  switch (status) {
    case "pending":
      return { label: "En Attente", color: "default" };
    case "refused":
      return { label: "Refusé", color: "error" };
    case "testPassed":
      return { label: "Test Réussi", color: "success" };
    default:
      return { label: "Inconnu", color: "default" };
  }
};

// Sorting function
const sortApplications = (applications, sortBy, sortOrder) => {
  return [...applications].sort((a, b) => {
    const aValue = sortBy === "createdAt" ? new Date(a.createdAt) : a.status;
    const bValue = sortBy === "createdAt" ? new Date(b.createdAt) : b.status;
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
};

// Modal Transition Component
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PostCandida = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post_by_conadi, loading, error } = useSelector((state) => state.posts);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [cvLocalFile, setCvLocalFile] = useState(null);
  const [cvGoogleDriveUrl, setCvGoogleDriveUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [isUpdating, setIsUpdating] = useState(false);




  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      dispatch(postByCondidat(email));
    } else {
      navigate("/home");
    }
  }, [dispatch, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    navigate("/home");
  };


  const handleSort = (field) => {
    const isAsc = sortBy === field && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy(field);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenModal = (application) => {
    if (application.status !== "pending") return;
    setSelectedApplication(application);
    setCvGoogleDriveUrl(application.cv_google_drive_url || "");
    setCvLocalFile(null);
    setErrorMessage("");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedApplication(null);
    setCvLocalFile(null);
    setCvGoogleDriveUrl("");
    setErrorMessage("");
    setIsUpdating(false);
  };

  const handleCvUpdate = () => {
    if (!cvLocalFile && !cvGoogleDriveUrl) {
      setErrorMessage("Veuillez fournir au moins un CV (fichier local ou lien Google Drive).");
      return;
    }
    if (cvGoogleDriveUrl && !cvGoogleDriveUrl.startsWith("https://drive.google.com/")) {
      setErrorMessage("Veuillez entrer un lien Google Drive valide.");
      return;
    }
    if (cvLocalFile && cvLocalFile.size > 5 * 1024 * 1024) {
      setErrorMessage("Le fichier ne doit pas dépasser 5 Mo.");
      return;
    }

    setIsUpdating(true);
    const formData = new FormData();
    formData.append("postId", selectedApplication._id);
    if (cvLocalFile) {
      formData.append("file", cvLocalFile);
    }
    formData.append("cv_google_drive_url", cvGoogleDriveUrl || "");

    dispatch(update_cv(formData))
      .then(() => {
        const email = localStorage.getItem("email");
        if (email) {
          return dispatch(postByCondidat(email));
        }
      })
      .then(() => {
        setSnackbar({ open: true, message: "CV mis à jour avec succès", severity: "success" });
        handleCloseModal();
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error.payload || "Erreur lors de la mise à jour du CV",
          severity: "error",
        });
        setIsUpdating(false);
      });
  };

  // Filtered and sorted applications
  const filteredApplications = useMemo(() => {
    let result = post_by_conadi;
    if (statusFilter !== "all") {
      result = post_by_conadi.filter((post) => post.status === statusFilter);
    }
    return sortApplications(result, sortBy, sortOrder);
  }, [post_by_conadi, statusFilter, sortBy, sortOrder]);

  // Paginated applications
  const paginatedApplications = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredApplications.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredApplications, page]);

  const pageCount = Math.ceil(filteredApplications.length / rowsPerPage);

  const navItems = [
    { text: "Candidatures", icon: <WorkIcon />, path: "/dashboardcon", selected: true },
    { text: "Profil", icon: <PersonIcon />, path: "/profile" },
    { text: "Notifications", icon: <NotificationsIcon />, path: "/notifications" },
    { text: "Déconnexion", icon: <LogoutIcon />, action: handleLogout },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#F7FAFC" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          mt: { xs: 8, md: 8 }, // Offset for fixed navbar
          width: "100%",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#1A202C",
              letterSpacing: "0.5px",
              mb: 4,
            }}
          >
            Mes Candidatures
          </Typography>

          {/* Filter */}
          <Box sx={{ mb: 3 }}>
            <FormControl sx={{ minWidth: 220 }}>
              <InputLabel id="status-filter-label">Filtrer par statut</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="Filtrer par statut"
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                sx={{
                  borderRadius: "8px",
                  bgcolor: "#FFFFFF",
                  "& .MuiSelect-select": { py: 1.5 },
                }}
              >
                <MenuItem value="all">Tous</MenuItem>
                <MenuItem value="pending">En Attente</MenuItem>
                <MenuItem value="refused">Refusé</MenuItem>
                <MenuItem value="testPassed">Test Réussi</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress size={32} color="primary" />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: "8px" }}>
              {error}
            </Alert>
          )}

          {filteredApplications.length === 0 && !loading ? (
            <Typography
              sx={{
                color: "#4A5568",
                textAlign: "center",
                my: 4,
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              Aucune candidature trouvée.
            </Typography>
          ) : (
            <>
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  bgcolor: "#FFFFFF",
                }}
              >
                <Table aria-label="Tableau des candidatures">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: "#1A202C", width: "25%" }}>
                        Poste
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#1A202C", width: "15%" }}>
                        <TableSortLabel
                          active={sortBy === "status"}
                          direction={sortBy === "status" ? sortOrder : "asc"}
                          onClick={() => handleSort("status")}
                        >
                          Statut
                        </TableSortLabel>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#1A202C", width: "15%" }}>
                        <TableSortLabel
                          active={sortBy === "createdAt"}
                          direction={sortBy === "createdAt" ? sortOrder : "asc"}
                          onClick={() => handleSort("createdAt")}
                        >
                          Date
                        </TableSortLabel>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#1A202C", width: "15%" }}>
                        Type
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#1A202C", width: "15%" }}>
                        CV
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#1A202C", width: "15%" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedApplications.map((post, index) => (
                      <TableRow
                        key={post._id}
                        sx={{
                          bgcolor: index % 2 === 0 ? "#FFFFFF" : "#F9FAFB",
                          "&:hover": { bgcolor: "#EDF2F7" },
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        <TableCell sx={{ color: "#2D3748", fontSize: "0.95rem" }}>
                          {post.jobId ? post.jobId.titre : "En attente de poste"}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusProps(post.status).label}
                            color={getStatusProps(post.status).color}
                            size="small"
                            sx={{ fontSize: "0.85rem", fontWeight: 500 }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: "#4A5568", fontSize: "0.95rem" }}>
                          {formatDate(post.createdAt)}
                        </TableCell>
                        <TableCell sx={{ color: "#4A5568", fontSize: "0.95rem" }}>
                          {post.jobId ? (post.jobId.type === "job" ? "Emploi" : "Stage") : "-"}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: 2 }}>
                            <Link
                              href={post.cv_local_url || "#"}
                              target="_blank"
                              rel="noopener"
                              underline="hover"
                              sx={{
                                color: post.cv_local_url ? "#1976D2" : "#A0AEC0",
                                fontSize: "0.9rem",
                                "&:hover": post.cv_local_url && { color: "#1565C0" },
                              }}
                            >
                              Local
                            </Link>
                        
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Tooltip
                            title={
                              post.status !== "pending"
                                ? "Modification non autorisée après décision"
                                : "Modifier le CV"
                            }
                          >
                            <span>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => handleOpenModal(post)}
                                disabled={post.status !== "pending"}
                                sx={{
                                  textTransform: "none",
                                  fontSize: "0.9rem",
                                  borderRadius: "8px",
                                  borderColor: "#1976D2",
                                  color: "#1976D2",
                                  "&:hover": {
                                    borderColor: "#1565C0",
                                    bgcolor: "#E3F2FD",
                                    transform: "scale(1.05)",
                                  },
                                  "&:disabled": {
                                    borderColor: "#B0BEC5",
                                    color: "#B0BEC5",
                                  },
                                  transition: "all 0.2s ease",
                                }}
                                aria-label={
                                  post.status !== "pending"
                                    ? "Bouton de modification du CV désactivé"
                                    : "Modifier le CV"
                                }
                              >
                                Modifier CV
                              </Button>
                            </span>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      fontSize: "0.95rem",
                      "&:hover": { bgcolor: "#E3F2FD" },
                    },
                    "& .Mui-selected": {
                      bgcolor: "#1976D2",
                      color: "#FFFFFF",
                      "&:hover": { bgcolor: "#1565C0" },
                    },
                  }}
                />
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* CV Modification Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
            bgcolor: "#FFFFFF",
            p: 2,
          },
        }}
        role="dialog"
        aria-labelledby="cv-modal-title"
        aria-describedby="cv-modal-description"
      >
        <DialogTitle
          id="cv-modal-title"
          sx={{
            fontWeight: 700,
            color: "#1A202C",
            fontSize: "1.75rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #E2E8F0",
            pb: 2,
            mb: 3,
          }}
        >
          Modifier le CV
          <IconButton
            onClick={handleCloseModal}
            aria-label="Fermer la fenêtre de modification du CV"
            sx={{ color: "#4A5568" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 0 }}>
          <Box id="cv-modal-description" sx={{ mb: 3 }}>
            <Typography
              variant="body1"
              sx={{ color: "#2D3748", fontSize: "1rem", fontWeight: 400 }}
            >
              Mettez à jour votre CV pour l’offre{" "}
              <strong>{selectedApplication?.jobId?.titre || "En attente de poste"}</strong>.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <InputLabel
                  sx={{ mb: 1, fontWeight: 500, color: "#2D3748", fontSize: "1rem" }}
                >
                  Télécharger un CV
                </InputLabel>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      textTransform: "none",
                      fontSize: "0.95rem",
                      borderRadius: "8px",
                      borderColor: "#CFD8DC",
                      color: "#2D3748",
                      px: 3,
                      py: 1,
                      "&:hover": { borderColor: "#1976D2", bgcolor: "#F5F7FA" },
                      "&:focus": { outline: "2px solid #1976D2" },
                    }}
                    aria-label="Sélectionner un fichier CV"
                  >
                    Choisir un fichier
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setCvLocalFile(e.target.files[0])}
                      sx={{ display: "none" }}
                      aria-describedby="cv-file-error"
                    />
                  </Button>
                  {cvLocalFile && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#2D3748", fontSize: "0.95rem" }}
                      >
                        {cvLocalFile.name}
                      </Typography>
                      <IconButton
                        onClick={() => setCvLocalFile(null)}
                        aria-label="Supprimer le fichier sélectionné"
                        sx={{ color: "#D32F2F" }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
                <Typography
                  variant="caption"
                  sx={{ mt: 1, color: "#6B7280", fontSize: "0.85rem", display: "block" }}
                >
                  PDF uniquement, 5 Mo maximum
                </Typography>
              </Box>
            </Grid>
            
            {errorMessage && !cvGoogleDriveUrl && (
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }} role="alert">
                  <ErrorOutlineIcon sx={{ color: "#D32F2F", fontSize: "1.25rem" }} />
                  <Typography
                    id="cv-file-error"
                    color="error"
                    sx={{ fontSize: "0.95rem" }}
                  >
                    {errorMessage}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0, justifyContent: "flex-end", gap: 2 }}>
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            startIcon={<CancelIcon />}
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              color: "#2D3748",
              borderColor: "#CFD8DC",
              borderRadius: "8px",
              px: 3,
              py: 1,
              "&:hover": { borderColor: "#B0BEC5", bgcolor: "#F5F7FA" },
              "&:focus": { outline: "2px solid #1976D2" },
            }}
            aria-label="Annuler la modification du CV"
          >
            Annuler
          </Button>
          <Button
            onClick={handleCvUpdate}
            variant="contained"
            startIcon={isUpdating ? null : <SaveIcon />}
            disabled={isUpdating}
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              bgcolor: "#1976D2",
              borderRadius: "8px",
              px: 3,
              py: 1,
              "&:hover": { bgcolor: "#1565C0" },
              "&:disabled": { bgcolor: "#B0BEC5" },
              "&:focus": { outline: "2px solid #1976D2" },
            }}
            aria-label="Enregistrer le CV"
          >
            {isUpdating ? <CircularProgress size={20} color="inherit" /> : "Enregistrer"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            fontSize: "0.95rem",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PostCandida;
