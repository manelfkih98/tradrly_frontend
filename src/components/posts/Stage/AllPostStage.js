import React, { useEffect, useState } from "react";
import {
  fetchPostsStage,
  refuserStage,
} from "../../../store/services/postsService";
import { fetchOffresStage } from "../../../store/services/offreService"; // Nouveau service pour récupérer les offres
import { passerTest } from "../../../store/services/QcmService";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import QuizIcon from "@mui/icons-material/Quiz";

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

const AllPostStage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts_stage) || [];
  const offres = useSelector((state) => state.offres?.offres?.offreByStage ) || []; // Récupérer les offres depuis le store
  const loadingPosts = useSelector((state) => state.posts.loading);
  const loadingOffres = useSelector((state) => state.offres?.loading);
  const [resultats, setResultats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(4);
  const [selectedOffre, setSelectedOffre] = useState(""); // État pour le filtre par offre

  // Charger les candidatures et les offres
  useEffect(() => {
    dispatch(fetchPostsStage());
    dispatch(fetchOffresStage()); // Charger les offres
  }, [dispatch]);
    useEffect(() => {
      if (posts.length > 0) {
        analyserCandidatures();
      }
    }, [posts]);
  
    const analyserCandidatures = async () => {
      const data = posts.map((post) => ({
        cv_filename: post.fileName,
        description: post.jobId?.description || "Aucune description",
        requirements: post.jobId?.requirements || [],
      }));
  
      setLoading(true);
  
      try {
        const response = await fetch("https://7cdf-35-236-168-12.ngrok-free.app/analyser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error("Erreur lors de l'appel à l'API Flask");
        }
  
        const json = await response.json();
        setResultats(json);
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      } finally {
        setLoading(false);
      }
    };

  // Gérer le refus d'une candidature
  const handleRefuser = (id) => {
    dispatch(refuserStage(id));
  };

  // Gérer le passage au test
  const handlePasseTest = (id) => {
    dispatch(passerTest(id));
  };

  // Gérer le changement de page
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Gérer le changement de filtre par offre
  const handleOffreChange = (event) => {
    setSelectedOffre(event.target.value);
    setPage(1); // Réinitialiser la page à 1 lors du changement de filtre
  };

  // Filtrer les candidatures en fonction de l'offre sélectionnée
  const filteredPosts = selectedOffre
    ? posts.filter((post) => post.jobId?._id === selectedOffre)
    : posts;

  // Calculer les candidatures à afficher pour la page actuelle
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
      {/* Filtre par offre */}
      <Box sx={{ mb: 3, maxWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="offre-filter-label">Filtrer par offre</InputLabel>
          <Select
            labelId="offre-filter-label"
            value={selectedOffre}
            label="Filtrer par offre"
            onChange={handleOffreChange}
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
            <MenuItem value="">Toutes les offres</MenuItem>
            {loadingOffres ? (
              <MenuItem disabled>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Chargement...
              </MenuItem>
            ) : offres.length > 0 ? (
              offres.map((offre) => (
                <MenuItem key={offre._id} value={offre._id}>
                  {offre.titre}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Aucune offre disponible</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          p: 2,
        }}
      >
        {loadingPosts ? (
          <CircularProgress sx={{ display: "block", margin: "auto", my: 5 }} />
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#EDE9FE" }}>
                <TableCell align="center"  sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}>
                  Candidat
                </TableCell>
                <TableCell align="center"  sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}>
                  Email
                </TableCell>
                <TableCell align="center"  sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}>
                  Téléphone
                </TableCell>
              
                <TableCell align="center"  sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}>
                  Offre
                </TableCell>
                <TableCell align="center"  sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}>
                  CV
                </TableCell>
                <TableCell align="center"  sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}>
                  Statut
                </TableCell>
                <TableCell align="center"  sx={{
                      color: "#1E3A8A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      py: 3,
                    }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((post,index) => {
                  const isFinalized =
                    post.status === "refused" || post.status === "testPassed";
                    const matchScore = resultats[index]?.score;

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
                      <TableCell>{post.nom} {post.prenom}</TableCell>
                      <TableCell>{post.email}</TableCell>
                      <TableCell>{post.number}</TableCell>
                      <TableCell>{post.jobId?.titre}</TableCell>
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
                            "&:hover": {
                              borderColor: "#d4af37",
                              color: "#d4af37",
                            },
                          }}
                        >
                          CV
                        </Button>
                      </TableCell>
                      <TableCell>
                        <StatusChip
                          label={
                            post.status === "pending"
                              ? "En attente"
                              : post.status === "refused"
                              ? "Refusé"
                              : post.status === "testPassed"
                              ? "Passe un test"
                              : "Statut inconnu"
                          }
                          status={post.status || "pending"}
                        />
                           {matchScore !== undefined && (
                                                      <Chip
                                                        label={`Match : ${matchScore}%`}
                                                        color="success"
                                                        size="small"
                                                      />
                                                    )}
                      </TableCell>
                      <TableCell align="center">
                        {!isFinalized ? (
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                          >
                            <Tooltip title="Refuser la candidature">
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleRefuser(post._id)}
                                sx={{
                                  borderRadius: "12px",
                                  textTransform: "none",
                                }}
                              >
                                Refuser
                              </Button>
                            </Tooltip>
                            <Tooltip title="Faire passer le test">
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<QuizIcon />}
                                onClick={() => handlePasseTest(post._id)}
                                sx={{
                                  borderRadius: "12px",
                                  textTransform: "none",
                                  bgcolor: "#1e3a8a",
                                  "&:hover": {
                                    bgcolor: "#d4af37",
                                    color: "#1e3a8a",
                                  },
                                }}
                              >
                                Envoyer un test
                              </Button>
                            </Tooltip>
                          </Stack>
                        ) : (
                          <Box sx={{ color: "text.secondary" }}>-</Box>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    Aucune candidature trouvée.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Pagination */}
      {filteredPosts.length > rowsPerPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={Math.ceil(filteredPosts.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#1e3a8a",
                "&:hover": {
                  bgcolor: "#d4af37",
                  color: "#fff",
                },
                "&.Mui-selected": {
                  bgcolor: "#1e3a8a",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#d4af37",
                  },
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default AllPostStage;