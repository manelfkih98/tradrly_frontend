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
  Pagination,
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

const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  transition: "transform 0.2s ease-in-out, color 0.3s ease, background-color 0.3s ease",
  "&:hover": {
    transform: "scale(1.2)",
    color: "#914091",
    backgroundColor: "#EDE9FE",
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
      confirmButtonColor: "#914091",
      cancelButtonColor: "#1E3A8A",
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDepartments = filteredDepartments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <Box>
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
          Nouveau Département
        </Button>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Rechercher par nom ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        </Box>
      </Box>

      <Divider sx={{ mb: 4, borderColor: "#E5E7EB" }} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress sx={{ color: "#1E3A8A" }} />
        </Box>
      ) : error ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 4,
            gap: 1,
          }}
        >
          <ErrorOutlineIcon sx={{ color: "#1E3A8A" }} />
          <Typography color="#1E3A8A" align="center">
            Erreur : {error}
          </Typography>
        </Box>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#FFFFFF",
              overflowX: "auto",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#EDE9FE" }}>
                  <TableCell
                    sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}
                  >
                    Nom
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentDepartments.length > 0 ? (
                  currentDepartments.map((dep, index) => (
                    <TableRow
                      key={dep._id}
                      hover
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
                        "&:hover": { backgroundColor: "#DBEAFE" },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <TableCell sx={{ py: 2, px: 3, fontSize: "0.9rem", color: "#1E3A8A" }}>
                        {dep.NameDep}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 3, fontSize: "0.9rem", color: "#1E3A8A" }}>
                        {dep.DescrpDetp}
                      </TableCell>
                      <TableCell align="center" sx={{ py: 2, px: 3 }}>
                        <Tooltip title="Modifier">
                          <AnimatedIconButton
                            onClick={() => handleEdit(dep)}
                            sx={{ color: "#1E3A8A" }}
                          >
                            <EditIcon />
                          </AnimatedIconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer">
                          <AnimatedIconButton
                            onClick={() => handleDelete(dep._id)}
                            sx={{ color: "red" }}
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
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        py={4}
                        gap={1}
                      >
                        <InfoOutlinedIcon sx={{ color: "#1E3A8A" }} />
                        <Typography
                          sx={{ color: "#1E3A8A", fontWeight: 500 }}
                        >
                          Aucun département trouvé.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredDepartments.length > itemsPerPage && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={Math.ceil(filteredDepartments.length / itemsPerPage)}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                shape="rounded"
                size="medium"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#1E3A8A",
                    fontWeight: "bold",
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