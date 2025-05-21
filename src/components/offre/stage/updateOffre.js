import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOffreStage } from "../../../store/services/offreService";
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
  Box,
  IconButton,
  CircularProgress,
  Fade,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";

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

const UpdateOffre = ({ open, handleClose, offre }) => {
  const dispatch = useDispatch();
  const { departments, loading: depLoading } =
    useSelector((state) => state.departments) || {};

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
      departement: "",
      requirements: [""],
    },
  });

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (open && offre) {
      const departementId =
        offre.departement?._id ||
        (typeof offre.departement === "string" ? offre.departement : "");
      const isValidDepartement = departments.some(
        (dep) => dep._id === departementId
      );

      const initialValues = {
        titre: offre.titre || "",
        description: offre.description || "",
        date_limite:
          offre.date_limite && dayjs(offre.date_limite).isValid()
            ? dayjs(offre.date_limite).format("YYYY-MM-DD")
            : "",
        departement: isValidDepartement ? departementId : "",
        requirements:
          Array.isArray(offre.requirements) && offre.requirements.length > 0
            ? offre.requirements
            : [""],
      };

      reset(initialValues, { keepErrors: false, keepDirty: false });
    } else {
      reset(
        {
          titre: "",
          description: "",
          date_limite: "",
          departement: "",
          requirements: [""],
        },
        { keepErrors: false, keepDirty: false }
      );
    }
  }, [open, offre, departments, reset]);

  const onSubmit = async (data) => {
    if (!offre?._id) {
      console.error("Erreur: ID de l'offre manquant");
      return;
    }

    const updatedOffre = {
      ...data,
      requirements: data.requirements.filter((req) => req.trim() !== ""),
    };

    await dispatch(updateOffreStage(offre._id, updatedOffre));
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
        Modifier l’offre de stage
      </DialogTitle>
      <DialogContent
        sx={{
          pt: 2,
          mt: 1, // Added small space between DialogTitle and DialogContent
        }}
      >
        <Box component="form" noValidate autoComplete="off">
          {/* Titre */}
          <StyledTextField
            label="Titre de l'offre"
            fullWidth
            margin="dense"
            {...register("titre", {
              required: "Le titre est requis",
              minLength: { value: 3, message: "Minimum 3 caractères" },
            })}
            error={!!errors.titre}
            helperText={errors.titre?.message}
          />

          {/* Description */}
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

          {/* Exigences */}
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
                            const newValue = value.filter(
                              (_, i) => i !== index
                            );
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

          {/* Date de clôture */}
          <StyledTextField
            label="Date de clôture"
            type="date"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: offre?.date_limite
                ? dayjs(offre.date_limite).format("YYYY-MM-DD")
                : undefined,
            }}
            {...register("date_limite", {
              required: "La date de clôture est requise",
              validate: (value) => {
                const minDate = offre?.date_limite
                  ? dayjs(offre.date_limite).format("YYYY-MM-DD")
                  : null;
                return (
                  !minDate ||
                  value >= minDate ||
                  `La date ne peut pas être avant ${minDate}`
                );
              },
            })}
            error={!!errors.date_limite}
            helperText={errors.date_limite?.message}
          />

          {/* Département */}
          <StyledFormControl
            fullWidth
            margin="dense"
            error={!!errors.departement}
            disabled={depLoading || !departments?.length}
          >
            <InputLabel>Département</InputLabel>
            <Controller
              name="departement"
              control={control}
              rules={{ required: "Le département est requis" }}
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value || ""}
                  onChange={onChange}
                >
                  {depLoading ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} sx={{ mr: 1, color: "#1E3A8A" }} />
                      Chargement...
                    </MenuItem>
                  ) : departments?.length > 0 ? (
                    departments.map((dep) => (
                      <MenuItem key={dep._id} value={dep._id}>
                        {dep.NameDep}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Aucun département disponible</MenuItem>
                  )}
                </Select>
              )}
            />
            <FormHelperText>{errors.departement?.message}</FormHelperText>
          </StyledFormControl>
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

export default UpdateOffre;