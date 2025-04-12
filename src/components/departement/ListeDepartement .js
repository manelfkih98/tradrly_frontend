import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartments,
  deleteDepartments,
  createDepartment,
  updateDepartment,
} from "../../store/services/departService";
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
import AddDepartement from "./AddDepartement";

function ListesDepartement() {
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
        dispatch(deleteDepartments(id));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Département supprimé avec succès",
          showConfirmButton: false,
          timer: 1000,
        });
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
    setEditingDepartment(null);
  };

  const handleAddOrUpdateDepartment = (departmentData) => {
    if (editingDepartment) {
      dispatch(updateDepartment(editingDepartment._id, departmentData));
    } else {
      dispatch(createDepartment(departmentData));
    }
    setOpen(false);
  };

  const filteredDepartments = departments.filter(
    (dep) =>
      dep.NameDep.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dep.DescrpDetp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card sx={{ p: 8 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginBottom: 2 }}
      >
        Ajouter un Département
      </Button>
      <TextField
        label="Rechercher un département"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
          Liste des Départements
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
                  <strong>Nom Département</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((dep) => (
                  <TableRow key={dep._id}>
                    <TableCell>{dep.NameDep}</TableCell>
                    <TableCell>{dep.DescrpDetp}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEdit(dep)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(dep._id)}
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
                    Aucun département trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <AddDepartement
        open={open}
        handleClose={handleClose}
        handleSubmit={handleAddOrUpdateDepartment}
        editingDepartment={editingDepartment}
      />
    </Card>
  );
}

export default ListesDepartement;
