import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsJob,
  refuserJob,
  passerTestJob,
} from "../../../store/services/postsService";
import { fetchOffresEmploi } from "../../../store/services/offreService";

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
  Typography,
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

const AllPostEmploi = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts_job) || [];
  const offres = useSelector((state) => state.offres?.offres.offreByJob) || [];
  const loadingPosts = useSelector((state) => state.posts.loading);
  const loadingOffres = useSelector((state) => state.offres?.loading);

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [selectedOffre, setSelectedOffre] = useState("");
  const [resultats, setResultats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchPostsJob());
    dispatch(fetchOffresEmploi());
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

  const handleRefuser = (id) => {
    dispatch(refuserJob(id));
  };

  const handlePasseTest = (id) => {
    dispatch(passerTestJob(id));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOffreChange = (event) => {
    setSelectedOffre(event.target.value);
    setPage(1);
  };

  const filteredPosts = selectedOffre
    ? posts.filter((post) => post.jobId?._id === selectedOffre)
    : posts;

  const paginatedPosts = filteredPosts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
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
                borderColor: "#d4af37",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1e3a8a",
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
        {loadingPosts || loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto", my: 5 }} />
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1e3a8a" }}>
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>
                    Candidat
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>
                    Email
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>
                    Téléphone
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>
                    Offre
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>
                    CV
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>
                    Statut
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedPosts.length > 0 ? (
                  paginatedPosts.map((post, index) => {
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
                        <TableCell align="center">
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
                          <Stack spacing={0.5}>
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
                          </Stack>
                        </TableCell>
                        <TableCell align="center">
                          {!isFinalized ? (
                            <Stack direction="row" spacing={1} justifyContent="center">
                              <Tooltip title="Refuser la candidature">
                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  startIcon={<DeleteIcon />}
                                  onClick={() => handleRefuser(post._id)}
                                  sx={{ borderRadius: "12px", textTransform: "none" }}
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
                                  sx={{ borderRadius: "12px", textTransform: "none" }}
                                >
                                  Test
                                </Button>
                              </Tooltip>
                            </Stack>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              Action terminée
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Aucune candidature trouvée.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
              <Pagination
                count={Math.ceil(filteredPosts.length / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </>
        )}
      </TableContainer>
    </Box>
  );
};

export default AllPostEmploi;
