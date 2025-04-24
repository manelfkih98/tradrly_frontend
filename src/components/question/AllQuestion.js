import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestion, deleteQuestion, updateQuestion } from "../../store/services/questionService";
import { fetchDepartments } from "../../store/services/departService";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  CircularProgress,
  Typography,
  Card,
  IconButton,
  Button,
  TextField,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
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

  const filteredQuestions =
    questions?.filter((ques) => ques.questionText.toLowerCase().includes(searchTerm.toLowerCase())) || [];

  return (
    <Card >
    
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="Rechercher une question"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ mr: 2 }}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleOpenAddQuestion}>
        Ajouter une question
      </Button>
      <TableContainer component={Paper}>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : error ? (
          <Typography color="error" align="center">
            Erreur: {error}
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>Question</strong></TableCell>
                <TableCell><strong>Réponse</strong></TableCell>
                <TableCell><strong>Département</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((ques) => (
                  <TableRow key={ques._id}>
                    <TableCell>{ques.questionText}</TableCell>
                    <TableCell>{ques.reponse}</TableCell>
                    <TableCell>{ques.departement?.NameDep || "Non spécifié"}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditOpen(ques)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteConfirmOpen(ques._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Aucune question trouvée.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

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
          }}
        >
          <AddQuestion onClose={handleCloseAddQuestion} />
        </Box>
      </Modal>

      {/* Modal d’édition */}
      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Modifier la Question</DialogTitle>
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
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleUpdate} color="primary" variant="contained">
            Mettre à jour
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default AllQuestion;
