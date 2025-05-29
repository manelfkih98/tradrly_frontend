import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestion,
  deleteQuestion,
  updateQuestion,
} from "../../store/services/questionService";
import { fetchDepartments } from "../../store/services/departService";
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddQuestion from "../question/addQuestion";

const AllQuestion = () => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.questions);
  const departments = useSelector((state) => state.departments.departments) || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDep, setSelectedDep] = useState("");
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [responseError, setResponseError] = useState(false); // État pour l'erreur de bonne réponse

  useEffect(() => {
    dispatch(fetchQuestion());
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleEditOpen = (question) => {
    setSelectedQuestion({
      ...question,
      departement: question.departement?._id || "",
      propositions: question.propositions || [],
    });
    setResponseError(false); // Réinitialiser l'erreur lors de l'ouverture
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setSelectedQuestion(null);
    setOpenEditDialog(false);
    setResponseError(false);
  };

  const handleUpdate = () => {
    if (!selectedQuestion || !selectedQuestion._id) return;
    if (!selectedQuestion.reponse) {
      setResponseError(true);
      toast.error("Veuillez spécifier une bonne réponse avant de mettre à jour.", {
        position: "top-right",
      });
      return;
    }
    dispatch(updateQuestion(selectedQuestion._id, selectedQuestion));
    toast.success("Question mise à jour avec succès !", { position: "top-right" });
    handleEditClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id));
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
        handleDelete(id);
      }
    });
  };

  const groupedQuestions = departments.reduce((acc, dep) => {
    const filtered = questions.filter(
      (q) =>
        q.departement?._id === dep._id &&
        q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedDep || q.departement?._id === selectedDep)
    );
    if (filtered.length > 0) acc[dep._id] = { name: dep.NameDep, questions: filtered };
    return acc;
  }, {});

  const noDepQuestions = questions.filter(
    (q) =>
      !q.departement &&
      q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedDep || selectedDep === "no-dep")
  );
  if (noDepQuestions.length > 0) {
    groupedQuestions["no-dep"] = { name: "Non spécifié", questions: noDepQuestions };
  }

  // Handle changes to propositions
  const handlePropositionsChange = (index, value) => {
    const updatedPropositions = [...selectedQuestion.propositions];
    updatedPropositions[index] = value;
    setSelectedQuestion({ ...selectedQuestion, propositions: updatedPropositions });
    // Réinitialiser l'erreur si une nouvelle bonne réponse est définie
    if (value && selectedQuestion.reponse === "") {
      setResponseError(false);
    }
  };

  const addProposition = () => {
    setSelectedQuestion({
      ...selectedQuestion,
      propositions: [...selectedQuestion.propositions, ""],
    });
  };

  const removeProposition = (index) => {
    const propToRemove = selectedQuestion.propositions[index];
    const isCorrectAnswer =
      (typeof propToRemove === "string" ? propToRemove : propToRemove.text) ===
      selectedQuestion.reponse;

    if (isCorrectAnswer) {
      toast.warn(
        <Box>
          <Typography>Vous supprimez la bonne réponse !</Typography>
          <Typography>Voulez-vous continuer ? Cela videra le champ de la bonne réponse.</Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              onClick={() => {
                const updatedPropositions = selectedQuestion.propositions.filter(
                  (_, i) => i !== index
                );
                setSelectedQuestion({
                  ...selectedQuestion,
                  propositions: updatedPropositions,
                  reponse: "",
                });
                setResponseError(true);
                toast.dismiss();
              }}
              color="error"
              variant="contained"
              sx={{ mr: 1 }}
            >
              Oui
            </Button>
            <Button onClick={() => toast.dismiss()} variant="outlined">
              Annuler
            </Button>
          </Box>
        </Box>,
        { autoClose: false, closeOnClick: false, position: "top-right" }
      );
    } else {
      const updatedPropositions = selectedQuestion.propositions.filter((_, i) => i !== index);
      setSelectedQuestion({
        ...selectedQuestion,
        propositions: updatedPropositions,
      });
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1300, mx: "auto" }}>
      <ToastContainer />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <TextField
          label="Recherche"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ToggleButtonGroup
          value={selectedDep}
          exclusive
          onChange={(e, val) => setSelectedDep(val || "")}
          sx={{
            flexWrap: "wrap",
            "& .MuiToggleButton-root": {
              borderColor: "#914091",
              color: "#914091",
              fontWeight: "bold",
              borderRadius: "20px",
              px: 2,
              py: 1,
              "&.Mui-selected": {
                backgroundColor: "#914091",
                color: "#fff",
              },
            },
          }}
        >
          <ToggleButton value="">Tous</ToggleButton>
          {departments.map((dep) => (
            <ToggleButton key={dep._id} value={dep._id}>
              {dep.NameDep}
            </ToggleButton>
          ))}
          <ToggleButton value="no-dep">Non spécifié</ToggleButton>
        </ToggleButtonGroup>
        <Button
          onClick={() => setOpenAddQuestion(true)}
          variant="contained"
          sx={{
            backgroundColor: "#304e8a",
            color: "#fff",
            borderRadius: "20px",
            px: 3,
            
          }}
        >
          Ajouter une question
        </Button>
      </Box>

      {loading ? (
        <CircularProgress sx={{ mx: "auto", display: "block" }} />
      ) : error ? (
        <Typography color="error" align="center">{`Erreur: ${error}`}</Typography>
      ) : (
        Object.entries(groupedQuestions).map(([id, group]) => (
          <Box key={id} sx={{ mb: 5 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#1E3A8A",
                mb: 2,
                fontWeight: "bold",
                borderBottom: "2px solid #914091",
              }}
            >
              {group.name}
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#EDE9FE" }}>
                    <TableCell  sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}>Question</TableCell>
                    <TableCell  sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}>Propositions</TableCell>
                    <TableCell  sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }} align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {group.questions.map((ques, i) => (
                    <TableRow key={ques._id} sx={{ backgroundColor: i % 2 ? "#f5f5f5" : "#fff" }}>
                      <TableCell>{ques.questionText}</TableCell>
                      <TableCell>
                        {ques.propositions && ques.propositions.length > 0 ? (
                          ques.propositions.map((prop, index) => (
                            <Chip
                              key={index}
                              label={typeof prop === "string" ? prop : prop.text}
                              sx={{
                                m: 0.5,
                                backgroundColor:
                                  (typeof prop === "string" ? prop : prop.text) === ques.reponse
                                    ? "#E8F5E9" :"transparent",
                                    
                                color: (typeof prop === "string" ? prop : prop.text) === ques.reponse
                                ? "#4CAF50" : "#1F2937",
                                fontWeight:
                                  (typeof prop === "string" ? prop : prop.text) === ques.reponse
                                    ? "bold"
                                    : "normal",
                                
                              }}
                            />
                          ))
                        ) : (
                          <Typography  sx={{   fontWeight: "bold",color:"#4CAF50",backgroundColor:"#E8F5E9"}}>
                           {ques.reponse}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleEditOpen(ques)}
                          sx={{ color: "#914091" }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => confirmDelete(ques._id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))
      )}

      {/* Modal Ajout */}
      <Modal open={openAddQuestion} onClose={() => setOpenAddQuestion(false)}>
        <Box
          sx={{
            width: "90%",
            maxWidth: 600,
            bgcolor: "#fff",
            p: 4,
            mx: "auto",
            my: "5%",
            borderRadius: 3,
            boxShadow: 24,
          }}
        >
          <AddQuestion onClose={() => setOpenAddQuestion(false)} />
        </Box>
      </Modal>

      {/* Dialog Edition */}
      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle sx={{ fontWeight: "bold", color: "#1E3A8A" }}>
          Modifier la question
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Question"
            fullWidth
            margin="dense"
            value={selectedQuestion?.questionText || ""}
            onChange={(e) =>
              setSelectedQuestion({ ...selectedQuestion, questionText: e.target.value })
            }
          />
          <Tooltip
            title={
              responseError
                ? "La bonne réponse a été supprimée. Veuillez en spécifier une nouvelle."
                : ""
            }
            placement="top"
            arrow
          >
            <TextField
              label="Bonne réponse"
              fullWidth
              margin="dense"
              value={selectedQuestion?.reponse || ""}
              onChange={(e) => {
                setSelectedQuestion({ ...selectedQuestion, reponse: e.target.value });
                setResponseError(false); // Réinitialiser l'erreur si une valeur est saisie
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: responseError ? "error.main" : undefined,
                  },
                  "&:hover fieldset": {
                    borderColor: responseError ? "error.main" : undefined,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: responseError ? "error.main" : undefined,
                  },
                },
              }}
            />
          </Tooltip>
          <FormControl fullWidth margin="dense">
            <InputLabel>Département</InputLabel>
            <Select
              value={selectedQuestion?.departement || ""}
              onChange={(e) =>
                setSelectedQuestion({ ...selectedQuestion, departement: e.target.value })
              }
            >
              {departments.map((dep) => (
                <MenuItem key={dep._id} value={dep._id}>
                  {dep.NameDep}
                </MenuItem>
              ))}
              <MenuItem value="">Non spécifié</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Propositions
            </Typography>
            {selectedQuestion?.propositions?.map((prop, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <TextField
                  fullWidth
                  label={`Proposition ${index + 1}`}
                  value={typeof prop === "string" ? prop : prop.text}
                  onChange={(e) => handlePropositionsChange(index, e.target.value)}
                />
                <IconButton
                  onClick={() => removeProposition(index)}
                  color="error"
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              onClick={addProposition}
              variant="outlined"
              sx={{ mt: 1, color: "#914091", borderColor: "#914091" }}
            >
              Ajouter une proposition
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Annuler
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            sx={{ backgroundColor: "#1E3A8A", color: "#fff" }}
          >
            Mettre à jour
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllQuestion;