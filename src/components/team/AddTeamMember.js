import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTeam } from "../../store/services/teamService";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";

const AddTeamMember = ({ onMemberAdded }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    quote: "",
    linkedin: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

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
    try {
      await dispatch(addTeam(formData));
      setFormData({
        name: "",
        title: "",
        quote: "",
        linkedin: "",
        image: null,
      });
      setImagePreview(null);
      if (onMemberAdded) onMemberAdded();
    } catch (err) {
      console.error("❌ Erreur lors de l'ajout du membre :", err);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
        Ajouter un membre à l'équipe
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Stack spacing={3}>
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
            label="Lien LinkedIn"
            value={formData.linkedin}
            onChange={handleChange}
            fullWidth
          />

          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Importer une image
            <input
              name="image"
              type="file"
              hidden
              onChange={handleImageChange}
              accept="image/*"
              required
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

          <Box display="flex" justifyContent="space-between" gap={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Enregistrer
            </Button>
            <Button
              startIcon={<CancelIcon />}
              fullWidth
              color="secondary"
              onClick={onMemberAdded}
            >
              Annuler
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default AddTeamMember;
