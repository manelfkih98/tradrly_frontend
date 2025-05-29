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
  Tooltip,
  TextField,
  Grid,
  Pagination,
  InputAdornment,
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

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "#1E3A8A",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#914091",
    backgroundColor: "#EDE9FE",
    transform: "scale(1.2)",
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#F8FAFC",
    border: "1px solid #E5E7EB",
    borderRadius: 3,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    maxWidth: "450px",
    margin: "auto",
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontWeight: 800,
  fontSize: "1.4rem",
  backgroundColor: "#EDE9FE",
  color: "#1E3A8A",
  borderRadius: "8px 8px 0 0",
  padding: "16px 24px",
  textAlign: "center",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  textTransform: "none",
  padding: "10px 24px",
  fontWeight: 600,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: "#F8FAFC",
    transition: "all 0.3s ease",
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
  "& .MuiInputLabel-root": {
    color: "#1E3A8A",
    "&.Mui-focused": {
      color: "#914091",
    },
  },
}));

const LinkedInLink = styled("a")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: "#1E3A8A",
  textDecoration: "none",
  transition: "color 0.3s ease, transform 0.2s ease-in-out",
  "&:hover": {
    color: "#914091",
    transform: "scale(1.1)",
  },
}));

function AllTeam() {
  const dispatch = useDispatch();
  const { teams = [], loading } = useSelector((state) => state.teams);

  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(null);
  const rowsPerPage = 4;

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  const filteredTeams = teams.filter(
    (team) =>
      (team.name && team.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (team.title && team.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `Supprimer ${name} ?`,
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#1E3A8A",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      background: "#EDE9FE",
      customClass: {
        confirmButton: "swal-confirm-button",
        
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsDeleting(id);
        const response = await dispatch(deleteTeam(id));
        setIsDeleting(null);
        console.log("Delete response:", response);
      
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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedTeams = filteredTeams.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        backgroundColor: "#F8FAFC",
        maxWidth: "1200px",
        mx: "auto",
        my: 4,
      }}
    >
      <style>
        {`
          .swal-confirm-button {
            background-color: #914091 !important;
            color: #FFFFFF !important;
            border-radius: 8px !important;
            transition: all 0.3s ease !important;
          }
          .swal-confirm-button:hover {
            background-color: #7E3A8A !important;
            boxShadow: 0 4px 8px rgba(145, 64, 145, 0.3) !important;
            transform: translateY(-2px) !important;
          }
          .swal-cancel-button {
            border: 1px solid #1E3A8A !important;
            color: #1E3A8A !important;
            border-radius: 8px !important;
            transition: all 0.3s ease !important;
          }
          .swal-cancel-button:hover {
            background-color: #EDE9FE !important;
            color: #914091 !important;
            border-color: #914091 !important;
            transform: translateY(-2px) !important;
          }
        `}
      </style>

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
      >
        <Grid item sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
          <StyledTextField
            fullWidth
            variant="outlined"
            placeholder="Rechercher un membre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#1E3A8A", transition: "color 0.3s" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <StyledButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{
              backgroundColor: "#914091",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#7E3A8A",
                boxShadow: "0 4px 8px rgba(145, 64, 145, 0.3)",
              },
            }}
          >
            Ajouter un membre
          </StyledButton>
        </Grid>
      </Grid>

      <StyledDialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <StyledDialogTitle>Ajouter un membre</StyledDialogTitle>
        <DialogContent sx={{ px: { xs: 3, sm: 4 }, pt: 2, mt: 1 }}>
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
          <CircularProgress sx={{ color: "#1E3A8A" }} />
        </Box>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
              backgroundColor: "#F8FAFC",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              overflowX: "auto",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#EDE9FE" }}>
                  <TableCell sx={{ color: "#1E3A8A", fontWeight: 700, fontSize: "1rem", py: 3 }}>
                    Nom
                  </TableCell>
                  <TableCell sx={{ color: "#1E3A8A", fontWeight: 700, fontSize: "1rem", py: 3 }}>
                    Poste
                  </TableCell>
                  <TableCell sx={{ color: "#1E3A8A", fontWeight: 700, fontSize: "1rem", py: 3 }}>
                    Citation
                  </TableCell>
                  <TableCell sx={{ color: "#1E3A8A", fontWeight: 700, fontSize: "1rem", py: 3 }}>
                    LinkedIn
                  </TableCell>
                  <TableCell sx={{ color: "#1E3A8A", fontWeight: 700, fontSize: "1rem", py: 3 }}>
                    Image
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#1E3A8A", fontWeight: 700, fontSize: "1rem", py: 3 }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedTeams.length > 0 ? (
                  paginatedTeams.map((team, index) => (
                    <TableRow
                      key={team._id}
                      hover
                      sx={{
                        backgroundColor: "#F8FAFC",
                        "&:hover": { backgroundColor: "#EDE9FE" },
                      }}
                    >
                      <TableCell sx={{ py: 2, px: 3, fontSize: "0.9rem", color: "#1E3A8A" }}>
                        {team.name}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 3, fontSize: "0.9rem", color: "#1E3A8A" }}>
                        {team.title}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 3, fontSize: "0.9rem", color: "#1E3A8A" }}>
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
                          <Typography sx={{ color: "#1E3A8A", opacity: 0.7 }}>—</Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 3 }}>
                        {team.image ? (
                          <img
                            src={team.image}
                            alt={team.name}
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                              borderRadius: "50%",
                              border: "1px solid #E5E7EB",
                            }}
                            onError={(e) => (e.target.src = "/fallback-image.png")}
                          />
                        ) : (
                          <Typography sx={{ color: "#1E3A8A", opacity: 0.7 }}>—</Typography>
                        )}
                      </TableCell>
                      <TableCell align="center" sx={{ py: 2, px: 3 }}>
                        <Tooltip title="Modifier">
                          <StyledIconButton
                            onClick={() => handleEdit(team)}
                            disabled={isDeleting === team._id}
                          >
                            <EditIcon />
                          </StyledIconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer">
                          <StyledIconButton
                            onClick={() => handleDelete(team._id, team.name)}
                            disabled={isDeleting === team._id}
                            sx={{ color: "#EF4444", "&:hover": { color: "#EF4444" } }}
                          >
                            {isDeleting === team._id ? (
                              <CircularProgress size={20} sx={{ color: "#EF4444" }} />
                            ) : (
                              <DeleteIcon />
                            )}
                          </StyledIconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Box display="flex" alignItems="center" justifyContent="center" py={4} gap={1}>
                        <Typography sx={{ color: "#1E3A8A", fontWeight: 500 }}>
                          Aucun membre trouvé.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredTeams.length > rowsPerPage && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination
                count={Math.ceil(filteredTeams.length / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
                shape="rounded"
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

      <StyledDialog open={editMode} onClose={handleCancelEdit} maxWidth="xs" fullWidth>
        <StyledDialogTitle>Modifier un membre</StyledDialogTitle>
        <DialogContent sx={{ px: { xs: 3, sm: 4 }, pt: 2, mt: 1 }}>
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