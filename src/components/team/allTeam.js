import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam, deleteTeam } from "../../store/services/teamService";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  CircularProgress,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  TablePagination,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import AddTeamMember from "./AddTeamMember";
import EditTeamMember from "./EditTeamMember";

function AllTeam() {
  const dispatch = useDispatch();
  const { teams = [], loading } = useSelector((state) => state.teams);

  // Dialog & edit state
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Supprimer ce membre ?",
      text: "Cette action est irréversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTeam(id));
      }
    });
  };

  const handleEdit = (team) => {
    setSelectedTeam(team);
    setEditMode(true);
  };
  const handleCancelEdit = () => {
    setSelectedTeam(null);
    setEditMode(false);
  };
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  // Pagination handlers
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Gestion des Membres de l'Équipe
      </Typography>

      <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ mb: 2 }}>
        + Ajouter un membre
      </Button>

      {/* Add Member Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Ajouter un membre</DialogTitle>
        <DialogContent dividers>
          <AddTeamMember
            onMemberAdded={() => {
              dispatch(fetchTeam());
              handleCloseDialog();
            }}
          />
        </DialogContent>
      </Dialog>

      <Card elevation={3}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell><strong>Nom</strong></TableCell>
                    <TableCell><strong>Poste</strong></TableCell>
                    <TableCell><strong>Citation</strong></TableCell>
                    <TableCell><strong>LinkedIn</strong></TableCell>
                    <TableCell><strong>Image</strong></TableCell>
                    <TableCell align="center"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teams
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((team) => (
                      <TableRow key={team._id} hover sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}>
                        <TableCell>{team.name}</TableCell>
                        <TableCell>{team.title}</TableCell>
                        <TableCell>{team.quote}</TableCell>
                        <TableCell>
                          {team.linkedin ? (
                            <a
                              href={team.linkedin.startsWith("http") ? team.linkedin : `https://${team.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ display: "flex", alignItems: "center", color: "#0a66c2", textDecoration: "none" }}
                            >
                              <LinkedInIcon fontSize="small" sx={{ mr: 0.5 }} />
                              LinkedIn
                            </a>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell>
                          <img
                            src={team.image}
                            alt={team.name}
                            style={{ width: 60, height: 60, objectFit: "cover", borderRadius: "50%", border: "2px solid #ccc" }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton color="primary" onClick={() => handleEdit(team)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDelete(team._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Styled Pagination */}
            <Box
              sx={{
                mt: 1,
                p: 1,
                display: "flex",
                justifyContent: "flex-end",
                bgcolor: "#f4f6f8",
                borderRadius: 2,
              }}
            >
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={teams.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  ".MuiTablePagination-toolbar": {
                    minHeight: 48,
                    px: 0,
                  },
                  ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                    fontSize: "0.9rem",
                  },
                  ".MuiTablePagination-select": {
                    mr: 1,
                  },
                  ".MuiTablePagination-actions": {
                    "& button": { color: "primary.main" },
                  },
                }}
              />
            </Box>
          </>
        )}
      </Card>

      {/* Edit Member Dialog */}
      <Dialog open={editMode} onClose={handleCancelEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Modifier un membre</DialogTitle>
        <DialogContent dividers>
          <EditTeamMember
            selectedTeam={selectedTeam}
            onCancel={handleCancelEdit}
            onMemberUpdated={() => {
              dispatch(fetchTeam());
              handleCancelEdit();
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default AllTeam;
