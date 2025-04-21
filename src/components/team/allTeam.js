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
  TablePagination,
  Tooltip,
  TextField,
  Grid,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";
import AddTeamMember from "./AddTeamMember";
import EditTeamMember from "./EditTeamMember";
import { styled } from "@mui/material/styles";

// Bouton animé pour les actions
const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  transition: "transform 0.2s ease-in-out, color 0.3s ease",
  "&:hover": {
    transform: "scale(1.2)",
    color: "#d4af37",
  },
}));

// Dialog stylisé avec effet de verre dépoli
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 20,
    backdropFilter: "blur(8px)",
    background: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
    border: `1px solid ${theme.palette.grey[200]}`,
    transition: "all 0.4s ease-in-out",
    maxWidth: "450px",
    margin: "auto",
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontWeight: 800,
  fontSize: "1.4rem",
  backgroundColor: "#1e3a8a",
  color: "#fff",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: "16px 24px",
  textAlign: "center",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  textTransform: "none",
  padding: "10px 24px",
  fontWeight: 600,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
}));

const LinkedInLink = styled("a")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: "#0a66c2",
  textDecoration: "none",
  transition: "color 0.3s ease, transform 0.2s ease-in-out",
  "&:hover": {
    color: "#d4af37",
    transform: "scale(1.1)",
  },
}));

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

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  // Filtrer les membres en fonction du terme de recherche
  const filteredTeams = teams.filter(
    (team) =>
      (team.name && team.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (team.title && team.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Réinitialiser la page à 0 lors de la modification du terme de recherche
  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Supprimer ce membre ?",
      text: "Cette action est irréversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b91c1c",
      cancelButtonColor: "#1e3a8a",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTeam(id));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Membre supprimé avec succès",
          showConfirmButton: false,
          timer: 1000,
        });
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
            placeholder="Rechercher un membre..."
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
          <StyledButton
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: "1.5rem" }} />}
            onClick={handleOpenDialog}
            sx={{
              backgroundColor: "#1e3a8a",
              color: "#ffffff",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              "&:hover": {
                backgroundColor: "#d4af37",
              },
            }}
          >
            Ajouter un membre
          </StyledButton>
        </Grid>
      </Grid>

      {/* Add Member Dialog */}
      <StyledDialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <StyledDialogTitle>Ajouter un membre</StyledDialogTitle>
        <DialogContent dividers sx={{ px: { xs: 3, sm: 4 }, pt: { xs: 2, sm: 3 } }}>
          <AddTeamMember
            onMemberAdded={() => {
              dispatch(fetchTeam());
              handleCloseDialog();
            }}
          />
        </DialogContent>
      </StyledDialog>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress sx={{ color: "#1e3a8a" }} />
        </Box>
      ) : (
        <>
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
                    Poste
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: 700, fontSize: "1rem", py: 3 }}>
                    Citation
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: 700, fontSize: "1rem", py: 3 }}>
                    LinkedIn
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: 700, fontSize: "1rem", py: 3 }}>
                    Image
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
                {filteredTeams.length > 0 ? (
                  filteredTeams
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((team, index) => (
                      <TableRow
                        key={team._id}
                        hover
                        sx={{
                          backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
                          "&:hover": { backgroundColor: "#f1f5f9" },
                        }}
                      >
                        <TableCell sx={{ py: 2, px: 3, fontSize: "0.9rem" }}>
                          {team.name}
                        </TableCell>
                        <TableCell sx={{ py: 2, px: 3, fontSize: "0.9rem" }}>
                          {team.title}
                        </TableCell>
                        <TableCell sx={{ py: 2, px: 3, fontSize: "0.9rem" }}>
                          {team.quote}
                        </TableCell>
                        <TableCell sx={{ py: 2, px: 3 }}>
                          {team.linkedin ? (
                            <LinkedInLink
                              href={
                                team.linkedin.startsWith("http")
                                  ? team.linkedin
                                  : `https://${team.linkedin}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <LinkedInIcon fontSize="small" sx={{ mr: 0.5 }} />
                              LinkedIn
                            </LinkedInLink>
                          ) : (
                            <Typography sx={{ color: "#6b7280" }}>—</Typography>
                          )}
                        </TableCell>
                        <TableCell sx={{ py: 2, px: 3 }}>
                          <img
                            src={team.image}
                            alt={team.name}
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                              borderRadius: "50%",
                              border: "1px solid #e5e7eb",
                            }}
                          />
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
                              onClick={() => handleEdit(team)}
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
                              onClick={() => handleDelete(team._id)}
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
                    <TableCell colSpan={6} align="center">
                      <Box display="flex" alignItems="center" justifyContent="center" py={4} gap={1}>
                        <Typography sx={{ color: "#1e3a8a", fontWeight: 500 }}>
                          Aucun membre trouvé.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Styled Pagination */}
          <Box
            sx={{
              mt: 2,
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
              count={filteredTeams.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                ".MuiTablePagination-toolbar": {
                  minHeight: 48,
                  px: 2,
                },
                ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                  fontSize: "0.9rem",
                  color: "#1e3a8a",
                },
                ".MuiTablePagination-select": {
                  mr: 1,
                  backgroundColor: "#ffffff",
                  borderRadius: 1,
                  border: "1px solid #e5e7eb",
                },
                ".MuiTablePagination-actions": {
                  "& button": {
                    color: "#1e3a8a",
                    "&:hover": { color: "#d4af37" },
                  },
                },
              }}
            />
          </Box>
        </>
      )}

      {/* Edit Member Dialog */}
      <StyledDialog open={editMode} onClose={handleCancelEdit} maxWidth="xs" fullWidth>
        <StyledDialogTitle>Modifier un membre</StyledDialogTitle>
        <DialogContent dividers sx={{ px: { xs: 3, sm: 4 }, pt: { xs: 2, sm: 3 } }}>
          <EditTeamMember
            selectedTeam={selectedTeam}
            onCancel={handleCancelEdit}
            onMemberUpdated={() => {
              dispatch(fetchTeam());
              handleCancelEdit();
            }}
          />
        </DialogContent>
      </StyledDialog>
    </Box>
  );
}

export default AllTeam;