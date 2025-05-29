import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchQuestionPsy,
  addQuestionPsy,
  deleteQuestionPsy,
  updateQuestionPsy,
} from "../../store/services/questionPsyService";

import { fetchDepartments } from "../../store/services/departService";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AllQuestioPsy = () => {
  const dispatch = useDispatch();
  const { questionsPsy } = useSelector((state) => state.questionsPsy);
  const departments = useSelector((state) => state.departments.departments) || [];

  const [open, setOpen] = useState(false);
  const [propositions, setPropositions] = useState([""]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");

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

  const watchReponse = watch("reponse");

  useEffect(() => {
    dispatch(fetchQuestionPsy());
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    reset();
    setPropositions([""]);
    setEditingQuestion(null);
    setSelectedDepartment("");
  };

  const handleChangeProposition = (index, value) => {
    const updated = [...propositions];
    updated[index] = value;
    setPropositions(updated);
  };

  const handleAddProposition = () => setPropositions([...propositions, ""]);

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

    if (cleanedProps.length > 0 && !cleanedProps.includes(data.reponse.trim())) {
      toast.info("La bonne réponse doit faire partie des propositions!", {
        position: "top-left",
      });
      return;
    }

    const questionPayload = {
      questionText: data.questionText.trim(),
      propositions: cleanedProps,
      reponse: data.reponse.trim(),
      departement_name: selectedDepartment,
    };

    if (editingQuestion) {

      dispatch(updateQuestionPsy(editingQuestion._id, questionPayload)).then(() => {
        dispatch(fetchQuestionPsy());
        handleClose();
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Question modifiée avec succès !",
          timer: 2000,
          showConfirmButton: false,
        });
      });
    } else {
      dispatch(addQuestionPsy(questionPayload)).then(() => {
        dispatch(fetchQuestionPsy());
        handleClose();
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Question ajoutée avec succès !",
          timer: 2000,
          showConfirmButton: false,
        });
      });
    }
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteQuestionPsy(id));
    Swal.fire({
      title: "Supprimé !",
      text: "La question a été supprimée avec succès.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#914091",
      cancelButtonColor: "#1E3A8A",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteClick(id);
      }
    });
  };

  const handleEditClick = (question) => {
    setEditingQuestion(question);
    setValue("questionText", question.questionText);
    setValue("reponse", question.reponse);
    setPropositions(question.propositions.length > 0 ? question.propositions : [""]);
    setSelectedDepartment(question.departement || "");
    setOpen(true);
  };

  return (
    <Box p={3}>
      <ToastContainer />
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight={600} color="primary">
          Liste des questions psychotechniques
        </Typography>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ textTransform: "none", borderRadius: 2 }}
          color="secondary"
        >
          Ajouter une question
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#EDE9FE" }}>
              <TableCell sx={{ color: "#1E3A8A", fontWeight: 700 }}>Question</TableCell>
              <TableCell sx={{ color: "#1E3A8A", fontWeight: 700 }}>Propositions</TableCell>
              <TableCell sx={{ color: "#1E3A8A", fontWeight: 700 }}>Département</TableCell>
              <TableCell sx={{ color: "#1E3A8A", fontWeight: 700 }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questionsPsy.map((ques) => {
              const propositionsWithReponse = [...ques.propositions];
              if (ques.reponse && !ques.propositions.includes(ques.reponse)) {
                propositionsWithReponse.push(ques.reponse);
              }

              return (
                <TableRow key={ques._id}>
                  <TableCell>{ques.questionText}</TableCell>
                  <TableCell>
                    <ul style={{ paddingLeft: 16 }}>
                      {propositionsWithReponse.map((prop, index) => {
                        const isCorrect = prop === ques.reponse;
                        return (
                          <li
                            key={index}
                            style={{
                              color: isCorrect ? "#4CAF50" : "#1F2937",
                              fontWeight: isCorrect ? "bold" : "normal",
                              backgroundColor: isCorrect ? "#E8F5E9" : "transparent",
                              borderRadius: "8px",
                              padding: "4px 8px",
                              marginBottom: "4px",
                              display: "inline-block",
                            }}
                          >
                            {prop} {isCorrect && "✔️"}
                          </li>
                        );
                      })}
                    </ul>
                  </TableCell>
                  <TableCell>
                    {
                      departments.find((dep) => dep._id === ques.departement)?.NameDep ||
                      "N/A"
                    }
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="secondary" onClick={() => handleEditClick(ques)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => confirmDelete(ques._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1300,
          }}
        >
          <Paper sx={{ width: "90%", maxWidth: 600, p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={700} color="primary" mb={2}>
              {editingQuestion ? "Modifier la question" : "Ajouter une nouvelle question"}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                type="button"
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

              <FormControl fullWidth margin="normal">
                <InputLabel>Département</InputLabel>
                <Select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  label="Département"
                  required
                >
                  {departments.map((dep) => (
                    <MenuItem key={dep._id} value={dep.NameDep}>
                      {dep.NameDep}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                <Button onClick={handleClose} color="primary">
                  Annuler
                </Button>
                <Button type="submit" variant="contained" color="secondary">
                  {editingQuestion ? "Modifier" : "Ajouter"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default AllQuestioPsy;
