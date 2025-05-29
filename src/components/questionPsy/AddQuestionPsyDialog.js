// src/components/AddQuestionPsyDialog.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useForm, Controller } from "react-hook-form";

const AddQuestionPsyDialog = ({
  open,
  onClose,
  onSubmitForm,
  snackbarError,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questionText: "",
      reponse: "",
    },
  });

  const [propositions, setPropositions] = useState([""]);
  const watchReponse = watch("reponse");

  const handleChangeProposition = (index, value) => {
    const updated = [...propositions];
    updated[index] = value;
    setPropositions(updated);
  };

  const handleAddProposition = () => {
    setPropositions([...propositions, ""]);
  };

  const handleRemoveProposition = (index) => {
    const removed = propositions[index];
    const updated = [...propositions];
    updated.splice(index, 1);
    setPropositions(updated);

    if (watchReponse === removed) {
      setValue("reponse", "");
    }
  };

  const onSubmit = (data) => {
    const cleanedProps = propositions.map((p) => p.trim()).filter((p) => p !== "");
    const cleanedReponse = data.reponse.trim();
  
    if (cleanedProps.length > 0 && !cleanedProps.includes(cleanedReponse)) {
      snackbarError("La bonne réponse doit faire partie des propositions non vides.");
      return;
    }
  
    const newQuestion = {
      questionText: data.questionText.trim(),
      propositions: cleanedProps,
      reponse: cleanedReponse,
    };
  
    onSubmitForm(newQuestion);
    reset();
    setPropositions([""]);
  };
  

  const handleClose = () => {
    reset();
    setPropositions([""]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: "#4B0082" }}>
        Ajouter une nouvelle question
      </DialogTitle>
      <DialogContent dividers>
        <Controller
          name="questionText"
          control={control}
          rules={{ required: "La question est obligatoire" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Intitulé de la question"
              fullWidth
              margin="normal"
              error={!!errors.questionText}
              helperText={errors.questionText?.message}
            />
          )}
        />

        <Typography variant="subtitle1" fontWeight={600} mt={2}>
          Propositions :
        </Typography>

        {propositions.map((prop, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1} mt={1}>
            <TextField
              label={`Proposition ${index + 1}`}
              fullWidth
              value={prop}
              onChange={(e) => handleChangeProposition(index, e.target.value)}
            />
            <IconButton
              onClick={() => handleRemoveProposition(index)}
              color="error"
              disabled={propositions.length <= 1}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        

        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddProposition}
          sx={{ mt: 2, textTransform: "none" }}
        >
          Ajouter une proposition
        </Button>

        <Controller
          name="reponse"
          control={control}
          rules={{ required: "La bonne réponse est obligatoire" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Bonne réponse"
              fullWidth
              margin="normal"
              error={!!errors.reponse}
              helperText={errors.reponse?.message}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddQuestionPsyDialog;
