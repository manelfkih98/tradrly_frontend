import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOffreStage } from "../../../store/services/offreService";
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
} from "@mui/material";

const UpdateOffre = ({ open, handleClose, offre }) => {
  const dispatch = useDispatch();
  const departments =
    useSelector((state) => state.departments.departments) || [];

  // Initialisation avec un objet vide pour éviter les erreurs
  const [editedOffre, setEditedOffre] = useState({
    titre: "",
    description: "",
    date_limite: "",
    departement: "",
  });

  // Mettre à jour editedOffre quand l'offre change
  useEffect(() => {
    if (offre) {
      setEditedOffre({
        _id: offre._id || "",
        titre: offre.titre || "",
        description: offre.description || "",
        date_limite: offre.date_limite || "",
        departement: offre.departement?._id || "",
      });
    }
    dispatch(fetchDepartments());
  }, [dispatch, offre]);

  const handleChange = (e) => {
    setEditedOffre({ ...editedOffre, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!editedOffre._id) {
      console.error("Erreur: ID de l'offre manquant");
      return;
    }
    dispatch(updateOffreStage(editedOffre._id, editedOffre));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Modifier l'offre de stage</DialogTitle>
      <DialogContent>
        <TextField
          label="Titre"
          name="titre"
          fullWidth
          margin="dense"
          value={editedOffre.titre}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="dense"
          value={editedOffre.description}
          onChange={handleChange}
        />
        <TextField
          label="Date de clôture"
          name="date_limite"
          type="date"
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          value={
            editedOffre.date_limite
              ? dayjs(editedOffre.date_limite).format("YYYY-MM-DD")
              : ""
          }
          onChange={handleChange}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Département</InputLabel>
          <Select
            name="departement"
            value={editedOffre.departement || ""}
            onChange={handleChange}
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
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOffre;
