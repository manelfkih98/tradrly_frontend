import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOffresEmploi,
  deactivateOffreEmploi,
  activateOffreEmploi
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
  TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddOffreJob from "./addOffreJob";
import UpdateOffreEmploi from "./updateOffreEmploi";

function AllEmploi() {
  const dispatch = useDispatch();
  const { offres, loading, error } = useSelector((state) => state.offres) || {};

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <Card sx={{ p: 8 }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={() => setOpen(true)}
      >
        Ajouter une offre d'emploi
      </Button>
      
      <TextField
        label="Rechercher par titre"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
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
        <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
          Liste des offres d'emploi
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
                  <strong>Titre</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Statut</strong>
                </TableCell>
                <TableCell>
                  <strong>Date de publication</strong>
                </TableCell>
                <TableCell>
                  <strong>Date de clôture</strong>
                </TableCell>
                <TableCell>
                  <strong>Département</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOffres.length > 0 ? (
                filteredOffres.map((offre) => (
                  <TableRow key={offre._id}>
                    <TableCell>{offre.titre}</TableCell>
                    <TableCell>{offre.description}</TableCell>
                    <TableCell>
                      {offre.status === true ? "Déactiver" : "Activer"}
                    </TableCell>
                    <TableCell>{formatDate(offre.date_publi)}</TableCell>
                    <TableCell>{formatDate(offre.date_limite)}</TableCell>
                    <TableCell>
                      {offre.departement?.NameDep || "Non défini"}
                    </TableCell>
                    <TableCell>
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
                        variant="contained"
                        color={offre.status === true ? "success" : "secondary"}
                        onClick={() => {
                          if (offre.status === true) {
                            dispatch(deactivateOffreEmploi(offre._id));
                          } else {
                            dispatch(activateOffreEmploi(offre._id));
                          }
                        }}
                      >
                        {offre.status === true ? "Activer" : "Déactiver"}
                      </Button>
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
    </Card>
  );
};

export default AllEmploi;
