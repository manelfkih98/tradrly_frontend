import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function EditSolution({ open, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name_project: "",
    description_project: "",
    image: "",
    date_creation: "",
    departementId: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name_project: initialData.name_project || "",
        description_project: initialData.description_project || "",
        image: initialData.image || "",
        date_creation: initialData.date_creation ? initialData.date_creation.split("T")[0] : "",
        departementId: initialData.departementId?._id || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Validation simple (exemple)
    if (!formData.name_project || !formData.date_creation) {
      alert("Veuillez remplir les champs obligatoires.");
      return;
    }

    // Envoyer les données au parent avec l'ID
    onSubmit(initialData._id, formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Modifier un Projet</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Nom du projet"
          name="name_project"
          value={formData.name_project}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description_project"
          value={formData.description_project}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="URL de l'image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Date de création"
          name="date_creation"
          type="date"
          value={formData.date_creation}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          fullWidth
          label="Département ID"
          name="departementId"
          value={formData.departementId}
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#b91c1c" }}>
          Annuler
        </Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#1e3a8a" }}>
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditSolution;