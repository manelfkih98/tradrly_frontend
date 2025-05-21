import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOffreStage } from "../../../store/services/offreService";
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
  Grid,
  Box,
  CircularProgress,
  Fade,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { styled } from "@mui/material/styles";

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

const AddOffreStage = ({ open, handleClose }) => {
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
    },
  });

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const onSubmit = async (data) => {
    const newOffre = {
      ...data,
      status: true,
      date_publi: new Date().toISOString(),
      requirements: data.requirements.filter((req) => req.trim() !== ""),
    };
    await dispatch(createOffreStage(newOffre));
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
        Nouvelle Offre de Stage
      </DialogTitle>
      <DialogContent
        sx={{
         
          mt: 1, // Added small space between DialogTitle and DialogContent
        }}
      >
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            {/* Title Field */}
            <Grid item xs={12}>
              <StyledTextField
                label="Titre de l'offre"
                fullWidth
                variant="outlined"
                {...register("titre", {
                  required: "Le titre est requis",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 caractères",
                  },
                })}
                error={!!errors.titre}
                helperText={errors.titre?.message}
              />
            </Grid>
            {/* Description Field */}
            <Grid item xs={12}>
              <StyledTextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                {...register("description", {
                  required: "La description est requise",
                  minLength: {
                    value: 10,
                    message: "Minimum 10 caractères",
                  },
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            {/* Requirements Field */}
            <Grid item xs={12}>
              <StyledFormControl fullWidth error={!!errors.requirements}>
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
                          key={index}
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
                            error={!!errors.requirements?.[index]}
                            helperText={errors.requirements?.[index]?.message}
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
                            <StyledIconButton
                              onClick={() => onChange([...value, ""])}
                            >
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
            </Grid>
            {/* Closing Date Field */}
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Date de clôture"
                type="date"
                fullWidth
                variant="outlined"
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
            </Grid>
            {/* Department Field */}
            <Grid item xs={12} sm={6}>
              <StyledFormControl
                fullWidth
                variant="outlined"
                error={!!errors.departement_name}
                disabled={depLoading || !departments?.length}
              >
                <InputLabel>Département</InputLabel>
                <Select
                  {...register("departement_name", {
                    required: "Le département est requis",
                  })}
                >
                  {depLoading ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} sx={{ mr: 1, color: "#1E3A8A" }} />
                      Chargement...
                    </MenuItem>
                  ) : departments?.length > 0 ? (
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
            </Grid>
          </Grid>
        </Box>
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
          Enregistrer
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddOffreStage;