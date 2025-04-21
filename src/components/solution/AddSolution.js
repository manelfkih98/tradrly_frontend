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
  InputLabel,
  FormControl,
  IconButton,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { fetchDepartments } from "../../store/services/departService";
import { styled } from "@mui/material/styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import BusinessIcon from "@mui/icons-material/Business";

// Dialog Style with modern glass look
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 20,
    backdropFilter: "blur(8px)",
    background: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
    border: `1px solid ${theme.palette.grey[200]}`,
    transition: "all 0.4s ease-in-out",
    maxWidth: "450px",
    margin: "auto",
  },
}));

const StyledTitle = styled(DialogTitle)(({ theme }) => ({
  fontWeight: 800,
  fontSize: "1.4rem",
  backgroundColor: "#1e3a8a",
  color: "#fff",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: "16px 24px",
  textAlign: "center",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    backgroundColor: "#f4f6f8",
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: theme.palette.grey[300],
    },
    "&:hover fieldset": {
      borderColor: "#d4af37",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1e3a8a",
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.grey[600],
    "&.Mui-focused": {
      color: "#1e3a8a",
    },
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    backgroundColor: "#f4f6f8",
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: theme.palette.grey[300],
    },
    "&:hover fieldset": {
      borderColor: "#d4af37",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1e3a8a",
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.grey[600],
    "&.Mui-focused": {
      color: "#1e3a8a",
    },
  },
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  color: "#b91c1c",
  fontSize: "0.85rem",
  marginTop: "-16px",
  marginBottom: "12px",
  marginLeft: "4px",
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
  backgroundColor: "#f4f6f8",
  color: "#1e3a8a",
  padding: "8px 16px",
  textTransform: "none",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#d4af37",
    color: "#1e3a8a",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  transition: "all 0.3s ease",
}));

function AddSolution({ open, handleClose, onSubmitSolution, editingSolution }) {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.departments);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (editingSolution) {
      setValue("name_project", editingSolution.name_project || "");
      setValue("description_project", editingSolution.description_project || "");
      setValue("date_creation", editingSolution.date_creation?.substring(0, 10) || "");
      setValue("departement_name", editingSolution.departementId?.NameDep || "");
      setSelectedFile(null); // Reset file input during edit
    } else {
      reset();
      setSelectedFile(null);
    }
  }, [editingSolution, setValue, reset]);

  useEffect(() => {
    if (!open) {
      reset();
      setSelectedFile(null);
    }
  }, [open, reset]);

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("name_project", data.name_project);
    formData.append("description_project", data.description_project || "");
    formData.append("date_creation", data.date_creation);
    formData.append("departement_name", data.departement_name);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    onSubmitSolution(formData);
    reset();
    setSelectedFile(null);
    handleClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
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
          sx={{ mb: 3, color: "#4b5563", fontStyle: "italic", fontSize: "0.9rem" }}
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
            label="Description (optionnel)"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            {...register("description_project")}
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

          <StyledFormControl fullWidth variant="outlined" error={!!errors.departement_name}>
            <InputLabel>Département</InputLabel>
            <Controller
              name="departement_name"
              control={control}
              rules={{ required: "Le département est requis" }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  select
                  value={value || ""}
                  onChange={onChange}
                  variant="outlined"
                  label="Département"
                  InputProps={{
                    startAdornment: (
                      <BusinessIcon sx={{ color: "#1e3a8a", mr: 1 }} />
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
                </TextField>
              )}
            />
            {errors.departement_name && (
              <ErrorText>{errors.departement_name.message}</ErrorText>
            )}
          </StyledFormControl>

          <Box sx={{ mb: 3 }}>
            <FileInputButton
              component="label"
              startIcon={<UploadFileIcon />}
            >
              {selectedFile ? "Changer l'image" : "Téléverser une image"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </FileInputButton>
            {selectedFile && (
              <Typography variant="body2" sx={{ mt: 1, color: "#1e3a8a" }}>
                Fichier sélectionné : {selectedFile.name}
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 3, borderColor: "#e5e7eb" }} />

          <DialogActions sx={{ justifyContent: "flex-end", flexWrap: "wrap", gap: 1 }}>
            <StyledButton
              onClick={handleClose}
              variant="outlined"
              sx={{
                borderColor: "#1e3a8a",
                color: "#1e3a8a",
                "&:hover": {
                  borderColor: "#d4af37",
                  color: "#d4af37",
                },
              }}
            >
              Annuler
            </StyledButton>
            <StyledButton
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#1e3a8a",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#d4af37",
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