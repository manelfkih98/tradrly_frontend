import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Divider,
  MenuItem,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { fetchDepartments } from "../../store/services/departService";
import { styled } from "@mui/material/styles";

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

const ErrorText = styled(Typography)(({ theme }) => ({
  color: "#EF4444",
  fontSize: "0.85rem",
  marginTop: "-16px",
  marginBottom: "12px",
  marginLeft: "4px",
}));

function EditSolution({ open, onClose, onSubmit, initialData }) {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.departments);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (initialData) {
      setValue("name_project", initialData.name_project || "");
      setValue("description_project", initialData.description_project || "");
      setValue("image", initialData.image || "");
      setValue("date_creation", initialData.date_creation ? initialData.date_creation.split("T")[0] : "");
      setValue("departementId", initialData.departementId?._id || initialData.departementId || "");
    } else {
      reset();
    }
  }, [initialData, setValue, reset]);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(initialData._id, data);
    reset();
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <StyledTitle>Modifier un Projet</StyledTitle>
      <DialogContent sx={{ px: { xs: 3, sm: 4 }, pt: { xs: 2, sm: 3 } }}>
        <Typography
          variant="body2"
          sx={{ mb: 2, mt: 1, color: "#1E3A8A", fontStyle: "italic", fontSize: "0.9rem" }}
        >
          Modifiez les informations pour mettre à jour le projet.
        </Typography>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <StyledTextField
            fullWidth
            label="Nom du projet"
            variant="outlined"
            {...register("name_project", {
              required: "Le nom du projet est requis",
            })}
            error={!!errors.name_project}
          />
          {errors.name_project && <ErrorText>{errors.name_project.message}</ErrorText>}

          <StyledTextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            {...register("description_project")}
          />

          <StyledTextField
            fullWidth
            label="URL de l'image"
            variant="outlined"
            {...register("image")}
          />

          <StyledTextField
            fullWidth
            label="Date de création"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            {...register("date_creation", {
              required: "La date de création est requise",
            })}
            error={!!errors.date_creation}
          />
          {errors.date_creation && <ErrorText>{errors.date_creation.message}</ErrorText>}

          <StyledTextField
            select
            fullWidth
            label="Département"
            variant="outlined"
            {...register("departementId", {
              required: "Le département est requis",
            })}
            error={!!errors.departementId}
          >
            {departments.length > 0 ? (
              departments.map((dep) => (
                <MenuItem key={dep._id} value={dep._id}>
                  {dep.NameDep}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Aucun département disponible</MenuItem>
            )}
          </StyledTextField>
          {errors.departementId && <ErrorText>{errors.departementId.message}</ErrorText>}

          <Divider sx={{ my: 3, borderColor: "#E5E7EB" }} />

          <DialogActions sx={{ justifyContent: "flex-end", flexWrap: "wrap", gap: 1 }}>
            <StyledButton
              onClick={onClose}
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
              Modifier
            </StyledButton>
          </DialogActions>
        </form>
      </DialogContent>
    </StyledDialog>
  );
}

export default EditSolution;