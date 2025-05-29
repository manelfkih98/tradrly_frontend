import React, { useEffect, useState } from "react";
import {
  postWithoutOffre,
  accepterDemande,
} from "../../store/services/postsService";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  CircularProgress,
  Button,
  Tooltip,
  Stack,
  Box,
  Chip,
  styled,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import QuizIcon from "@mui/icons-material/Quiz";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import { fetchOffresEmploi, fetchOffresStage } from "../../store/services/offreService";

// Styled Chip for status
const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 500,
  textTransform: "capitalize",
  borderRadius: "16px",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[2],
  },
  ...(status === "pending" && {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.contrastText,
  }),
  ...(status === "refused" && {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  }),
  ...(status === "testPassed" && {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
  }),
}));

// Custom CircularProgress with label for score
const CustomCircularProgressWithLabel = styled(({ value, ...props }) => (
  <Box sx={{ position: "relative", display: "inline-flex" }}>
    <CircularProgress
      variant="determinate"
      value={value}
      size={50}
      thickness={5}
      {...props}
    />
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="caption"
        component="div"
        color="text.primary"
        fontWeight="bold"
      >
        {`${Math.round(value)}%`}
      </Typography>
    </Box>
  </Box>
))(({ theme, value }) => ({
  color:
    value >= 80
      ? theme.palette.success.main
      : value >= 50
      ? theme.palette.warning.main
      : theme.palette.error.main,
}));

// Styled Filter Container
const FilterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  background: "linear-gradient(135deg,rgba(158, 101, 193, 0.57) 0%,rgba(59, 131, 246, 0.57) 100%)",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

// Styled ToggleButtonGroup
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  "& .MuiToggleButton-root": {
    color: "#1E3A8A",
    textTransform: "none",
    fontWeight: 600,
    padding: theme.spacing(1, 2),
    "&.Mui-selected": {
      backgroundColor: "#914091",
      color: "#fff",
    },
  },
}));

// Styled Select
const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#1E3A8A",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d4af37",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d4af37",
  },
  "& .MuiSelect-select": {
    padding: theme.spacing(1.5),
    color: "#1E3A8A",
    fontWeight: 500,
  },
  minWidth: 300,
  [theme.breakpoints.down("sm")]: {
    minWidth: "100%",
  },
}));

const Demande = () => {
  const dispatch = useDispatch();
  const { demandes, loading: demandesLoading } = useSelector((state) => state.posts) || {};
  const { offres, loading: offresLoading } = useSelector((state) => state.offres) || {};

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [offerType, setOfferType] = useState("emploi");
  const [selectedOffreId, setSelectedOffreId] = useState("");
  const [resultats, setResultats] = useState([]);
  const [loadingScores, setLoadingScores] = useState(false);

  useEffect(() => {
    if (offerType === "emploi") {
      dispatch(fetchOffresEmploi());
      dispatch(postWithoutOffre("emploi"));
    } else {
      dispatch(fetchOffresStage());
      dispatch(postWithoutOffre("stage"));
    }
    setSelectedOffreId("");
    setPage(1);
    setResultats([]);
  }, [dispatch, offerType]);

  useEffect(() => {
    if (selectedOffreId && demandes.length > 0) {
      analyserCandidatures();
    } else {
      setResultats([]);
    }
  }, [selectedOffreId, demandes]);

  const analyserCandidatures = async () => {
    const selectedOffre = offreList.find((offre) => offre._id === selectedOffreId);
    if (!selectedOffre) return;

    const data = demandes.map((demande) => ({
      cv_filename: demande.fileName,
      description: selectedOffre.description || "Aucune description",
      requirements: selectedOffre.requirements || [],
    }));

    setLoadingScores(true);

    try {
      const response = await fetch(
        " https://9d3f-34-125-39-67.ngrok-free.app/analyser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'appel à l'API Flask");
      }

      const json = await response.json();
      console.log("API Response:", json);
      setResultats(json);
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    } finally {
      setLoadingScores(false);
    }
  };


  const handlePasseTest = (id) => {
    dispatch(accepterDemande(id)).then(() => {
      dispatch(postWithoutOffre(offerType));
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOfferTypeChange = (event, newValue) => {
    if (newValue) {
      setOfferType(newValue);
    }
  };

  const handleOffreChange = (event) => {
    setSelectedOffreId(event.target.value);
    setPage(1);
  };

  const offreList =
    offerType === "emploi"
      ? offres?.offreByJob && Array.isArray(offres.offreByJob)
        ? offres.offreByJob
        : []
      : offres?.offreByStage && Array.isArray(offres.offreByStage)
      ? offres.offreByStage
      : [];

  const filteredDemandes = demandes; // Always show all demands

  const enrichedDemandes = filteredDemandes.map((demande) => {
    const relatedOffre = selectedOffreId
      ? offreList.find((offre) => offre._id === selectedOffreId)
      : offreList.find((offre) => offre._id === demande.offreId);
    return {
      ...demande,
      offreTitre: selectedOffreId
        ? relatedOffre?.titre || "Offre sélectionnée"
        : relatedOffre?.titre || "Sans offre",
    };
  });

  const paginatedDemandes = enrichedDemandes.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
      <FilterContainer>
        <StyledToggleButtonGroup
          value={offerType}
          exclusive
          onChange={handleOfferTypeChange}
          aria-label="Type d'offre"
        >
          <ToggleButton value="emploi" aria-label="Offres d'emploi">
            <WorkIcon sx={{ mr: 1 }} />
            Emploi
          </ToggleButton>
          <ToggleButton value="stage" aria-label="Offres de stage">
            <SchoolIcon sx={{ mr: 1 }} />
            Stage
          </ToggleButton>
        </StyledToggleButtonGroup>

        <FormControl size="small">
        
          <Select
            labelId="offer-select-label"
            value={selectedOffreId}
            label="Sélectionner une offre"
            onChange={handleOffreChange}
            displayEmpty
            aria-label="Filtrer par offre spécifique"
            sx={{
              borderRadius: 2,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1E3A8A",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E5E7EB",
              },
            }}
          >
            <MenuItem value="">
              <em>Toutes les offres</em>
            </MenuItem>
            {offreList.map((offre) => (
              <MenuItem key={offre._id} value={offre._id}>
                {offre.titre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FilterContainer>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          p: 2,
        }}
      >
        {(demandesLoading || offresLoading || loadingScores) ? (
          <CircularProgress sx={{ display: "block", margin: "auto", my: 5 }} />
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#EDE9FE" }}>
                <TableCell
                  align="center"
                  sx={{
                    color: "#1E3A8A",
                    fontWeight: 700,
                    fontSize: "1rem",
                    py: 3,
                  }}
                >
                  Candidat
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "#1E3A8A",
                    fontWeight: 700,
                    fontSize: "1rem",
                    py: 3,
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "#1E3A8A",
                    fontWeight: 700,
                    fontSize: "1rem",
                    py: 3,
                  }}
                >
                  Téléphone
                </TableCell>
                {selectedOffreId && (
                  <TableCell
                    align="center"
                    sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}
                  >
                    Offre
                  </TableCell>
                )}
                <TableCell
                    align="center"
                    sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}
                  >
                    Department
                  </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "#1E3A8A",
                    fontWeight: 700,
                    fontSize: "1rem",
                    py: 3,
                  }}
                >
                  CV
                </TableCell>
             
                {selectedOffreId && (
                  <TableCell
                    align="center"
                    sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}
                  >
                    Score de correspondance
                  </TableCell>
                )}
                {selectedOffreId && (
                  <TableCell
                    align="center"
                    sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}
                  >
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedDemandes.length > 0 ? (
                paginatedDemandes.map((post) => {
                  const result = resultats.find((res) => res.cv === post.fileName);
                  const matchScore = result?.score ? result.score * 100 : undefined;
                  const isFinalized =
                    post.status === "refused" || post.status === "testPassed";
                  return (
                    <TableRow
                      key={post._id}
                      hover
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f9fafb",
                        },
                      }}
                    >
                      <TableCell>
                        {post.nom} {post.prenom}
                      </TableCell>
                      <TableCell>{post.email}</TableCell>
                      <TableCell>{post.telephone}</TableCell>
                      <TableCell>{post.departement}</TableCell>
                      {selectedOffreId && <TableCell>{post.offreTitre}</TableCell>}
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<DownloadIcon />}
                          href={post.cv_google_drive_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            borderRadius: "12px",
                            textTransform: "none",
                            borderColor: "#1e3a8a",
                            color: "#1e3a8a",
                           
                          }}
                        >
                          CV
                        </Button>
                      </TableCell>
                   
                      {selectedOffreId && (
                        <TableCell align="center">
                          {matchScore !== undefined && matchScore > 0 ? (
                            <Tooltip title={`Score de correspondance: ${Math.round(matchScore)}%`}>
                              <CustomCircularProgressWithLabel value={matchScore} />
                            </Tooltip>
                          ) : (
                            <Typography variant="caption" color="text.secondary">
                              Non calculé
                            </Typography>
                          )}
                        </TableCell>
                      )}
                      {selectedOffreId && (
                        <TableCell>
                          <Stack direction="row" spacing={1} justifyContent="center">
                            {!isFinalized && (
                              <>
                                
                                  <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<QuizIcon />}
                                    onClick={() => handlePasseTest(post._id)}
                                    sx={{
                                      borderRadius: "12px",
                                      backgroundColor: "#1e3a8a",
                                 
                                    }}
                                  >
                                   Envoyer un test
                                  </Button>
                                
                       
                              </>
                            )}
                          </Stack>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={selectedOffreId ? 8 : 5}
                    align="center"
                    sx={{ py: 4 }}
                  >
                    Aucune demande trouvée.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {enrichedDemandes.length > rowsPerPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={Math.ceil(enrichedDemandes.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#1e3a8a",
              },
              "& .Mui-selected": {
                backgroundColor: "#d4af37 !important",
                color: "#fff !important",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Demande;