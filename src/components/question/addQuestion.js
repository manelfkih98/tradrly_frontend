import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../store/services/departService"; // Action pour récupérer les départements
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Grid, Typography, CircularProgress, Box } from "@mui/material";
import { addQuestion, fetchQuestion } from "../../store/services/questionService"; // Action pour ajouter la question

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
      propositions: updatedPropositions, // Utiliser les propositions mises à jour
      departement_name,
    };
  
    dispatch(addQuestion(newQuestion));
  
    console.log(newQuestion);
  
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
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Ajouter une nouvelle question
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Texte de la question"
              variant="outlined"
              fullWidth
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
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
            />
            <Button variant="contained" color="primary" onClick={handleAddProposition}>
              Ajouter la proposition
            </Button>
            <div>
              {propositions.map((prop, index) => (
                <Typography key={index} variant="body2" color="textSecondary">
                  {prop}
                </Typography>
              ))}
            </div>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Département</InputLabel>
              <Select
                value={departement_name}
                onChange={(e) => setDepartementName(e.target.value)}
                label="Département"
                required
                disabled={loadingDepartments} // Désactiver le Select pendant le chargement
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
            <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ marginTop: 2 }}>
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Ajouter la question"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddQuestion;