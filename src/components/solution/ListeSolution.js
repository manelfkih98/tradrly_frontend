import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
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
import SearchIcon from "@mui/icons-material/Search";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSolutions,
  deleteSolutions,
  createSolution,
  updateSolution,
} from "../../store/services/solutionService";
import AddSolution from "./AddSolution";
import { styled } from "@mui/material/styles";

// Bouton animé pour les actions
const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  transition: "transform 0.2s ease-in-out, color 0.3s ease",
  "&:hover": {
    transform: "scale(1.2)",
    color: "#d4af37",
  },
}));

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
      confirmButtonColor: "#b91c1c",
      cancelButtonColor: "#1e3a8a",
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
    <Box
      sx={{
        p: { xs: 3, md: 6 },
        borderRadius: 4,
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        maxWidth: "1200px",
        mx: "auto",
        my: 4,
      }}
    >
    

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
      >
        <Grid item sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: "#1e3a8a", mr: 1 }} />
              ),
            }}
            sx={{
              backgroundColor: "#f4f6f8",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#d4af37",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1e3a8a",
                },
              },
              transition: "all 0.3s ease",
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: "1.5rem" }} />}
            onClick={handleOpen}
            sx={{
              backgroundColor: "#1e3a8a",
              color: "#ffffff",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#d4af37",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Ajouter un Projet
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress sx={{ color: "#1e3a8a" }} />
        </Box>
      ) : error ? (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 4, gap: 1 }}>
          <ErrorOutlineIcon sx={{ color: "#b91c1c" }} />
          <Typography color="#b91c1c" align="center">
            Erreur: {error}
          </Typography>
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1e3a8a" }}>
                <TableCell sx={{ color: "#ffffff", fontWeight: 700, fontSize: "1rem", py: 3 }}>
                  Projet
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: 700, fontSize: "1rem", py: 3 }}>
                  Date
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: 700, fontSize: "1rem", py: 3 }}>
                  Image
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: 700, fontSize: "1rem", py: 3 }}>
                  Département
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#ffffff", fontWeight: 700, fontSize: "1rem", py: 3 }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <TableRow
                    key={project._id}
                    hover
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
                      "&:hover": { backgroundColor: "#f1f5f9" },
                    }}
                  >
                    <TableCell sx={{ py: 2, px: 3, fontSize: "0.9rem" }}>
                      {project.name_project}
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 3, fontSize: "0.9rem" }}>
                      {formatDate(project.date_creation)}
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 3 }}>
                      <Avatar
                        variant="rounded"
                        src={project.image}
                        alt={project.name_project}
                        sx={{
                          width: 50,
                          height: 50,
                          border: "1px solid #e5e7eb",
                          borderRadius: 2,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 3 }}>
                      {project.departementId ? (
                        <Chip
                          label={project.departementId.NameDep}
                          sx={{
                            backgroundColor: "#1e3a8a",
                            color: "#ffffff",
                            borderRadius: 1,
                            fontSize: "0.85rem",
                          }}
                        />
                      ) : (
                        <Chip
                          label="Non défini"
                          sx={{
                            backgroundColor: "#d4af37",
                            color: "#1e3a8a",
                            borderRadius: 1,
                            fontSize: "0.85rem",
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="center" sx={{ py: 2, px: 3 }}>
                      <Tooltip
                        title="Modifier"
                        sx={{
                          "& .MuiTooltip-tooltip": {
                            backgroundColor: "#1e3a8a",
                            color: "#ffffff",
                          },
                        }}
                      >
                        <AnimatedIconButton
                          onClick={() => handleEdit(project)}
                          sx={{ color: "#1e3a8a" }}
                        >
                          <EditIcon />
                        </AnimatedIconButton>
                      </Tooltip>
                      <Tooltip
                        title="Supprimer"
                        sx={{
                          "& .MuiTooltip-tooltip": {
                            backgroundColor: "#1e3a8a",
                            color: "#ffffff",
                          },
                        }}
                      >
                        <AnimatedIconButton
                          onClick={() => handleDelete(project._id)}
                          sx={{ color: "#b91c1c" }}
                        >
                          <DeleteIcon />
                        </AnimatedIconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Box display="flex" alignItems="center" justifyContent="center" py={4} gap={1}>
                      <InfoOutlinedIcon sx={{ color: "#1e3a8a" }} />
                      <Typography sx={{ color: "#1e3a8a", fontWeight: 500 }}>
                        Aucun projet trouvé.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

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