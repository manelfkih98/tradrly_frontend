import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Paper,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
  Divider,
  Chip,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../store/services/departService";
import { addQuestion } from "../../store/services/questionService";
import { useForm } from "react-hook-form";

const AddQuestion = ({ onClose }) => {
  const dispatch = useDispatch();

  const [propositions, setPropositions] = useState([]);
  const [propositionInput, setPropositionInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { departments, loading: loadingDepartments } = useSelector(
    (state) => state.departments
  );

  // React Hook Form
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  // Add proposition to list
  const handleAddProposition = () => {
    if (propositionInput.trim() && !propositions.includes(propositionInput.trim())) {
      setPropositions((prev) => [...prev, propositionInput.trim()]);
      setPropositionInput("");
    }
  };

  // Remove a proposition from list
  const handleRemoveProposition = (index) => {
    const updated = [...propositions];
    updated.splice(index, 1);
    setPropositions(updated);
  };

  // Submit form
  const onSubmit = async (data) => {
    setLoading(true);

    let updatedProps = [...propositions];
    if (propositionInput.trim() && !updatedProps.includes(propositionInput.trim())) {
      updatedProps.push(propositionInput.trim());
    }

    const newQuestion = {
      questionText: data.questionText,
      reponse: data.reponse,
      propositions: updatedProps,
      departement_name: data.departement_name,
    };

    try {
      await dispatch(addQuestion(newQuestion));
      reset(); // Reset form after successful submission
      onClose(false); // Close the modal or handle success
    } catch (error) {
      console.error("Error adding question:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper elevation={6} sx={{ p: 6, width: "100%", borderRadius: 4, backgroundColor: "#ffffff" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#2c3e50", textAlign: "center", mb: 3 }}>
          Ajouter une Question
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Texte de la question"
                variant="outlined"
                fullWidth
                {...register("questionText", { required: "Ce champ est obligatoire" })}
                error={!!errors.questionText}
                helperText={errors.questionText?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Réponse correcte"
                variant="outlined"
                fullWidth
                {...register("reponse", { required: "Ce champ est obligatoire" })}
                error={!!errors.reponse}
                helperText={errors.reponse?.message}
              />
            </Grid>

            <Grid item xs={9}>
              <TextField
                label="Ajouter une proposition"
                variant="outlined"
                fullWidth
                value={propositionInput}
                onChange={(e) => setPropositionInput(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={handleAddProposition}
                startIcon={<AddCircleOutlineIcon />}
                fullWidth
                variant="outlined"
                sx={{
                  height: "100%",
                  color: "#1e88e5",
                  borderColor: "#1e88e5",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                    borderColor: "#1565c0",
                  },
                }}
              >
                Ajouter
              </Button>
            </Grid>

            {propositions.length > 0 && (
              <Grid item xs={12}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {propositions.map((prop, idx) => (
                    <Chip
                      key={idx}
                      label={prop}
                      onDelete={() => handleRemoveProposition(idx)}
                      deleteIcon={<RemoveCircleOutlineIcon />}
                      sx={{ backgroundColor: "#f0f0f0" }}
                    />
                  ))}
                </Box>
              </Grid>
            )}

            {/* Dropdown for Departments */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Département</InputLabel>
                <Select
                  {...register("departement_name", { required: "Veuillez sélectionner un département" })}
                  defaultValue=""
                  error={!!errors.departement_name}
                >
                  {loadingDepartments ? (
                    <MenuItem disabled>Chargement...</MenuItem>
                  ) : (
                    departments?.map((dep) => (
                      <MenuItem key={dep._id} value={dep.NameDep}>
                        {dep.NameDep}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {errors.departement_name && (
                  <Typography variant="body2" color="error">{errors.departement_name.message}</Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  backgroundColor: "#2e7d32",
                  color: "white",
                  fontWeight: "bold",
                  py: 1.5,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#1b5e20",
                  },
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Enregistrer la Question"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddQuestion;
