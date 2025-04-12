import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { fetchDepartments } from "../../store/services/departService";
function AddSolution({ open, handleClose, onSubmitSolution, editingSolution }) {
  
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.departments);

  const {
    register,
    handleSubmit: onSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (editingSolution) {
      console.log(editingSolution);
      setValue("name_project", editingSolution.name_project);
      setValue("description_project", editingSolution.description_project);
      setValue(
        "departement_name",
        editingSolution.departementId?.NameDep || ""
      );
    } else {
      reset();
    }
    dispatch(fetchDepartments());
  }, [editingSolution, setValue, reset, dispatch]);

  useEffect(() => {
    if (!open) {
      reset(); 
    }
  }, [open, reset]);

  const handleFormSubmit = (data) => {
    onSubmitSolution(data);
    console.log(data);
    reset();
    handleClose();
  };
  


  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {editingSolution ? "Modifier le Projet" : "Ajouter un Projet"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit(handleFormSubmit)}>
          <TextField
            label="Nom du Projet"
            variant="standard"
            fullWidth
            {...register("name_project", {
              required: "Le nom du projet est requis",
            })}
            error={!!errors.name_project}
            helperText={errors.name_project?.message}
            sx={{ marginBottom: 3 }}
          />

          <TextField
            label="Description"
            variant="standard"
            fullWidth
            multiline
            rows={3}
            {...register("description_project", {
              required: "La description est requise",
            })}
            error={!!errors.description_project}
            helperText={errors.description_project?.message}
            sx={{ marginBottom: 3 }}
          />
          {!editingSolution && (
            <TextField
              label="Département"
              variant="standard"
              select
              fullWidth
              {...register("departement_name", {
                required: "Le département est requis",
              })}
              error={!!errors.departement_name}
              helperText={errors.departement_name?.message}
              sx={{ marginBottom: 2 }}
            >
              {departments.map((dep) => (
                <MenuItem key={dep._id} value={dep.NameDep}>
                  {dep.NameDep}
                </MenuItem>
              ))}
            </TextField>
          )}

          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Annuler
            </Button>
            <Button type="submit" color="primary">
              {editingSolution ? "Modifier" : "Ajouter"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddSolution;
