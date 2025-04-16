import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartments,
  deleteDepartments,
  createDepartment,
  updateDepartment,
} from "../../store/services/departService";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import Swal from "sweetalert2";
import AddDepartement from "./AddDepartement";
import { styled } from "@mui/material/styles";

// Définir le bouton animé avec une transition
const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.2)",
  },
}));

const ListesDepartement = () => {
  const dispatch = useDispatch();
  const { departments, loading, error } = useSelector(
    (state) => state.departments
  );

  const [open, setOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Supprimer ce département ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDepartments(id));
        Swal.fire("Supprimé", "Le département a été supprimé.", "success");
      }
    });
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setOpen(true);
  };

  const handleOpen = () => {
    setEditingDepartment(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingDepartment(null);
  };

  const handleAddOrUpdateDepartment = (data) => {
    editingDepartment
      ? dispatch(updateDepartment(editingDepartment._id, data))
      : dispatch(createDepartment(data));
    setOpen(false);
  };

  const filteredDepartments = departments.filter((dep) =>
    `${dep.NameDep} ${dep.DescrpDetp}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    < Box elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ borderRadius: 2 }}
        >
          Nouveau Département
        </Button>
      </Box>

      <Box display="flex" gap={2} alignItems="center" mb={3}>
        <SearchIcon color="action" />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Rechercher par nom ou description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
      ) : error ? (
        <Typography color="error" align="center">
          Erreur : {error}
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f4f6f8" }}>
                <TableCell><strong>Nom</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((dep) => (
                  <TableRow key={dep._id} hover>
                    <TableCell>{dep.NameDep}</TableCell>
                    <TableCell>{dep.DescrpDetp}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Modifier">
                        <AnimatedIconButton
                          color="primary"
                          onClick={() => handleEdit(dep)}
                        >
                          <EditIcon />
                        </AnimatedIconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <AnimatedIconButton
                          color="error"
                          onClick={() => handleDelete(dep._id)}
                        >
                          <DeleteIcon />
                        </AnimatedIconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Box display="flex" alignItems="center" justifyContent="center" py={4} gap={1}>
                      <InfoOutlinedIcon color="disabled" />
                      <Typography>Aucun département trouvé.</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <AddDepartement
        open={open}
        handleClose={handleClose}
        handleSubmit={handleAddOrUpdateDepartment}
        editingDepartment={editingDepartment}
      />
    </Box>
  );
};

export default ListesDepartement;
