import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestion, deleteQuestion, updateQuestion } from "../../services/questionService";
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
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddQuestion from "../question/addQuestion";

const AllQuestion = () => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.questions);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    dispatch(fetchQuestion());
  }, [dispatch]);

  const handleOpen = () => setOpenAddQuestion(true);
  const handleClose = () => setOpenAddQuestion(false);

  const handleEditOpen = (question) => {
    setSelectedQuestion(question);
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setSelectedQuestion(null);
    setOpenEditDialog(false);
  };

  const handleUpdate = () => {
    if (selectedQuestion && selectedQuestion._id) {
      dispatch(updateQuestion(selectedQuestion._id, selectedQuestion));
    }
    handleEditClose();
  };

  const handleDeleteConfirmOpen = (id) => {
    setSelectedQuestionId(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirmClose = () => {
    setSelectedQuestionId(null);
    setDeleteConfirmOpen(false);
  };

  const handleDelete = () => {
    if (selectedQuestionId) {
      dispatch(deleteQuestion(selectedQuestionId));
    }
    handleDeleteConfirmClose();
  };

  const filteredQuestions =
    questions?.filter((ques) =>
      ques.questionText.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <Card sx={{ p: 8 }}>
      <Button variant="contained" color="primary" sx={{ marginBottom: 2 }} onClick={handleOpen}>
        Ajouter une question
      </Button>

      <TextField
        label="Rechercher une question"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Modal open={openAddQuestion} onClose={handleClose}>
        <Box sx={{ width: 400, bgcolor: "background.paper", padding: 3, borderRadius: 2, margin: "auto", marginTop: 10 }}>
          <AddQuestion onClose={handleClose} />
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>Liste des Questions</Typography>

        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : error ? (
          <Typography color="error" align="center">Erreur: {error}</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>Question</strong></TableCell>
                <TableCell><strong>Réponse</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((ques) => (
                  <TableRow key={ques._id}>
                    <TableCell>{ques.questionText}</TableCell>
                    <TableCell>{ques.reponse}</TableCell>
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
                  <TableCell colSpan={3} align="center">Aucune question trouvée.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Modifier la Question</DialogTitle>
        <DialogContent>
          <TextField
            label="Question"
            fullWidth
            variant="outlined"
            margin="dense"
            value={selectedQuestion?.questionText || ""}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, questionText: e.target.value })}
          />
          <TextField
            label="Réponse"
            fullWidth
            variant="outlined"
            margin="dense"
            value={selectedQuestion?.reponse || ""}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, reponse: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">Annuler</Button>
          <Button onClick={handleUpdate} color="primary" variant="contained">Mettre à jour</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteConfirmOpen} onClose={handleDeleteConfirmClose}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>Voulez-vous vraiment supprimer cette question ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose} color="secondary">Annuler</Button>
          <Button onClick={handleDelete} color="error">Supprimer</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default AllQuestion;
