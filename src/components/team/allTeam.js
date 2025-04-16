import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam, deleteTeam } from "../../store/services/teamService";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

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
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import AddTeamMember from "./AddTeamMember"; // ✅ Formulaire
import EditTeamMember from "./EditTeamMember"; // importer le nouveau composant

function AllTeam() {
  const dispatch = useDispatch();
  const { teams, loading } = useSelector((state) => state.teams);
  const [editMode, setEditMode] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Gestion de l'équipe
      </Typography>

      {/* ✅ Bouton pour ouvrir la popup */}
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Ajouter un membre
      </Button>

      {/* ✅ Modal Dialog contenant AddTeamMember */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Ajouter un membre de l'équipe</DialogTitle>
        <DialogContent dividers>
          <AddTeamMember
            onMemberAdded={() => {
              dispatch(fetchTeam());
              handleCloseDialog();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Liste des membres */}
      <Card sx={{ mt: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Poste</TableCell>
                  <TableCell>Citation</TableCell>
                  <TableCell>LinkedIn</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams?.map((team) => (
                  <TableRow key={team._id}>
                    <TableCell>{team.name}</TableCell>
                    <TableCell>{team.title}</TableCell>
                    <TableCell>{team.quote}</TableCell>
                    <TableCell>
                      {team.linkedin ? (
                        <a
                          href={
                            team.linkedin.startsWith("http")
                              ? team.linkedin
                              : `https://${team.linkedin}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            color: "#0a66c2",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <LinkedInIcon />
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
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(team)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(team._id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
      {/* Modal pour modification */}
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
