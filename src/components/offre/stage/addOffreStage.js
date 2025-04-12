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
} from "@mui/material";
import { useForm } from "react-hook-form";

const AddOffreStage = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments.departments) || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (!open) reset(); // Reset form on close
  }, [open, reset]);

  const onSubmit = (data) => {
    const newOffre = {
      ...data,
      status: "true",
      date_publi: new Date().toISOString(),
    };
    dispatch(createOffreStage(newOffre));
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nouvelle offre de stage</DialogTitle>
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
        <FormControl
          fullWidth
          margin="dense"
          error={!!errors.departement_name}
        >
          <InputLabel>Département</InputLabel>
          <Select
            defaultValue=""
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
        >
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOffreStage;
