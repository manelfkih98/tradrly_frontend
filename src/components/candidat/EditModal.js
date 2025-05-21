import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Modal,
  Snackbar,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { motion } from "framer-motion";
import { BarLoader } from "react-spinners";
import { update_cv, postByCondidat } from "../../store/services/postsService";
import StepFields from "./StepFields";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 580,
  bgcolor: "#fafafa",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  p: 4,
  borderRadius: 3,
  maxHeight: "90vh",
  overflowY: "auto",
  border: "none",
};

const stepperStyle = {
  bgcolor: "#ffffff",
  borderRadius: 2,
  p: 2,
  mb: 3,
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  "& .MuiStepLabel-label": {
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "#4b5563",
  },
  "& .MuiStepLabel-label.Mui-active": {
    color: "#914091",
    fontWeight: 600,
  },
  "& .MuiStepIcon-root": {
    fontSize: "1.2rem",
    color: "#e5e7eb",
    "&.Mui-active": {
      color: "#914091",
    },
    "&.Mui-completed": {
      color: "#16a34a",
    },
  },
};

const buttonStyle = {
  textTransform: "none",
  fontWeight: 600,
  fontSize: "0.9rem",
  borderRadius: 1.5,
  px: 2.5,
  py: 0.75,
  transition: "all 0.2s ease",
};

const steps = ["Informations", "Coordonnées", "Profil", "Confirmation"];

const EditModal = ({
  open,
  onClose,
  selectedApplication,
  formData,
  setFormData,
  errorMessage,
  setErrorMessage,
  snackbar,
  setSnackbar,
  isUpdating,
  setIsUpdating,
}) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
   
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setErrorMessage("");
  };

  const handleCvUpdate = async () => {
    setIsUpdating(true);
    const data = new FormData();
    data.append("postId", selectedApplication._id);

    for (const key of Object.keys(formData)) {
      if (["competences", "generales", "langues"].includes(key)) {
        formData[key].forEach((item) => {
          if (item && item.trim()) {
            data.append(key, item.trim()); // Backend expects 'competences', not 'competences[]'
          }
        });
      } else if (key === "cvLocalFile" && formData.cvLocalFile) {
        data.append("file", formData.cvLocalFile);
      } else if (key !== "cvLocalFile") {
        const value = formData[key];
        data.append(key, value !== null && value !== undefined ? value.toString() : "");
      }
    }

    try {
      console.log("FormData entries:");
      for (let [key, value] of data.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      }
      console.log("Selected application ID:", selectedApplication._id);
      console.log("Form data:", formData);
      const response = await dispatch(update_cv(selectedApplication._id, formData));
      console.log("API response:", response);
      const email = localStorage.getItem("email");
      if (email) {
        await dispatch(postByCondidat(email));
      }
      setSnackbar({ open: true, message: "Informations mis à jour avec succès", severity: "success" });
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      setSnackbar({
        open: true,
        message: error.payload || "Erreur lors de la mise à jour des informations",
        severity: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Box sx={modalStyle}>
            <Typography
              variant="h6"
              sx={{ color: "#1E3A8A", fontWeight: 700, fontSize: "1.5rem" }}
              gutterBottom
            >
              Modifier la Candidature: {selectedApplication?.jobId?.titre || "En attente de poste"}
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel sx={stepperStyle}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ minHeight: 300 }}>
              <StepFields
                activeStep={activeStep}
                formData={formData}
                setFormData={setFormData}
                errorMessage={errorMessage}
              />
            </Box>

            {isUpdating && (
              <Box display="flex" justifyContent="center" my={3}>
                <BarLoader color="#914091" height={5} width={120} />
              </Box>
            )}

            <Box mt={4} display="flex" justifyContent="space-between">
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  ...buttonStyle,
                  color: "#4b5563",
                  bgcolor: "#e5e7eb",
                  "&:hover": { bgcolor: "#d1d5db" },
                  "&:disabled": { bgcolor: "#f3f4f6", color: "#9ca3af" },
                }}
              >
                Retour
              </Button>
              {activeStep < steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    ...buttonStyle,
                    bgcolor: "#914091",
                    "&:hover": { bgcolor: "#7A347A" },
                  }}
                >
                  Continuer
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleCvUpdate}
                  disabled={isUpdating}
                  sx={{
                    ...buttonStyle,
                    bgcolor: "#914091",
                    "&:hover": { bgcolor: "#7A347A" },
                    "&:disabled": { bgcolor: "#c4b5fd", color: "#fff" },
                  }}
                >
                  {isUpdating ? "Envoi..." : "Enregistrer"}
                </Button>
              )}
            </Box>
          </Box>
        </motion.div>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ bgcolor: "#f3e8ff", color: "#1E3A8A", fontWeight: 500 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditModal;