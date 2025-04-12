import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTeam } from "../../store/services/teamService";

const AddTeamMember = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    quote: "",
    linkedin: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const jsonData = {
      name: formData.name,
      title: formData.title,
      quote: formData.quote,
      linkedin: formData.linkedin,
      // PAS D’IMAGE ICI
    };
  
    try {
      await dispatch(addTeam(jsonData));
      alert("✅ Membre ajouté !");
      setFormData({
        name: "",
        title: "",
        quote: "",
        linkedin: "",
        image: null,
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };
  

  return (
    <Paper elevation={3} sx={{ p: 4, m: 4 }}>
      <Typography variant="h5" mb={3}>
        Add Team Member
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Stack spacing={2}>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="quote"
            label="Quote"
            value={formData.quote}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="linkedin"
            label="LinkedIn URL"
            value={formData.linkedin}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="outlined" component="label">
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Add Member
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default AddTeamMember;
