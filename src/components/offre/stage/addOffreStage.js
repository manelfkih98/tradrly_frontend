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
  Typography,
  Box,
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
    if (!open) reset();
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
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        Ajouter une nouvelle offre de stage
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Titre de l'offre"
                fullWidth
                {...register("titre", { required: "Le titre est requis" })}
                error={!!errors.titre}
                helperText={errors.titre?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                {...register("description", { required: "La description est requise" })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Date de clôture"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("date_limite", { required: "La date de clôture est requise" })}
                error={!!errors.date_limite}
                helperText={errors.date_limite?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={!!errors.departement_name}
              >
                <InputLabel>Département</InputLabel>
                <Select
                  defaultValue=""
                  {...register("departement_name", {
                    required: "Le département est requis",
                  })}
                >
                  {departments.length > 0 ? (
                    departments.map((dep) => (
                      <MenuItem key={dep._id} value={dep.NameDep}>
                        {dep.NameDep}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Aucun département</MenuItem>
                  )}
                </Select>
                <FormHelperText>
                  {errors.departement_name?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Annuler
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOffreStage;
