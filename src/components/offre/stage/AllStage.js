import React, { useEffect, useState } from "react";
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
  TablePagination,
  TextField,
  Chip,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOffresStage,
  deactivateOffreStage,
  activateOffreStage,
} from "../../../store/services/offreService";
import AddOffreStage from "./addOffreStage";
import UpdateOffreStage from "./updateOffre";

const AllStage = () => {
  const dispatch = useDispatch();
  const { offres, loading, error } = useSelector((state) => state.offres) || {};

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchOffresStage());
  }, [dispatch]);

  const offreList = offres?.offreByStage || [];

  const filteredOffres = offreList.filter(
    (offre) =>
      offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offre.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return "Non défini";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(dateString));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Ajouter une offre de stage
        </Button>
      </Stack>

      <TextField
        label="Rechercher une offre"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <AddOffreStage open={open} handleClose={() => setOpen(false)} />
      <UpdateOffreStage
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        offre={selectedOffre}
      />

      <TableContainer component={Paper}>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto", my: 4 }} />
        ) : error ? (
          <Typography color="error" align="center" sx={{ my: 4 }}>
            Erreur: {error}
          </Typography>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell><strong>Titre</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Statut</strong></TableCell>
                  <TableCell><strong>Date de publication</strong></TableCell>
                  <TableCell><strong>Date de clôture</strong></TableCell>
                  <TableCell><strong>Département</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOffres
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((offre) => (
                    <TableRow key={offre._id}>
                      <TableCell>{offre.titre}</TableCell>
                      <TableCell>{offre.description}</TableCell>
                      <TableCell>
                        <Chip
                          label={offre.status ? "Active" : "Inactive"}
                          color={offre.status ? "success" : "default"}
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
                            variant="outlined"
                            color={offre.status ? "error" : "success"}
                            onClick={() => {
                              if (offre.status) {
                                dispatch(deactivateOffreStage(offre._id));
                              } else {
                                dispatch(activateOffreStage(offre._id));
                              }
                            }}
                          >
                            {offre.status ? "Désactiver" : "Activer"}
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredOffres.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Lignes par page"
            />
          </>
        )}
      </TableContainer>
    </Card>
  );
};

export default AllStage;
