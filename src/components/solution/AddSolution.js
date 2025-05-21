import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { fetchDepartments } from "../../store/services/departService";
import { styled } from "@mui/material/styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import BusinessIcon from "@mui/icons-material/Business";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
    border: "1px solid #E5E7EB",
    transition: "all 0.4s ease-in-out",
    maxWidth: "450px",
    margin: "auto",
  },
}));

const StyledTitle = styled(DialogTitle)(({ theme }) => ({
  fontWeight: 800,
  fontSize: "1.4rem",
  backgroundColor: "#EDE9FE",
  color: "#1E3A8A",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: "16px 24px",
  textAlign: "center",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: "#1E3A8A",
    },
    "&:hover fieldset": {
      borderColor: "#914091",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#914091",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#1E3A8A",
    "&.Mui-focused": {
      color: "#914091",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#EF4444",
    fontSize: "0.85rem",
    marginLeft: "4px",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  textTransform: "none",
  padding: "10px 24px",
  fontWeight: 600,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
}));

const FileInputButton = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  backgroundColor: "#F8FAFC",
  color: "#1E3A8A",
  padding: "8px 16px",
  textTransform: "none",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#EDE9FE",
    color: "#914091",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  transition: "all 0.3s ease",
  "& .MuiButton-startIcon": {
    "& svg": {
      color: "#1E3A8A",
      transition: "color 0.3s ease",
    },
    "&:hover svg": {
      color: "#914091",
    },
  },
}));

function AddSolution({ open, handleClose, onSubmitSolution, editingSolution }) {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.departments);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (editingSolution) {
      setValue("name_project", editingSolution.name_project || "");
      setValue("date_creation", editingSolution.date_creation?.substring(0, 10) || "");

      const depId = editingSolution.departementId?._id || editingSolution.departementId;
      const matchedDep = departments.find((dep) => dep._id === depId);
      if (matchedDep) {
        setValue("departement_name", matchedDep.NameDep);
      } else {
        setValue("departement_name", "");
      }

      setSelectedFile(null);
      setPreviewUrl(null);
    } else {
      reset();
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  }, [editingSolution, setValue, reset, departments]);

  useEffect(() => {
    if (!open) {
      reset();
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  }, [open, reset]);

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("name_project", data.name_project);
    formData.append("date_creation", data.date_creation);
    formData.append("departement_name", data.departement_name);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    onSubmitSolution(formData);
    reset();
    setSelectedFile(null);
    setPreviewUrl(null);
    handleClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <StyledTitle>
        {editingSolution ? "Modifier le Projet" : "Ajouter un Projet"}
      </StyledTitle>

      <DialogContent sx={{ px: { xs: 3, sm: 4 }, pt: { xs: 2, sm: 3 } }}>
        <Typography
          variant="body2"
          sx={{ mb: 2, mt: 1, color: "#1E3A8A", fontStyle: "italic", fontSize: "0.9rem" }}
        >
          {editingSolution
            ? "Modifiez les informations pour mettre à jour le projet."
            : "Remplissez le formulaire pour ajouter un nouveau projet."}
        </Typography>

        <form onSubmit={handleSubmit(handleFormSubmit)} encType="multipart/form-data">
          <StyledTextField
            label="Nom du Projet"
            fullWidth
            variant="outlined"
            {...register("name_project", {
              required: "Le nom du projet est requis",
            })}
            error={!!errors.name_project}
            helperText={errors.name_project?.message}
          />

          <StyledTextField
            label="Date de création"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            {...register("date_creation", {
              required: "La date de création est requise",
            })}
            error={!!errors.date_creation}
            helperText={errors.date_creation?.message}
          />

          <StyledTextField
            select
            label="Département"
            fullWidth
            variant="outlined"
            {...register("departement_name", {
              required: "Le département est requis",
            })}
            error={!!errors.departement_name}
            helperText={errors.departement_name?.message}
            InputProps={{
              startAdornment: (
                <BusinessIcon sx={{ color: "#1E3A8A", mr: 1, transition: "color 0.3s" }} />
              ),
            }}
          >
            {departments.length > 0 ? (
              departments.map((dep) => (
                <MenuItem key={dep._id} value={dep.NameDep}>
                  {dep.NameDep}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Aucun département disponible</MenuItem>
            )}
          </StyledTextField>

          <Box sx={{ mb: 3 }}>
            <FileInputButton component="label" startIcon={<UploadFileIcon />}>
              {selectedFile ? "Changer l'image" : "Téléverser une image"}
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </FileInputButton>

            {previewUrl && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <img
                  src={previewUrl}
                  alt="Aperçu"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
              </Box>
            )}
          </Box>

          <Divider sx={{ my: 3, borderColor: "#E5E7EB" }} />

          <DialogActions sx={{ justifyContent: "flex-end", flexWrap: "wrap", gap: 1 }}>
            <StyledButton
              onClick={handleClose}
              variant="outlined"
              sx={{
                borderColor: "#1E3A8A",
                color: "#1E3A8A",
                "&:hover": {
                  borderColor: "#914091",
                  color: "#914091",
                  backgroundColor: "#EDE9FE",
                },
              }}
            >
              Annuler
            </StyledButton>
            <StyledButton
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#914091",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#7E3A8A",
                  boxShadow: "0 4px 8px rgba(145, 64, 145, 0.3)",
                },
              }}
            >
              {editingSolution ? "Modifier" : "Ajouter"}
            </StyledButton>
          </DialogActions>
        </form>
      </DialogContent>
    </StyledDialog>
  );
}

export default AddSolution;