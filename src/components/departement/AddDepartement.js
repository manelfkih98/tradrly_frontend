import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from 'react-toastify';


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
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  color: "#EF4444", // Rouge subtil pour les erreurs, peut être changé à #914091 si préféré
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
    toast.success(editingDepartment ? "Département mis à jour avec succès!" : "Département créé avec succès!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    reset();
    handleClose();
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <StyledTitle>
        {editingDepartment ? "Modifier le Département" : "Ajouter un Département"}
      </StyledTitle>

      <DialogContent sx={{ px: { xs: 3, sm: 4 }, pt: { xs: 2, sm: 3 } }}>
        <Typography
          variant="body2"
          sx={{ mt: 2, mb: 1, color: "#1E3A8A", fontStyle: "italic", fontSize: "0.9rem" }}
        >
          {editingDepartment
            ? "Modifiez les informations pour mettre à jour le département."
            : "Remplissez le formulaire pour ajouter un nouveau département."}
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
              {editingDepartment ? "Mettre à jour" : "Créer"}
            </StyledButton>
          </DialogActions>
        </form>
      </DialogContent>
    </StyledDialog>
  );
}

export default AddDepartement;