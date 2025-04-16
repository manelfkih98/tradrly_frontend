import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";

// Dialog Style with modern glass look
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 16,
    backdropFilter: "blur(8px)",
    background: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    border: `1px solid ${theme.palette.divider}`,
    transition: "all 0.3s ease-in-out",
  },
}));

const StyledTitle = styled(DialogTitle)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: "#fff",
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  padding: "20px 32px",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "24px",
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: theme.palette.grey[50],
    transition: "all 0.2s ease",
    "& fieldset": {
      borderColor: theme.palette.grey[300],
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "0.8rem",
  marginTop: "-18px",
  marginBottom: "12px",
  marginLeft: "4px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  textTransform: "none",
  padding: "10px 22px",
  fontWeight: 600,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  },
}));

function AddDepartement({ open, handleClose, handleSubmit, editingDepartment }) {
  const {
    register,
    handleSubmit: onSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (editingDepartment) {
      setValue("NameDep", editingDepartment.NameDep);
      setValue("DescrpDetp", editingDepartment.DescrpDetp);
    } else {
      reset();
    }
  }, [editingDepartment, setValue, reset]);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const handleFormSubmit = (data) => {
    handleSubmit(data);
    reset();
    handleClose();
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <StyledTitle>
        {editingDepartment ? "Modifier le Département" : "Ajouter un Département"}
      </StyledTitle>

      <DialogContent sx={{ px: 4, pt: 3 }}>
        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          {editingDepartment
            ? "Modifiez les informations ci-dessous pour mettre à jour le département."
            : "Veuillez remplir le formulaire pour ajouter un nouveau département."}
        </Typography>

        <form onSubmit={onSubmit(handleFormSubmit)} noValidate>
          <StyledTextField
            label="Nom du Département"
            fullWidth
            variant="outlined"
            {...register("NameDep", { required: "Le nom du département est requis" })}
            error={!!errors.NameDep}
          />
          {errors.NameDep && <ErrorText>{errors.NameDep.message}</ErrorText>}

          <StyledTextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            {...register("DescrpDetp", { required: "La description est requise" })}
            error={!!errors.DescrpDetp}
          />
          {errors.DescrpDetp && <ErrorText>{errors.DescrpDetp.message}</ErrorText>}

          <Divider sx={{ my: 4 }} />

          <DialogActions sx={{ justifyContent: "flex-end" }}>
            <StyledButton onClick={handleClose} variant="outlined" color="inherit">
              Annuler
            </StyledButton>
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                ml: 2,
                background: "linear-gradient(90deg, #1976d2, #42a5f5)",
              }}
            >
              {editingDepartment ? "Mettre à jour" : "Créer"}
            </StyledButton>
          </DialogActions>
        </form>
      </DialogContent>
    </StyledDialog>
  );
}

export default AddDepartement;
