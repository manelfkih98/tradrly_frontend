import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { postByCondidat } from "../../store/services/postsService";
import CandidateTable from "./CandidateTable";
import EditModal from "./EditModal";

const PostCandida = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post_by_conadi, loading, error } = useSelector((state) => state.posts);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    titre: "",
    telephone: "",
    email: "",
    adresse: "",
    linkedin: "",
    dateNaissance: "",
    number: "",
    niveau: "",
    niveauEtude: "",
    departement: "",
    profil: "",
    competences: [""],
    generales: [""],
    langues: [""],
   
  
  });
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

  const handleOpenModal = async (application) => {
    if (application.status !== "pending") return;
    setSelectedApplication(application);

    setFormData({
      nom: application.nom || "",
      prenom: application.prenom || "",
      titre: application.titre || "",
      telephone: application.telephone || "",
      email: application.email || "",
      adresse: application.adresse || "",
      linkedin: application.linkedin || "",
      dateNaissance: application.dateNaissance || "",
     
      niveauEtude: application.niveauEtude || "",
      departement: application.departement || "",
      profil: application.profil || "",
      competences: application.competences?.length > 0 ? application.competences : [""],
      generales: application.generales?.length > 0 ? application.generales : [""],
      langues: application.langues?.length > 0 ? application.langues : [""],
      
   
    
    });

    const fileName = application.cv_local_url?.split("/").pop() || "default_cv.pdf";
    const apiUrl = `http://localhost:5000/tradrly/api/v1/post/getPostByFileName/${fileName}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
        setSnackbar({ open: true, message: "CV ouvert avec succès", severity: "success" });
      } else {
        throw new Error("Erreur lors de la récupération du CV");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Erreur lors de la récupération du CV",
        severity: "error",
      });
    }

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedApplication(null);
    setFormData({
      nom: "",
      prenom: "",
      titre: "",
      telephone: "",
      email: "",
      adresse: "",
      linkedin: "",
      dateNaissance: "",
     
      niveauEtude: "",
      departement: "",
      profil: "",
      competences: [""],
      generales: [""],
      langues: [""],
  
     
    });
    setErrorMessage("");
    setIsUpdating(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#F7FAFC" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          mt: { xs: 8, md: 8 },
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

          <CandidateTable
            applications={post_by_conadi}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            handleOpenModal={handleOpenModal}
            handleLogout={handleLogout}
          />

          <EditModal
            open={openModal}
            onClose={handleCloseModal}
            selectedApplication={selectedApplication}
            formData={formData}
            setFormData={setFormData}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            snackbar={snackbar}
            setSnackbar={setSnackbar}
            isUpdating={isUpdating}
            setIsUpdating={setIsUpdating}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PostCandida;