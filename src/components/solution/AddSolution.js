import React, { useEffect, useState } from "react";
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
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (editingSolution) {
      setValue("name_project", editingSolution.name_project || "");
      setValue("description_project", editingSolution.description_project || "");
      setValue("date_creation", editingSolution.date_creation?.substring(0, 10)); // format yyyy-mm-dd
      setValue("departement_name", editingSolution.departementId?.NameDep || "");
    } else {
      reset();
    }
  }, [editingSolution, setValue, reset]);

  useEffect(() => {
    if (!open) {
      reset();
      setSelectedFile(null);
    }
  }, [open, reset]);

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("name_project", data.name_project);
    formData.append("date_creation", data.date_creation);
    formData.append("departement_name", data.departement_name);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    onSubmitSolution(formData); // envoi vers l'API
    reset();
    setSelectedFile(null);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {editingSolution ? "Modifier le Projet" : "Ajouter un Projet"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} encType="multipart/form-data">
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
            label="Date de création"
            type="date"
            variant="standard"
            fullWidth
            {...register("date_creation", {
              required: "La date de création est requise",
            })}
            InputLabelProps={{ shrink: true }}
            error={!!errors.date_creation}
            helperText={errors.date_creation?.message}
            sx={{ marginBottom: 3 }}
          />

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
            sx={{ marginBottom: 3 }}
          >
            {departments.map((dep) => (
              <MenuItem key={dep._id} value={dep.NameDep}>
                {dep.NameDep}
              </MenuItem>
            ))}
          </TextField>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            style={{ marginBottom: 20 }}
          />

          <DialogActions sx={{ marginTop: 2 }}>
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
