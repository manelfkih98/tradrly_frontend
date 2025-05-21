import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOffreJob } from "../../../store/services/offreService";
import { fetchDepartments } from "../../../store/services/departService";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  IconButton,
  Box,
  CircularProgress,
  Fade,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
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

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
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

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "#1E3A8A",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#914091",
    backgroundColor: "#EDE9FE",
  },
}));

const AddOffreJob = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { departments, loading: depLoading } = useSelector((state) => state.departments) || {};

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      titre: "",
      description: "",
      date_limite: "",
      departement_name: "",
      requirements: [""],
      type: "job",
    },
  });

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data) => {
    const newOffre = {
      ...data,
      status: true,
      date_publi: new Date().toISOString(),
      requirements: data.requirements.filter((req) => req.trim() !== ""),
    };
    const response = await dispatch(createOffreJob(newOffre));
   
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#F8FAFC",
          border: "1px solid #E5E7EB",
          borderRadius: 3,
        },
      }}
    >
      <style>
        {`
          .swal-confirm-button {
            background-color: #914091 !important;
            color: #FFFFFF !important;
            border-radius: 8px !important;
            transition: all 0.3s ease !important;
          }
          .swal-confirm-button:hover {
            background-color: #7E3A8A !important;
            boxShadow: 0 4px 8px rgba(145, 64, 145, 0.3) !important;
            transform: translateY(-2px) !important;
          }
        `}
      </style>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#1E3A8A",
          backgroundColor: "#EDE9FE",
          py: 2,
          borderRadius: "8px 8px 0 0",
        }}
      >
        Nouvelle offre d'emploi
      </DialogTitle>
      <DialogContent sx={{ mt: 1 }}>
        <StyledTextField
          label="Titre"
          fullWidth
          margin="dense"
          {...register("titre", {
            required: "Le titre est requis",
            minLength: { value: 3, message: "Minimum 3 caractères" },
          })}
          error={!!errors.titre}
          helperText={errors.titre?.message}
        />
        <StyledTextField
          label="Description"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          {...register("description", {
            required: "La description est requise",
            minLength: { value: 10, message: "Minimum 10 caractères" },
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <StyledTextField
          label="Date de clôture"
          type="date"
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          {...register("date_limite", {
            required: "La date de clôture est requise",
            validate: (value) =>
              value >= new Date().toISOString().split("T")[0] ||
              "La date doit être aujourd'hui ou dans le futur",
          })}
          error={!!errors.date_limite}
          helperText={errors.date_limite?.message}
        />
        <StyledFormControl
          fullWidth
          margin="dense"
          error={!!errors.departement_name}
          disabled={depLoading || !departments?.length}
        >
          <InputLabel>Département</InputLabel>
          <Select
            {...register("departement_name", { required: "Le département est requis" })}
          >
            {depLoading ? (
              <MenuItem disabled>
                <CircularProgress size={20} sx={{ mr: 1, color: "#1E3A8A" }} />
                Chargement...
              </MenuItem>
            ) : departments.length > 0 ? (
              departments.map((dep) => (
                <MenuItem key={dep._id} value={dep.NameDep}>
                  {dep.NameDep}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Aucun département disponible</MenuItem>
            )}
          </Select>
          <FormHelperText>{errors.departement_name?.message}</FormHelperText>
        </StyledFormControl>
        <StyledFormControl fullWidth margin="dense" error={!!errors.requirements}>
          <InputLabel shrink>Exigences</InputLabel>
          <Controller
            name="requirements"
            control={control}
            rules={{
              validate: {
                notEmpty: (value) =>
                  value.some((req) => req.trim() !== "") ||
                  "Au moins une exigence est requise",
              },
            }}
            render={({ field: { value, onChange } }) => (
              <Box sx={{ mt: 2 }}>
                {value.map((req, index) => (
                  <Box
                    key={`req-${index}`}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <StyledTextField
                      fullWidth
                      label={`Exigence ${index + 1}`}
                      value={req}
                      onChange={(e) => {
                        const newValue = [...value];
                        newValue[index] = e.target.value;
                        onChange(newValue);
                      }}
                    />
                    {value.length > 1 && (
                      <StyledIconButton
                        onClick={() => {
                          const newValue = value.filter((_, i) => i !== index);
                          onChange(newValue);
                        }}
                      >
                        <RemoveCircleOutlineIcon />
                      </StyledIconButton>
                    )}
                    {index === value.length - 1 && (
                      <StyledIconButton onClick={() => onChange([...value, ""])}>
                        <AddCircleOutlineIcon />
                      </StyledIconButton>
                    )}
                  </Box>
                ))}
              </Box>
            )}
          />
          <FormHelperText>{errors.requirements?.message}</FormHelperText>
        </StyledFormControl>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
        <StyledButton
          onClick={handleClose}
          variant="outlined"
          disabled={isSubmitting}
          sx={{
            borderColor: "#1E3A8A",
            color: "#1E3A8A",
            "&:hover": {
              backgroundColor: "#EDE9FE",
              borderColor: "#914091",
              color: "#914091",
            },
          }}
        >
          Annuler
        </StyledButton>
        <StyledButton
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} sx={{ color: "#FFFFFF" }} /> : null}
          sx={{
            backgroundColor: "#914091",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#7E3A8A",
              boxShadow: "0 4px 8px rgba(145, 64, 145, 0.3)",
            },
          }}
        >
          Ajouter
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddOffreJob;