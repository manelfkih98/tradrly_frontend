import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSolutions,
  deleteSolutions,
  createSolution,
  updateSolution
} from "../../store/services/solutionService";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
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

  const filteredProjects = projects.filter(
    (project) =>
      (project.name_project &&
        project.name_project
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (project.description_project &&
        project.description_project
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  return (
    <Card sx={{ p: 8 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginBottom: 2 }}
      >
        Ajouter un projet
      </Button>
      <TextField
        label="Rechercher projet"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
          Liste des projets
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
                <TableCell>
                  <strong>Nom du Projet</strong>
                </TableCell>
                <TableCell>
                  <strong>Description du Projet</strong>
                </TableCell>
                <TableCell>
                  <strong>department</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <TableRow key={project._id}>
                    <TableCell>{project.name_project}</TableCell>
                    <TableCell>{project.description_project}</TableCell>
                    <TableCell>
                      {project.departementId
                        ? project.departementId.NameDep
                        : "Département non disponible"}
                    </TableCell>

                    <TableCell>
                      <IconButton
                        onClick={() => handleEdit(project)}
                        color="primary"
                      >
                         <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(project._id)}
                        color="error"
                      >
                         <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Aucun projet trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <AddSolution
        open={open}
        handleClose={handleClose}
        onSubmitSolution={handleFormSubmit}
        editingSolution={editingProject}
      />
    </Card>
  );
}

export default ListesSolution;
