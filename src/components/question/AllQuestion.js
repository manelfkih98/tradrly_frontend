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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Modal
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddQuestion from "../question/addQuestion";
import dayjs from "dayjs";

const AllQuestion = () => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.questions);
  const departments = useSelector((state) => state.departments.departments) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

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
    dispatch(updateQuestion(selectedQuestion._id,selectedQuestion));
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
    if (selectedQuestionId) dispatch(deleteQuestion(selectedQuestionId));
    handleDeleteConfirmClose();
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
    <Card sx={{ p: 8 }}>
     <Button variant="contained" color="primary" sx={{ marginBottom: 2 }} onClick={handleOpenAddQuestion}>
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
      <Modal open={openAddQuestion} onClose={handleCloseAddQuestion}>
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            padding: 3,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            marginTop: 10,
          }}
        >
          <AddQuestion onClose={handleCloseAddQuestion} />
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
          Liste des Questions
        </Typography>
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
      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Modifier la Question</DialogTitle>
        <DialogContent>
          <TextField label="Question" fullWidth margin="dense" name="questionText" value={selectedQuestion?.questionText || ""} onChange={(e) => setSelectedQuestion({ ...selectedQuestion, questionText: e.target.value })} />
          <TextField label="Réponse" fullWidth margin="dense" name="reponse" value={selectedQuestion?.reponse || ""} onChange={(e) => setSelectedQuestion({ ...selectedQuestion, reponse: e.target.value })} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Département</InputLabel>
            <Select name="departement" value={selectedQuestion?.departement || ""} onChange={(e) => setSelectedQuestion({ ...selectedQuestion, departement: e.target.value })}>
              {departments.length > 0 ? (
                departments.map((dep) => <MenuItem key={dep._id} value={dep._id}>{dep.NameDep}</MenuItem>)) : <MenuItem disabled>Aucun département disponible</MenuItem>}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">Annuler</Button>
          <Button onClick={handleUpdate} color="primary" variant="contained">Mettre à jour</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteConfirmOpen} onClose={handleDeleteConfirmClose}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent><Typography>Voulez-vous vraiment supprimer cette question ?</Typography></DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose} color="secondary">Annuler</Button>
          <Button onClick={handleDelete} color="error">Supprimer</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default AllQuestion;
