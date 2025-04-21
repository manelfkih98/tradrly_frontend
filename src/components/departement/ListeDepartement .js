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
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Swal from "sweetalert2";
import AddDepartement from "./AddDepartement";
import { styled } from "@mui/material/styles";

// Définir le bouton animé avec une transition
const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  transition: "transform 0.2s ease-in-out, color 0.3s ease",
  "&:hover": {
    transform: "scale(1.2)",
    color: "#d4af37",
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
      confirmButtonColor: "#b91c1c",
      cancelButtonColor: "#1e3a8a",
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
    <Box
    
    >
     

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
      >
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
          Nouveau Département
        </Button>

        <Box display="flex" alignItems="center" gap={1} sx={{ width: { xs: "100%", sm: "auto" } }}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Rechercher par nom ou description..."
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
        </Box>
      </Box>

      <Divider sx={{ mb: 4, borderColor: "#e5e7eb" }} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress sx={{ color: "#1e3a8a" }} />
        </Box>
      ) : error ? (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 4, gap: 1 }}>
          <ErrorOutlineIcon sx={{ color: "#b91c1c" }} />
          <Typography color="#b91c1c" align="center">
            Erreur : {error}
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
                  Nom
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: 700, fontSize: "1rem", py: 3 }}>
                  Description
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
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((dep, index) => (
                  <TableRow
                    key={dep._id}
                    hover
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
                      "&:hover": { backgroundColor: "#f1f5f9" },
                    }}
                  >
                    <TableCell sx={{ py: 2, px: 3, fontSize: "0.9rem" }}>
                      {dep.NameDep}
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 3, fontSize: "0.9rem" }}>
                      {dep.DescrpDetp}
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
                          onClick={() => handleEdit(dep)}
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
                          onClick={() => handleDelete(dep._id)}
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
                  <TableCell colSpan={3} align="center">
                    <Box display="flex" alignItems="center" justifyContent="center" py={4} gap={1}>
                      <InfoOutlinedIcon sx={{ color: "#1e3a8a" }} />
                      <Typography sx={{ color: "#1e3a8a", fontWeight: 500 }}>
                        Aucun département trouvé.
                      </Typography>
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