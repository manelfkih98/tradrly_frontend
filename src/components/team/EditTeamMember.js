import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
  Divider,
  Avatar,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ImageIcon from "@mui/icons-material/Image";
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
      onMemberUpdated();
    } catch (err) {
      console.error("❌ Erreur lors de la mise à jour :", err);
    }
  };

  return (
    <Paper  sx={{ p: 4, borderRadius: 3, backgroundColor: "#fdfdfd" }}>
      <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
        Modifier un membre
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={5}>
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
            label="Profil LinkedIn"
            value={formData.linkedin}
            onChange={handleChange}
            fullWidth
            required
          />

          <Button
            variant="outlined"
            component="label"
            startIcon={<ImageIcon />}
          >
            Changer l’image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {imagePreview && (
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src={imagePreview}
                alt="Preview"
                sx={{ width: 80, height: 80, borderRadius: 2 }}
              />
             
            </Box>
          )}

          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              fullWidth
            >
              Sauvegarder
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onCancel}
              startIcon={<CancelIcon />}
              fullWidth
            >
              Annuler
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default EditTeamMember;
