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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

const UpdateOffre = ({ open, handleClose, offre }) => {
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
      departement: "",
      requirements: [""],
    },
  });

  // Charger les départements
  useEffect(() => {
    console.log("Chargement des départements"); // Débogage
    dispatch(fetchDepartments());
  }, [dispatch]);

  // Initialiser le formulaire avec les données de l'offre
  useEffect(() => {
    console.log("Initialisation - Open:", open, "Offre:", offre, "Départements:", departments); // Débogage
    if (open && offre) {
      // Vérifier si offre.departement correspond à un _id dans departments
      const departementId = offre.departement?._id || (typeof offre.departement === "string" ? offre.departement : "");
      const isValidDepartement = departments.some((dep) => dep._id === departementId);
      console.log("Département initial:", departementId, "Valide:", isValidDepartement); // Débogage

      const initialValues = {
        titre: offre.titre || "",
        description: offre.description || "",
        date_limite:
          offre.date_limite && dayjs(offre.date_limite).isValid()
            ? dayjs(offre.date_limite).format("YYYY-MM-DD")
            : "",
        departement: isValidDepartement ? departementId : "",
        requirements: Array.isArray(offre.requirements) && offre.requirements.length > 0 ? offre.requirements : [""],
      };
      console.log("Valeurs initiales:", initialValues); // Débogage
      reset(initialValues, { keepErrors: false, keepDirty: false });
    } else {
      console.log("Réinitialisation - Aucun offre ou dialog fermé"); // Débogage
      reset({
        titre: "",
        description: "",
        date_limite: "",
        departement: "",
        requirements: [""],
      }, { keepErrors: false, keepDirty: false });
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
    console.log("Données soumises:", updatedOffre); // Débogage
    await dispatch(updateOffreStage(offre._id, updatedOffre));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: "#1e3a8a", fontWeight: "bold", textAlign: "center" }}>
        Modifier l’offre de stage
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box component="form" noValidate autoComplete="off">
          {/* Title Field */}
          <TextField
            label="Titre de l'offre"
            fullWidth
            margin="dense"
            {...register("titre", {
              required: "Le titre est requis",
              minLength: { value: 3, message: "Minimum 3 caractères" },
            })}
            error={!!errors.titre}
            helperText={errors.titre?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: "#d4af37" },
                "&.Mui-focused fieldset": { borderColor: "#1e3a8a" },
              },
            }}
          />
          {/* Description Field */}
          <TextField
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: "#d4af37" },
                "&.Mui-focused fieldset": { borderColor: "#1e3a8a" },
              },
            }}
          />
          {/* Requirements Field */}
          <FormControl fullWidth margin="dense" error={!!errors.requirements}>
            <InputLabel shrink sx={{ "&.Mui-focused": { color: "#1e3a8a" } }}>
              Exigences
            </InputLabel>
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
                  {console.log("Requirements value:", value)} 
                  {value.map((req, index) => (
                    <Box
                      key={`req-${uuidv4()}`}
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
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&:hover fieldset": { borderColor: "#d4af37" },
                            "&.Mui-focused fieldset": { borderColor: "#1e3a8a" },
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
                          <RemoveCircleOutlineIcon sx={{ color: "#1e3a8a" }} />
                        </IconButton>
                      )}
                      {index === value.length - 1 && (
                        <IconButton onClick={() => onChange([...value, ""])}>
                          <AddCircleOutlineIcon sx={{ color: "#1e3a8a" }} />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            />
            <FormHelperText>{errors.requirements?.message}</FormHelperText>
          </FormControl>
          {/* Closing Date Field */}
          <TextField
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: "#d4af37" },
                "&.Mui-focused fieldset": { borderColor: "#1e3a8a" },
              },
            }}
          />
          {/* Department Field */}
          <FormControl
            fullWidth
            margin="dense"
            error={!!errors.departement}
            disabled={depLoading || !departments?.length}
          >
            <InputLabel sx={{ "&.Mui-focused": { color: "#1e3a8a" } }}>
              Département
            </InputLabel>
            <Controller
              name="departement"
              control={control}
              rules={{ required: "Le département est requis" }}
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value || ""}
                  onChange={onChange}
                  sx={{
                    borderRadius: 2,
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#d4af37" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1e3a8a" },
                  }}
                >
                  {depLoading ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
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
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={handleClose}
          disabled={isSubmitting}
          sx={{
            color: "#1e3a8a",
            textTransform: "none",
            "&:hover": { color: "#d4af37" },
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={isSubmitting}
          sx={{
            bgcolor: "#1e3a8a",
            textTransform: "none",
            borderRadius: 20,
            px: 4,
            "&:hover": { bgcolor: "#d4af37", color: "#1e3a8a" },
          }}
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOffre;