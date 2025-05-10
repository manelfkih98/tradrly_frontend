import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOffreEmploi } from "../../../store/services/offreService";
import { fetchDepartments } from "../../../store/services/departService";
import dayjs from "dayjs";
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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { v4 as uuidv4 } from 'uuid';

const UpdateOffreEmploi = ({ open, handleClose, offre }) => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments.departments) || [];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      titre: "",
      description: "",
      date_limite: "",
      departement: "",
      type: "job",
      requirements: [""],
    },
  });

  // Initialiser le formulaire avec les données de l'offre
  useEffect(() => {
    console.log("Initialisation - Open:", open, "Offre:", offre, "Départements:", departments); // Débogage
    if (open && offre) {
      // Vérifier si offre.departement correspond à un _id dans departments
      const departementId = offre.departement?._id || (typeof offre.departement === 'string' ? offre.departement : "");
      const isValidDepartement = departments.some(dep => dep._id === departementId);
      console.log("Département initial:", departementId, "Valide:", isValidDepartement); // Débogage

      const initialValues = {
        titre: offre.titre || "",
        description: offre.description || "",
        date_limite:
          offre.date_limite && dayjs(offre.date_limite).isValid()
            ? dayjs(offre.date_limite).format("YYYY-MM-DD")
            : "",
        departement: isValidDepartement ? departementId : "",
        type: offre.type || "job",
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
        type: "job",
        requirements: [""],
      }, { keepErrors: false, keepDirty: false });
    }
  }, [open, offre, departments, reset]);

  // Charger les départements
  useEffect(() => {
    console.log("Chargement des départements"); // Débogage
    dispatch(fetchDepartments());
  }, [dispatch]);

  const onSubmit = (data) => {
    if (!offre?._id) {
      console.error("Erreur: ID de l'offre manquant");
      return;
    }
    const updatedOffre = {
      ...data,
      requirements: data.requirements.filter((req) => req.trim() !== ""),
    };
    console.log("Données soumises:", updatedOffre); // Débogage
    dispatch(updateOffreEmploi(offre._id, updatedOffre));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ color: '#1e3a8a', fontWeight: 'bold' }}>
        Modifier l'offre
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Titre"
          fullWidth
          margin="dense"
          {...register("titre", { required: "Le titre est requis" })}
          error={!!errors.titre}
          helperText={errors.titre?.message}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': { borderColor: '#d4af37' },
              '&.Mui-focused fieldset': { borderColor: '#1e3a8a' },
            },
          }}
        />
        <TextField
          label="Description"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          {...register("description", { required: "La description est requise" })}
          error={!!errors.description}
          helperText={errors.description?.message}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': { borderColor: '#d4af37' },
              '&.Mui-focused fieldset': { borderColor: '#1e3a8a' },
            },
          }}
        />
     <TextField
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#d4af37" },
                    "&.Mui-focused fieldset": { borderColor: "#1e3a8a" },
                  },
                }}
              />
        <FormControl fullWidth margin="dense" error={!!errors.departement}>
          <InputLabel sx={{ '&.Mui-focused': { color: '#1e3a8a' } }}>
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
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#d4af37' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1e3a8a' },
                }}
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
              </Select>
            )}
          />
          <FormHelperText>{errors.departement?.message}</FormHelperText>
        </FormControl>
       
        <FormControl fullWidth margin="dense" error={!!errors.requirements}>
          <InputLabel shrink sx={{ '&.Mui-focused': { color: '#1e3a8a' } }}>
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
                {console.log("Requirements value:", value)} {/* Débogage */}
                {value.map((req, index) => (
                  <Box key={`req-${uuidv4()}`} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': { borderColor: '#d4af37' },
                          '&.Mui-focused fieldset': { borderColor: '#1e3a8a' },
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
                        <RemoveCircleOutlineIcon sx={{ color: '#1e3a8a' }} />
                      </IconButton>
                    )}
                    {index === value.length - 1 && (
                      <IconButton onClick={() => onChange([...value, ""])}>
                        <AddCircleOutlineIcon sx={{ color: '#1e3a8a' }} />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
            )}
          />
          <FormHelperText>{errors.requirements?.message}</FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            color: '#1e3a8a',
            '&:hover': { color: '#d4af37' },
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          sx={{
            bgcolor: '#1e3a8a',
            '&:hover': { bgcolor: '#d4af37', color: '#1e3a8a' },
          }}
        >
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOffreEmploi;