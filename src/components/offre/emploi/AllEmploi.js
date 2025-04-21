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
    <Card sx={{ p: 4, bgcolor: '#fafafa' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#1e3a8a',
            '&:hover': { bgcolor: '#d4af37', color: '#1e3a8a' },
            fontWeight: 'bold',
          }}
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
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderColor: '#d4af37' },
            '&.Mui-focused fieldset': { borderColor: '#1e3a8a' },
          },
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <AddOffreJob open={open} handleClose={() => setOpen(false)} />
      <UpdateOffreEmploi
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        offre={selectedOffre}
      />

      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto", my: 5 }} />
        ) : error ? (
          <Typography color="error" align="center" sx={{ py: 5 }}>
            Erreur: {error}
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1e3a8a' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Titre</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Exigence</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Statut</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date publication</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date clôture</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Département</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOffres.length > 0 ? (
                paginatedOffres.map((offre) => (
                  <TableRow
                    key={offre._id}
                    sx={{
                      '&:hover': { backgroundColor: '#f5f5f5' },
                      transition: 'background-color 0.2s',
                    }}
                  >
                    <TableCell sx={{ fontSize: '0.9rem' }}>{offre.titre}</TableCell>
                    <TableCell sx={{ fontSize: '0.9rem' }}>
                      {offre.description.length > 100
                        ? `${offre.description.substring(0, 100)}...`
                        : offre.description}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 200, maxHeight: 100, overflowY: 'auto' }}>
                      {offre.requirements && offre.requirements.length > 0 ? (
                        <ul
                          style={{
                            margin: 0,
                            paddingLeft: '20px',
                            listStyleType: 'none',
                          }}
                        >
                          {offre.requirements.map((req, index) => (
                            <li
                              key={`${offre._id}-req-${index}`}
                              style={{
                                fontSize: '0.85rem',
                                color: '#1e3a8a',
                                marginBottom: '4px',
                                position: 'relative',
                                paddingLeft: '16px',
                              }}
                            >
                              <span
                                style={{
                                  position: 'absolute',
                                  left: 0,
                                  top: '4px',
                                  width: '6px',
                                  height: '6px',
                                  backgroundColor: '#d4af37',
                                  borderRadius: '50%',
                                }}
                              />
                              {req}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Aucune exigence
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={offre.status ? "Active" : "Inactive"}
                        color={offre.status ? "success" : "default"}
                        size="small"
                        sx={{ fontWeight: 'medium' }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.9rem' }}>{formatDate(offre.date_publi)}</TableCell>
                    <TableCell sx={{ fontSize: '0.9rem' }}>{formatDate(offre.date_limite)}</TableCell>
                    <TableCell sx={{ fontSize: '0.9rem' }}>
                      {offre.departement?.NameDep || "Non défini"}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          sx={{
                            color: '#1e3a8a',
                            '&:hover': { color: '#d4af37' },
                          }}
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
                          sx={{
                            borderColor: offre.status ? '#d32f2f' : '#2e7d32',
                            color: offre.status ? '#d32f2f' : '#2e7d32',
                            '&:hover': {
                              borderColor: '#d4af37',
                              color: '#d4af37',
                            },
                          }}
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
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body1" color="text.secondary">
                      Aucune offre trouvée.
                    </Typography>
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
        sx={{
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            color: '#1e3a8a',
          },
        }}
      />
    </Card>
  );
}

export default AllEmploi;