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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const AddOffreJob = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments.departments) || [];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      titre: "",
      description: "",
      date_limite: "",
      departement_name: "",
      requirements: [""],
      type: "job", // Ajout du champ type
    },
  });

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  // Reset formulaire à la fermeture
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data) => {
    const newOffre = {
      ...data,
      status: true,
      date_publi: new Date().toISOString(),
      requirements: data.requirements.filter((req) => req.trim() !== ""),
    };
    dispatch(createOffreJob(newOffre));
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nouvelle offre d'emploi</DialogTitle>
      <DialogContent>
        <TextField
          label="Titre"
          fullWidth
          margin="dense"
          {...register("titre", { required: "Le titre est requis" })}
          error={!!errors.titre}
          helperText={errors.titre?.message}
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
        />
        <TextField
          label="Date de clôture"
          type="date"
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          {...register("date_limite", { required: "La date de clôture est requise" })}
          error={!!errors.date_limite}
          helperText={errors.date_limite?.message}
        />
        <FormControl fullWidth margin="dense" error={!!errors.departement_name}>
          <InputLabel>Département</InputLabel>
          <Select
            {...register("departement_name", { required: "Le département est requis" })}
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
          </Select>
          <FormHelperText>{errors.departement_name?.message}</FormHelperText>
        </FormControl>
       
        <FormControl fullWidth margin="dense" error={!!errors.requirements}>
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
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
                      <IconButton
                        onClick={() => onChange([...value, ""])}
                      >
                        <AddCircleOutlineIcon sx={{ color: '#1e3a8a' }} />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
            )}
          />
          <FormHelperText>
            {errors.requirements?.message}
          </FormHelperText>
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
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOffreJob;