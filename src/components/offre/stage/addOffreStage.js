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
      requirements: data.requirements.filter((req) => req.trim() !== ""), // Filter out empty requirements
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
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#1976d2",
          py: 1,
          borderRadius: "8px 8px 0 0",
        }}
      >
        Nouvelle Offre de Stage
      </DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            {/* Title Field */}
            <Grid item xs={12}>
              <TextField
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s",
                    "&:hover": { boxShadow: "0 0 8px rgba(25, 118, 210, 0.2)" },
                  },
                }}
              />
            </Grid>
            {/* Description Field */}
            <Grid item xs={12}>
              <TextField
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s",
                    "&:hover": { boxShadow: "0 0 8px rgba(25, 118, 210, 0.2)" },
                  },
                }}
              />
            </Grid>
            {/* Requirements Field */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.requirements}>
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
                          <TextField
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
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                transition: "all 0.3s",
                                "&:hover": {
                                  boxShadow: "0 0 8px rgba(25, 118, 210, 0.2)",
                                },
                              },
                            }}
                          />
                          {value.length > 1 && (
                            <IconButton
                              onClick={() => {
                                const newValue = value.filter((_, i) => i !== index);
                                onChange(newValue);
                              }}
                            >
                              <RemoveCircleOutlineIcon sx={{ color: "#1976d2" }} />
                            </IconButton>
                          )}
                          {index === value.length - 1 && (
                            <IconButton
                              onClick={() => onChange([...value, ""])}
                            >
                              <AddCircleOutlineIcon sx={{ color: "#1976d2" }} />
                            </IconButton>
                          )}
                        </Box>
                      ))}
                    </Box>
                  )}
                />
                <FormHelperText>{errors.requirements?.message}</FormHelperText>
              </FormControl>
            </Grid>
            {/* Closing Date Field */}
            <Grid item xs={12} sm={6}>
              <TextField
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s",
                    "&:hover": { boxShadow: "0 0 8px rgba(25, 118, 210, 0.2)" },
                  },
                }}
              />
            </Grid>
            {/* Department Field */}
            <Grid item xs={12} sm={6}>
              <FormControl
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
                  sx={{ borderRadius: 2 }}
                >
                  {depLoading ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
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
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="inherit"
          disabled={isSubmitting}
          sx={{
            borderRadius: 20,
            textTransform: "none",
            px: 3,
            transition: "all 0.3s",
            "&:hover": { bgcolor: "grey.100" },
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          sx={{
            borderRadius: 20,
            textTransform: "none",
            px: 4,
            transition: "all 0.3s",
            "&:hover": { boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)" },
          }}
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOffreStage;