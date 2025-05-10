import React, { useEffect, useState } from "react";
import {
  postWithoutOffre,
  refuserDemande,
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

const Demande = () => {
  const dispatch = useDispatch();
  const demandes = useSelector((state) => state.posts.demandes) || [];
  const loading = useSelector((state) => state.posts.loading);

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5); // Consistent with AllPostEmploi and AllPostStage

  useEffect(() => {
    dispatch(postWithoutOffre());
  }, [dispatch]);

  const handleRefuser = (id) => {
    dispatch(refuserDemande(id)).then(() => {
      dispatch(postWithoutOffre());
    });
  };

  const handlePasseTest = (id) => {
    dispatch(accepterDemande(id)).then(() => {
      dispatch(postWithoutOffre());
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Calculate the demands to display for the current page
  const paginatedDemandes = demandes.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          p: 2,
        }}
      >
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto", my: 5 }} />
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1e3a8a" }}>
                <TableCell  align="center"sx={{ fontWeight: "bold",color:"white" }}>Nom</TableCell>
                <TableCell align="center"sx={{ fontWeight: "bold" ,color:"white"}}>Email</TableCell>
                <TableCell align="center"sx={{ fontWeight: "bold" ,color:"white"}}>Téléphone</TableCell>
                <TableCell  align="center"sx={{ fontWeight: "bold" ,color:"white"}}>Niveau</TableCell>
                <TableCell align="center"sx={{ fontWeight: "bold" ,color:"white"}}>CV</TableCell>
                <TableCell align="center"sx={{ fontWeight: "bold" ,color:"white"}}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" ,color:"white"}}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedDemandes.length > 0 ? (
                paginatedDemandes.map((post) => {
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
                      <TableCell>{post.name}</TableCell>
                      <TableCell>{post.email}</TableCell>
                      <TableCell>{post.number}</TableCell>
                      <TableCell>{post.niveau}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<DownloadIcon />}
                          href={post.cv_local_url}
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
                              : "Inconnu"
                          }
                          status={post.status || "pending"}
                        />
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
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    Aucune demande trouvée.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Pagination */}
      {demandes.length > rowsPerPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={Math.ceil(demandes.length / rowsPerPage)}
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

export default Demande;