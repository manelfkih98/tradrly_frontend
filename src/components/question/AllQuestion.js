import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestion, deleteQuestion, updateQuestion } from "../../store/services/questionService";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import AddQuestion from "../question/addQuestion";

const AllQuestion = () => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.questions);
  const departments = useSelector((state) => state.departments.departments) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDep, setSelectedDep] = useState(""); // Filtre par département
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    dispatch(fetchQuestion());
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleEditOpen = (question) => {
    setSelectedQuestion({ ...question, departement: question.departement?._id || "" });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setSelectedQuestion(null);
    setOpenEditDialog(false);
  };

  const handleUpdate = () => {
    if (!selectedQuestion || !selectedQuestion._id) return;
    dispatch(updateQuestion(selectedQuestion._id, selectedQuestion));
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

  const handleDeleteConfirmOpen = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleOpenAddQuestion = () => {
    setOpenAddQuestion(true);
  };

  const handleCloseAddQuestion = () => {
    setOpenAddQuestion(false);
  };

  // Grouper les questions par département
  const groupedQuestions = departments.reduce((acc, dep) => {
    const depQuestions = questions.filter(
      (ques) =>
        ques.departement?._id === dep._id &&
        ques.questionText.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedDep || ques.departement?._id === selectedDep)
    );
    if (depQuestions.length > 0) {
      acc[dep._id] = { name: dep.NameDep, questions: depQuestions };
    }
    return acc;
  }, {});

  // Ajouter les questions sans département
  const noDepQuestions = questions.filter(
    (ques) =>
      !ques.departement &&
      ques.questionText.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedDep || selectedDep === "no-dep")
  );
  if (noDepQuestions.length > 0) {
    groupedQuestions["no-dep"] = { name: "Non spécifié", questions: noDepQuestions };
  }

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: "auto" }}>
      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center", flexWrap: "wrap" }}>
        <TextField
          label="Rechercher une question"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1, minWidth: 200 }}
        />
        <ToggleButtonGroup
          value={selectedDep}
          exclusive
          onChange={(e, newValue) => setSelectedDep(newValue || "")}
          aria-label="Filtre par département"
          sx={{
            flexWrap: "wrap",
            overflowX: "auto",
            "& .MuiToggleButton-root": {
              borderColor: "#1e3a8a",
              color: "#1e3a8a",
              textTransform: "none",
              borderRadius: 2,
              px: 2,
              py: 1,
              mr: 1,
              mb: 1,
              transition: "all 0.3s",
              "&.Mui-selected": {
                backgroundColor: "#1e3a8a",
                color: "white",
                "&:hover": {
                  backgroundColor: "#16307a",
                },
              },
              "&:hover": {
                backgroundColor: "#e8f0fe",
              },
            },
          }}
        >
          <ToggleButton value="" aria-label="Tous les départements">
            Tous
          </ToggleButton>
          {departments.map((dep) => (
            <ToggleButton
              key={dep._id}
              value={dep._id}
              aria-label={`Filtrer par ${dep.NameDep}`}
            >
              {dep.NameDep}
            </ToggleButton>
          ))}
          <ToggleButton value="no-dep" aria-label="Non spécifié">
            Non spécifié
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#1e3a8a", borderRadius: 2, px: 3 }}
          onClick={handleOpenAddQuestion}
        >
          Ajouter une question
        </Button>
      </Box>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : error ? (
        <Typography color="error" align="center">
          Erreur: {error}
        </Typography>
      ) : Object.keys(groupedQuestions).length > 0 ? (
        <Box>
          {Object.entries(groupedQuestions).map(([depId, dep]) => (
            <Box key={depId} sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "#1e3a8a",
                  fontWeight: "bold",
                  mb: 2,
                  borderBottom: "2px solid #1e3a8a",
                  pb: 1,
                }}
              >
                {dep.name}
              </Typography>
              <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#1e3a8a" }}>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        Question
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        Réponse
                      </TableCell>
                      <TableCell
                        sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dep.questions.map((ques, index) => (
                      <TableRow
                        key={ques._id}
                        sx={{
                          bgcolor: index % 2 === 0 ? "#f9f9f9" : "white",
                          "&:hover": { bgcolor: "#f0f0f0" },
                        }}
                      >
                        <TableCell>{ques.questionText}</TableCell>
                        <TableCell>
                          {ques.reponse || "Aucune réponse"}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditOpen(ques)}
                            aria-label="Éditer la question"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteConfirmOpen(ques._id)}
                            aria-label="Supprimer la question"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography align="center" variant="h6">
          Aucune question trouvée.
        </Typography>
      )}

      {/* Modal d'ajout de question */}
      <Modal open={openAddQuestion} onClose={handleCloseAddQuestion}>
        <Box
          sx={{
            width: "90%",
            maxWidth: 600,
            bgcolor: "background.paper",
            padding: 3,
            borderRadius: 2,
            margin: "5% auto",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: 24,
            transition: "all 0.3s ease",
          }}
        >
          <AddQuestion onClose={handleCloseAddQuestion} />
        </Box>
      </Modal>

      {/* Modal d’édition */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditClose}
        PaperProps={{ sx: { borderRadius: 2, boxShadow: 24 } }}
      >
        <DialogTitle sx={{ color: "#1e3a8a", fontWeight: "bold" }}>
          Modifier la Question
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Question"
            fullWidth
            margin="dense"
            name="questionText"
            value={selectedQuestion?.questionText || ""}
            onChange={(e) =>
              setSelectedQuestion({ ...selectedQuestion, questionText: e.target.value })
            }
            variant="outlined"
          />
          <TextField
            label="Réponse"
            fullWidth
            margin="dense"
            name="reponse"
            value={selectedQuestion?.reponse || ""}
            onChange={(e) =>
              setSelectedQuestion({ ...selectedQuestion, reponse: e.target.value })
            }
            variant="outlined"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Département</InputLabel>
            <Select
              name="departement"
              value={selectedQuestion?.departement || ""}
              onChange={(e) =>
                setSelectedQuestion({ ...selectedQuestion, departement: e.target.value })
              }
            >
              {departments.length > 0 ? (
                departments.map((dep) => (
                  <MenuItem key={dep._id} value={dep._id}>
                    {dep.NameDep}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Aucun département disponible</MenuItem>
              )}
              <MenuItem value="">Non spécifié</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Annuler
          </Button>
          <Button
            onClick={handleUpdate}
            color="primary"
            variant="contained"
            sx={{ backgroundColor: "#1e3a8a" }}
          >
            Mettre à jour
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllQuestion;