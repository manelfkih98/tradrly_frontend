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
  Pagination,
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
import { ToastContainer, toast } from 'react-toastify';


const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  transition: "transform 0.2s ease-in-out, color 0.3s ease, background-color 0.3s ease",
  "&:hover": {
    transform: "scale(1.2)",
    color: "#914091",
    backgroundColor: "#EDE9FE",
  },
}));

function ListesSolution() {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);

  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchSolutions());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#914091",
      cancelButtonColor: "#1E3A8A",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSolutions(id));
        toast.success("Projet supprimé avec succès !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box>
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: "#1E3A8A", mr: 1, transition: "color 0.3s" }} />
              ),
            }}
            sx={{
              backgroundColor: "#F8FAFC",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#1E3A8A",
                },
                "&:hover fieldset": {
                  borderColor: "#914091",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#914091",
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
              backgroundColor: "#914091",
              color: "#FFFFFF",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#7E3A8A",
                boxShadow: "0 4px 8px rgba(145, 64, 145, 0.3)",
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
          <CircularProgress sx={{ color: "#1E3A8A" }} />
        </Box>
      ) : error ? (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 4, gap: 1 }}>
          <ErrorOutlineIcon sx={{ color: "#1E3A8A" }} />
          <Typography color="#1E3A8A" align="center">
            Erreur: {error}
          </Typography>
        </Box>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: "#FFFFFF",
              overflowX: "auto",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#EDE9FE" }}>
                  <TableCell sx={{ color: "#1E3A8A", fontWeight: 700 }}>Projet</TableCell>
                  <TableCell sx={{ color: "#1E3A8A", fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ color: "#1E3A8A", fontWeight: 700 }}>Image</TableCell>
                  <TableCell sx={{ color: "#1E3A8A", fontWeight: 700 }}>Département</TableCell>
                  <TableCell align="center" sx={{ color: "#1E3A8A", fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentProjects.length > 0 ? (
                  currentProjects.map((project, index) => (
                    <TableRow
                      key={project._id}
                      hover
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
                        "&:hover": { backgroundColor: "#DBEAFE" },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <TableCell sx={{ color: "#1E3A8A" }}>{project.name_project}</TableCell>
                      <TableCell sx={{ color: "#1E3A8A" }}>{formatDate(project.date_creation)}</TableCell>
                      <TableCell>
                        <Avatar
                          variant="rounded"
                          src={project.image}
                          alt={project.name_project}
                          sx={{ width: 50, height: 50 }}
                        />
                      </TableCell>
                      <TableCell>
                        {project.departementId ? (
                          <Chip label={project.departementId.NameDep} sx={{ backgroundColor: "#EDE9FE", color: "#1E3A8A" }} />
                        ) : (
                          <Chip label="Non défini" sx={{ backgroundColor: "#DBEAFE", color: "#1E3A8A" }} />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Modifier">
                          <AnimatedIconButton onClick={() => handleEdit(project)} sx={{ color: "#1E3A8A" }}>
                            <EditIcon />
                          </AnimatedIconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer">
                          <AnimatedIconButton onClick={() => handleDelete(project._id)} sx={{ color: "red" }}>
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
                        <InfoOutlinedIcon sx={{ color: "#1E3A8A" }} />
                        <Typography sx={{ color: "#1E3A8A" }}>Aucun projet trouvé.</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredProjects.length > itemsPerPage && (
            <Box display="flex" justifyContent="center" py={3}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#1E3A8A",
                    "&:hover": {
                      backgroundColor: "#EDE9FE",
                      color: "#914091",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#DBEAFE",
                      color: "#1E3A8A",
                      "&:hover": {
                        backgroundColor: "#EDE9FE",
                        color: "#914091",
                      },
                    },
                  },
                }}
              />
            </Box>
          )}
        </>
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