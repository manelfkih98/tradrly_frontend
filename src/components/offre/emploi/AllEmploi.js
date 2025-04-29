import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Chip,
  Stack,
  CircularProgress,
  Pagination,
  IconButton,
  Divider,
  InputAdornment,
  Collapse,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddOffreJobIcon from "@mui/icons-material/AddBox";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOffresEmploi,
  deactivateOffreEmploi,
  activateOffreEmploi,
} from "../../../store/services/offreService";
import AddOffreJob from "./addOffreJob";
import UpdateOffreEmploi from "./updateOffreEmploi";

const AllEmploi = () => {
  const dispatch = useDispatch();
  const { offres, loading, error } = useSelector((state) => state.offres) || {};

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    dispatch(fetchOffresEmploi());
  }, [dispatch]);

  const offreList = offres?.offreByJob || [];

  const filteredOffres = offreList.filter(
    (offre) =>
      (offre.titre || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (offre.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (offre.requirements || []).some((req) =>
        req.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const formatDate = (dateString) => {
    if (!dateString) return "Non défini";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(dateString));
  };

  const toggleRequirements = (offreId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [offreId]: !prev[offreId],
    }));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      {/* Header Section */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        gap={2}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            placeholder="Rechercher une offre..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: "100%", sm: 300 } }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 20, textTransform: "none", backgroundColor: "#1e3a8a" }}
          >
            <AddOffreJobIcon sx={{ mr: 1 }} />
            Nouvelle Offre
          </Button>
        </Stack>
      </Stack>

      {/* Modals */}
      <AddOffreJob open={open} handleClose={() => setOpen(false)} />
      <UpdateOffreEmploi
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        offre={selectedOffre}
      />

      {/* Content Section */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" sx={{ my: 4 }}>
          Erreur: {error}
        </Typography>
      ) : (
        <>
          {/* Offer Cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            {filteredOffres
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((offre) => (
                <Card
                  key={offre._id}
                  sx={{
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6" fontWeight="bold" noWrap>
                        {offre.titre}
                      </Typography>
                      <Chip
                        label={offre.status ? "Active" : "Inactive"}
                        color={offre.status ? "success" : "default"}
                        size="small"
                      />
                    </Stack>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {offre.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Stack spacing={1}>
                      <Typography variant="caption">
                        <strong>Publié:</strong> {formatDate(offre.date_publi)}
                      </Typography>
                      <Typography variant="caption">
                        <strong>Clôture:</strong> {formatDate(offre.date_limite)}
                      </Typography>
                      <Typography variant="caption">
                        <strong>Département:</strong>{" "}
                        {offre.departement?.NameDep || "Non défini"}
                      </Typography>
                      <Box>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ mb: 1 }}
                        >
                          <Typography variant="caption">
                            <strong>Exigences:</strong>
                          </Typography>
                          {offre.requirements?.length > 2 && (
                            <Button
                              size="small"
                              endIcon={<ExpandMoreIcon />}
                              onClick={() => toggleRequirements(offre._id)}
                              sx={{
                                textTransform: "none",
                                color: "primary.main",
                                fontSize: "0.75rem",
                              }}
                            >
                              {expandedCards[offre._id] ? "Voir moins" : "Voir plus"}
                            </Button>
                          )}
                        </Stack>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ flexWrap: "wrap", gap: 1 }}
                        >
                          {(offre.requirements || []).slice(0, 2).map((req, index) => (
                            <Chip
                              key={index}
                              label={req}
                              size="small"
                              variant="outlined"
                              sx={{
                                borderRadius: 1,
                                color: "primary.dark",
                              }}
                            />
                          ))}
                        </Stack>
                        {offre.requirements?.length > 2 && (
                          <Collapse in={expandedCards[offre._id]} timeout={300}>
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ flexWrap: "wrap", gap: 1, mt: 1 }}
                            >
                              {offre.requirements.slice(2).map((req, index) => (
                                <Chip
                                  key={index}
                                  label={req.length > 20 ? `${req}` : req}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    borderRadius: 1,
                                    color: "primary.dark",
                                  }}
                                />
                              ))}
                            </Stack>
                          </Collapse>
                        )}
                        {(offre.requirements || []).length === 0 && (
                          <Typography variant="caption" color="text.secondary">
                            Aucune exigence
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
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
                      sx={{ flexGrow: 1, borderRadius: 20 }}
                    >
                      {offre.status ? "Désactiver" : "Activer"}
                    </Button>
                  </CardActions>
                </Card>
              ))}
          </Box>

          {/* Pagination */}
          {filteredOffres.length > rowsPerPage && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={Math.ceil(filteredOffres.length / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
             
                size="medium"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#1e3a8a",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#d4af37",
                      color: "#ffffff",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#1e3a8a",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#d4af37",
                      },
                    },
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default AllEmploi;