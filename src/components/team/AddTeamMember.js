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

const AddTeamMember = ({ onMemberAdded  }) => {
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

  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file)); 
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

   /* const data = new FormData();
    data.append("name", formData.name);
    data.append("title", formData.title);
    data.append("quote", formData.quote);
    data.append("linkedin", formData.linkedin);
    data.append("image", formData.image); 
    console.log("Form data:", data); // Debugging line
    console.log("Form data:", formData); // Debugging line*/

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
            name="image"
              type="file"
              hidden
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </Button>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" width={150} height="auto" />
          )}

          <Button variant="contained" color="primary" type="submit">
            Add Member
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default AddTeamMember;
