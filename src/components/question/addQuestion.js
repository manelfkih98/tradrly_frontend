import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../store/services/departService"; // Action pour récupérer les départements
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Grid, Typography, CircularProgress, Box, Paper } from "@mui/material";
import { addQuestion } from "../../store/services/questionService"; // Action pour ajouter la question

const AddQuestion = ({ onClose }) => {
  const dispatch = useDispatch();

  const [questionText, setQuestionText] = useState("");
  const [reponse, setReponse] = useState("");
  const [propositions, setPropositions] = useState([]);
  const [departement_name, setDepartementName] = useState("");
  const [propositionInput, setPropositionInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { departments, loading: loadingDepartments, error: errorDepartments } = useSelector((state) => state.departments);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleAddProposition = () => {
    if (propositionInput && !propositions.includes(propositionInput)) {
      setPropositions((prevPropositions) => [...prevPropositions, propositionInput]);
      setPropositionInput(""); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let updatedPropositions = [...propositions];

    if (propositionInput.trim() && !updatedPropositions.includes(propositionInput.trim())) {
      updatedPropositions.push(propositionInput.trim());
    }

    const newQuestion = {
      questionText,
      reponse,
      propositions: updatedPropositions,
      departement_name,
    };

    dispatch(addQuestion(newQuestion));

    resetForm();
    onClose(false);
  };

  const resetForm = () => {
    setQuestionText("");
    setReponse("");
    setPropositions([]);
    setDepartementName("");
    setPropositionInput("");
  };

  return (
    <Box sx={{ padding: 4, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 600, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: 600, color: "#3f51b5" }}>
          Ajouter une Nouvelle Question
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Texte de la Question"
                variant="outlined"
                fullWidth
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                required
                sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Réponse"
                variant="outlined"
                fullWidth
                value={reponse}
                onChange={(e) => setReponse(e.target.value)}
                required
                sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Proposition"
                variant="outlined"
                fullWidth
                value={propositionInput}
                onChange={(e) => setPropositionInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddProposition();
                }}
                sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProposition}
                sx={{
                  mt: 1,
                  borderRadius: 1,
                  backgroundColor: "#3f51b5",
                  "&:hover": { backgroundColor: "#303f9f" },
                }}
              >
                Ajouter la Proposition
              </Button>
              <Box sx={{ mt: 2 }}>
                {propositions.map((prop, index) => (
                  <Typography key={index} variant="body2" color="textSecondary">
                    {prop}
                  </Typography>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Département</InputLabel>
                <Select
                  value={departement_name}
                  onChange={(e) => setDepartementName(e.target.value)}
                  label="Département"
                  required
                  disabled={loadingDepartments}
                  sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
                >
                  {loadingDepartments ? (
                    <MenuItem disabled>Chargement...</MenuItem>
                  ) : (
                    departments?.map((departement) => (
                      <MenuItem key={departement._id} value={departement.NameDep}>
                        {departement.NameDep}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{
                  borderRadius: 1,
                  py: 1.5,
                  backgroundColor: "#3f51b5",
                  "&:hover": { backgroundColor: "#303f9f" },
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Ajouter la Question"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddQuestion;
