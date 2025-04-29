import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Paper,
  IconButton,
  CircularProgress,
  Divider,
  Chip,
  FormControl,
  FormHelperText,
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
  const [selectedDep, setSelectedDep] = useState(""); // État pour le bouton sélectionné

  const { departments, loading: loadingDepartments } = useSelector(
    (state) => state.departments
  );

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  // Add proposition to list
  const handleAddProposition = () => {
    if (
      propositionInput.trim() &&
      !propositions.includes(propositionInput.trim())
    ) {
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

  // Gérer la sélection d'un bouton
  const handleButtonClick = (depName) => {
    setSelectedDep(depName);
    setValue("departement_name", depName, { shouldValidate: true });
  };

  // Submit form
  const onSubmit = async (data) => {
    setLoading(true);

    let updatedProps = [...propositions];
    if (
      propositionInput.trim() &&
      !updatedProps.includes(propositionInput.trim())
    ) {
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
    <Box
      sx={{
        p: 4,
       
      }}
    >
      <Paper>
       
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#2c3e50",
            textAlign: "center",
            mb: 3,
          }}
        >
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
                {...register("questionText", {
                  required: "Ce champ est obligatoire",
                })}
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
                  color: "#1e3a8a",
                  borderColor: "#1e3a8a",
                  "&:hover": {
                    backgroundColor: "#e8f0fe",
                    borderColor: "#16307a",
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

            {/* Boutons stylisés pour les départements */}
            <Grid item xs={12}>
              <FormControl
                fullWidth
                error={!!errors.departement_name}
                required
              >
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#2c3e50", mb: 1, fontWeight: 500 }}
                >
                  Département
                </Typography>
                <Grid container spacing={1} sx={{ overflowX: "auto" }}>
                  {loadingDepartments ? (
                    <Grid item xs={12}>
                      <Typography>Chargement...</Typography>
                    </Grid>
                  ) : (
                    <>
                      {departments.map((dep) => (
                        <Grid item xs={6} sm={4} md={3} key={dep._id}>
                          <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => handleButtonClick(dep.NameDep)}
                            sx={{
                              borderColor: "#1e3a8a",
                              color: selectedDep === dep.NameDep ? "white" : "#1e3a8a",
                              bgcolor: selectedDep === dep.NameDep ? "#1e3a8a" : "white",
                              borderRadius: 2,
                              textTransform: "none",
                              transition: "all 0.3s",
                              "&:hover": {
                                bgcolor:
                                  selectedDep === dep.NameDep
                                    ? "#16307a"
                                    : "#e8f0fe",
                              },
                            }}
                            aria-selected={selectedDep === dep.NameDep}
                            aria-label={`Sélectionner le département ${dep.NameDep}`}
                          >
                            {dep.NameDep}
                          </Button>
                        </Grid>
                      ))}
                      <Grid item xs={6} sm={4} md={3}>
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => handleButtonClick("")}
                          sx={{
                            borderColor: "#1e3a8a",
                            color: selectedDep === "" ? "white" : "#1e3a8a",
                            bgcolor: selectedDep === "" ? "#1e3a8a" : "white",
                            borderRadius: 2,
                            textTransform: "none",
                            transition: "all 0.3s",
                            "&:hover": {
                              bgcolor: selectedDep === "" ? "#16307a" : "#e8f0fe",
                            },
                          }}
                          aria-selected={selectedDep === ""}
                          aria-label="Sélectionner aucun département"
                        >
                          Non spécifié
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
                <input
                  type="hidden"
                  {...register("departement_name", {
                    required: "Veuillez sélectionner un département",
                  })}
                  value={selectedDep}
                />
                {errors.departement_name && (
                  <FormHelperText>
                    {errors.departement_name.message}
                  </FormHelperText>
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
                  backgroundColor: "#1e3a8a",
                  color: "white",
                  fontWeight: "bold",
                  py: 1.5,
                  borderRadius: 2,
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  "Enregistrer la Question"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddQuestion;