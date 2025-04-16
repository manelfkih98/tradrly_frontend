import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOffresEmploi,
  deactivateOffreEmploi,
  activateOffreEmploi,
} from "../../../store/services/offreService";
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
  Chip,
  Stack,
  Box,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AddOffreJob from "./addOffreJob";
import UpdateOffreEmploi from "./updateOffreEmploi";

function AllEmploi() {
  const dispatch = useDispatch();
  const { offres, loading, error } = useSelector((state) => state.offres) || {};

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchOffresEmploi());
  }, [dispatch]);

  const offreList = offres?.offreByJob || [];

  const formatDate = (dateString) => {
    if (!dateString) return "Non défini";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(dateString));
  };

  const filteredOffres = offreList.filter((offre) =>
    offre.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate the filtered offers
  const paginatedOffres = filteredOffres.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page is changed
  };

  return (
    <Card sx={{ p: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
      
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Ajouter une offre
        </Button>
      </Box>

      <TextField
        label="Rechercher par titre"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <AddOffreJob open={open} handleClose={() => setOpen(false)} />
      <UpdateOffreEmploi
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        offre={selectedOffre}
      />

      <TableContainer component={Paper}>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto", my: 5 }} />
        ) : error ? (
          <Typography color="error" align="center">
            Erreur: {error}
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>Titre</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Statut</strong></TableCell>
                <TableCell><strong>Date publication</strong></TableCell>
                <TableCell><strong>Date clôture</strong></TableCell>
                <TableCell><strong>Département</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOffres.length > 0 ? (
                paginatedOffres.map((offre) => (
                  <TableRow key={offre._id}>
                    <TableCell>{offre.titre}</TableCell>
                    <TableCell>{offre.description}</TableCell>
                    <TableCell>
                      <Chip
                        label={offre.status ? "Active" : "Inactive"}
                        color={offre.status ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{formatDate(offre.date_publi)}</TableCell>
                    <TableCell>{formatDate(offre.date_limite)}</TableCell>
                    <TableCell>{offre.departement?.NameDep || "Non défini"}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setSelectedOffre(offre);
                            setEditOpen(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <Button
                          size="small"
                          variant="outlined"
                          color={offre.status ? "error" : "success"}
                          onClick={() => {
                            if (offre.status) {
                              dispatch(deactivateOffreEmploi(offre._id));
                            } else {
                              dispatch(activateOffreEmploi(offre._id));
                            }
                          }}
                        >
                          {offre.status ? "Désactiver" : "Activer"}
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Aucune offre trouvée.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

     
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredOffres.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default AllEmploi;
