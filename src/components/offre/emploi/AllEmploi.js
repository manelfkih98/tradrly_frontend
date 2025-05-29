import React, { useEffect, useState, useMemo } from "react";
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
  Select,
  MenuItem,
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
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
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

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "#1E3A8A",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#914091",
    backgroundColor: "#EDE9FE",
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: 4,
  transition: "all 0.3s ease",
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: 10,
  backgroundColor: "#F8FAFC",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#1E3A8A",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#914091",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#914091",
  },
  "& .MuiSelect-select": {
    padding: "8px 14px",
    color: "#1E3A8A",
  },
}));

const AllEmploi = () => {
  const dispatch = useDispatch();
  const { offres, loading, error } = useSelector((state) => state.offres) || {};

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDep, setSelectedDep] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    dispatch(fetchOffresEmploi());
  }, [dispatch]);

  const offreList = offres?.offreByJob && Array.isArray(offres.offreByJob)
    ? offres.offreByJob
    : [];

  const departments = useMemo(() => {
    const depSet = new Set(offreList.map((offre) => offre.departement?.NameDep).filter(Boolean));
    return [...depSet];
  }, [offreList]);

  const filteredOffres = useMemo(() => {
    return offreList.filter((offre) => {
      const titre = offre.titre || "";
      const description = offre.description || "";
      const requirements = Array.isArray(offre.requirements) ? offre.requirements : [];
      const depMatch = !selectedDep || offre.departement?.NameDep === selectedDep;
      const searchMatch =
        titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        requirements.some(
          (req) =>
            typeof req === "string" && req.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return depMatch && searchMatch;
    });
  }, [offreList, searchTerm, selectedDep]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredOffres.length / rowsPerPage);
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  }, [filteredOffres.length, page, rowsPerPage]);

  const formatDate = (dateString) => {
    if (!dateString) return "Non défini";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Date invalide"
      : new Intl.DateTimeFormat("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(date);
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

  const handleToggleStatus = (offre) => {
    const isActivating = !offre.status;
    Swal.fire({
      title: `Voulez-vous ${isActivating ? "activer" : "désactiver"} cette offre ?`,
      text: `L'offre "${offre.titre}" sera ${isActivating ? "activée" : "désactivée"}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#914091",
      cancelButtonColor: "#1E3A8A",
      confirmButtonText: isActivating ? "Activer" : "Désactiver",
      cancelButtonText: "Annuler",
      customClass: {
        confirmButton: "swal-confirm-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const action = isActivating
          ? activateOffreEmploi(offre._id)
          : deactivateOffreEmploi(offre._id);
        dispatch(action)
          .then(() => {
            dispatch(fetchOffresEmploi());
          })
          .catch((error) => {
            console.error("Error in dispatch:", error);
            dispatch(fetchOffresEmploi());
          });
      }
    });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto",  }}>
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

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        gap={2}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: { xs: "100%", sm: "auto" } }}>
          <StyledTextField
            placeholder="Rechercher une offre..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#1E3A8A", transition: "color 0.3s" }} />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: "100%", sm: 300 } }}
            aria-label="Rechercher une offre"
          />
          <StyledSelect
            value={selectedDep}
            onChange={(e) => setSelectedDep(e.target.value)}
            displayEmpty
            size="small"
            sx={{ width: { xs: "100%", sm: 200 } }}
            aria-label="Filtrer par département"
          >
            <MenuItem value="">Tous les départements</MenuItem>
            {departments.map((dep) => (
              <MenuItem key={dep} value={dep}>
                {dep}
              </MenuItem>
            ))}
          </StyledSelect>
        </Stack>
        <StyledButton
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: "#914091",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#7E3A8A",
              boxShadow: "0 4px 8px rgba(145, 64, 145, 0.3)",
            },
          }}
          aria-label="Ajouter une nouvelle offre"
        >
          Nouvelle Offre
        </StyledButton>
      </Stack>

      <AddOffreJob open={open} handleClose={() => setOpen(false)} />
      <UpdateOffreEmploi
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        offre={selectedOffre}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress sx={{ color: "#1E3A8A" }} />
        </Box>
      ) : error ? (
        <Typography color="#EF4444" align="center" sx={{ my: 4 }}>
          Erreur: {error}
        </Typography>
      ) : filteredOffres.length === 0 ? (
        <Typography color="#1E3A8A" align="center" sx={{ my: 4 }}>
          Aucune offre trouvée.
        </Typography>
      ) : (
        <>
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
                    backgroundColor: "#FFFFFF",
                    borderRadius: 3,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6" fontWeight="bold" noWrap color="#1E3A8A">
                        {offre.titre}
                      </Typography>
                      <StyledChip
                        label={offre.status ? "Active" : "Inactive"}
                        sx={{
                          backgroundColor: offre.status ? "#EDE9FE" : "#DBEAFE",
                          color: offre.status ? "#914091" : "green",
                        }}
                        size="small"
                      />
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        color: "#1E3A8A",
                        opacity: 0.7,
                      }}
                    >
                      {offre.description}
                    </Typography>
                    <Divider sx={{ my: 2, borderColor: "#E5E7EB" }} />
                    <Stack spacing={1}>
                      <Typography variant="caption" color="#1E3A8A">
                        <strong>Publié:</strong> {formatDate(offre.date_publi)}
                      </Typography>
                      <Typography variant="caption" color="#1E3A8A">
                        <strong>Clôture:</strong> {formatDate(offre.date_limite)}
                      </Typography>
                      <Typography variant="caption" color="#1E3A8A">
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
                          <Typography variant="caption" color="#1E3A8A">
                            <strong>Exigences:</strong>
                          </Typography>
                          {Array.isArray(offre.requirements) && offre.requirements.length > 2 && (
                            <StyledButton
                              size="small"
                              endIcon={<ExpandMoreIcon />}
                              onClick={() => toggleRequirements(offre._id)}
                              sx={{
                                color: "#1E3A8A",
                                fontSize: "0.75rem",
                                "&:hover": {
                                  color: "#914091",
                                  backgroundColor: "#EDE9FE",
                                },
                              }}
                            >
                              {expandedCards[offre._id] ? "Voir moins" : "Voir plus"}
                            </StyledButton>
                          )}
                        </Stack>
                        {Array.isArray(offre.requirements) && offre.requirements.length > 0 ? (
                          <>
                            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                              {offre.requirements.slice(0, 2).map((req, index) => (
                                <StyledChip
                                  key={index}
                                  label={req}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    borderColor: "#1E3A8A",
                                    color: "#1E3A8A",
                                    backgroundColor: "#F8FAFC",
                                  }}
                                />
                              ))}
                            </Stack>
                            {offre.requirements.length > 2 && (
                              <Collapse in={expandedCards[offre._id]} timeout={300}>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{ flexWrap: "wrap", gap: 1, mt: 1 }}
                                >
                                  {offre.requirements.slice(2).map((req, index) => (
                                    <StyledChip
                                      key={index}
                                      label={req}
                                      size="small"
                                      variant="outlined"
                                      sx={{
                                        borderColor: "#1E3A8A",
                                        color: "#1E3A8A",
                                        backgroundColor: "#F8FAFC",
                                      }}
                                    />
                                  ))}
                                </Stack>
                              </Collapse>
                            )}
                          </>
                        ) : (
                          <Typography variant="caption" color="#1E3A8A" sx={{ opacity: 0.7 }}>
                            Aucune exigence
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <StyledIconButton
                      onClick={() => {
                        setSelectedOffre(offre);
                        setEditOpen(true);
                      }}
                      aria-label={`Modifier l'offre ${offre.titre}`}
                    >
                      <EditIcon />
                    </StyledIconButton>
                    <StyledButton
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: offre.status ? "#EF4444" : "#914091",
                        color: offre.status ? "#EF4444" : "#914091",
                        flexGrow: 1,
                        "&:hover": {
                          backgroundColor: "#EDE9FE",
                          borderColor: offre.status ? "#EF4444" : "#914091",
                          color: offre.status ? "#EF4444" : "#914091",
                        },
                      }}
                      onClick={() => handleToggleStatus(offre)}
                      aria-label={offre.status ? `Désactiver l'offre ${offre.titre}` : `Activer l'offre ${offre.titre}`}
                    >
                      {offre.status ? "Désactiver" : "Activer"}
                    </StyledButton>
                  </CardActions>
                </Card>
              ))}
          </Box>

          {filteredOffres.length > rowsPerPage && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={Math.ceil(filteredOffres.length / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
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
                aria-label="Navigation de la pagination"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default AllEmploi;