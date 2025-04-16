import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateTeam } from "../../store/services/teamService";

const EditTeamMember = ({ selectedTeam, onCancel, onMemberUpdated }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    quote: "",
    linkedin: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (selectedTeam) {
      setFormData({
        name: selectedTeam.name || "",
        title: selectedTeam.title || "",
        quote: selectedTeam.quote || "",
        linkedin: selectedTeam.linkedin || "",
        image: null,
      });
      setImagePreview(selectedTeam.image || null);
    }
  }, [selectedTeam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("title", formData.title);
    data.append("quote", formData.quote);
    data.append("linkedin", formData.linkedin);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await dispatch(updateTeam(selectedTeam._id, data));
      onMemberUpdated(); // Rafraîchit la liste ou ferme le modal
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" mb={2}>
        Modifier un membre
      </Typography>
      <Stack spacing={2}>
        <TextField
          name="name"
          label="Nom"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="title"
          label="Poste"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="quote"
          label="Citation"
          value={formData.quote}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="linkedin"
          label="LinkedIn"
          value={formData.linkedin}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button variant="outlined" component="label">
          Changer l’image
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{ width: "120px", borderRadius: "8px" }}
          />
        )}
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" color="primary">
            Mettre à jour
          </Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Annuler
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EditTeamMember;
