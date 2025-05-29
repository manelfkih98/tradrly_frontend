import React, { useEffect, useState } from "react";
import {
  fetchPostsStage,
  refuserStage,
} from "../../../store/services/postsService";
import { fetchOffresStage } from "../../../store/services/offreService";
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
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import QuizIcon from "@mui/icons-material/Quiz";

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

const AllPostStage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts_stage) || [];
  const offres = useSelector((state) => state.offres?.offres?.offreByStage) || [];
  const loadingPosts = useSelector((state) => state.posts.loading);
  const loadingOffres = useSelector((state) => state.offres?.loading);
  const [resultats, setResultats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(4);
  const [selectedOffre, setSelectedOffre] = useState("");

  useEffect(() => {
    dispatch(fetchPostsStage());
    dispatch(fetchOffresStage());
  }, [dispatch]);

  useEffect(() => {
    if (posts.length > 0) {
      console.log("Posts:", posts.map((post) => ({ id: post._id, fileName: post.fileName })));
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
      setLoading(false);
    }
  };

  const handleRefuser = (id) => {
    dispatch(refuserStage(id));
  };

  const handlePasseTest = (id) => {
    dispatch(passerTest(id));
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
                <TableCell
                  align="center"
                  sx={{
                    color: "#1E3A8A",
                    fontWeight: 700,
                    fontSize: "1rem",
                    py: 3,
                  }}
                >
                  Statut
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
                  Score de correspondance
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
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((post) => {
                  const result = resultats.find((res) => res.cv === post.fileName);
                  const matchScore = result?.score ? result.score * 100 : undefined;
                  const isFinalized = post.status === "refused" || post.status === "testPassed";

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
                      <TableCell>{`${post.nom} ${post.prenom}`}</TableCell>
                      <TableCell>{post.email}</TableCell>
                      <TableCell>{post.telephone}</TableCell>
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
                      </TableCell>
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