import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Tooltip,
  CircularProgress,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSolutions,
  deleteSolutions,
  createSolution,
  updateSolution,
} from "../../store/services/solutionService";
import AddSolution from "./AddSolution";

function ListesSolution() {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);

  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchSolutions());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSolutions(id));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Projet supprimé avec succès",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const handleFormSubmit = (data) => {
    if (editingProject) {
      dispatch(updateSolution(editingProject._id, data));
    } else {
      dispatch(createSolution(data));
    }
    handleClose();
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setOpen(true);
  };

  const handleOpen = () => {
    setEditingProject(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const filteredProjects = projects.filter(
    (project) =>
      (project.name_project &&
        project.name_project.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.description_project &&
        project.description_project.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Grid item>
         
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Ajouter un Projet
          </Button>
        </Grid>
      </Grid>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Rechercher un projet..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      
        <CardContent>
          {loading ? (
            <CircularProgress sx={{ display: "block", mx: "auto" }} />
          ) : error ? (
            <Typography color="error" align="center">
              Erreur: {error}
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f8f8f8" }}>
                  <TableRow>
                    <TableCell><strong>Projet</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Image</strong></TableCell>
                    <TableCell><strong>Département</strong></TableCell>
                    <TableCell align="center"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <TableRow key={project._id}>
                        <TableCell>{project.name_project}</TableCell>
                        <TableCell>{formatDate(project.date_creation)}</TableCell>
                        <TableCell>
                          <Avatar
                            variant="rounded"
                            src={project.image}
                            alt={project.name_project}
                            sx={{ width: 60, height: 60 }}
                          />
                        </TableCell>
                        <TableCell>
                          {project.departementId ? (
                            <Chip
                              label={project.departementId.NameDep}
                              color="info"
                              variant="outlined"
                            />
                          ) : (
                            <Chip label="Non défini" variant="outlined" color="warning" />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Modifier" arrow>
                            <IconButton color="primary" onClick={() => handleEdit(project)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Supprimer" arrow>
                            <IconButton color="error" onClick={() => handleDelete(project._id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        Aucun projet trouvé.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
    

      <AddSolution
        open={open}
        handleClose={handleClose}
        onSubmitSolution={handleFormSubmit}
        editingSolution={editingProject}
      />
    </Box>
  );
}

export default ListesSolution;
