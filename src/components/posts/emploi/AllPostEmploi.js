import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsJob,
  refuserJob,
  passerTestJob,
} from "../../../store/services/postsService";
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

// Custom styled Chip for enhanced status design
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
  const loading = useSelector((state) => state.posts.loading);

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5); // Adjust as needed

  useEffect(() => {
    dispatch(fetchPostsJob());
  }, [dispatch]);

  const handleRefuser = (id) => {
    dispatch(refuserJob(id));
  };

  const handlePasseTest = (id) => {
    dispatch(passerTestJob(id));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Calculate the posts to display for the current page
  const paginatedPosts = posts.slice(
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
              <TableRow sx={{ backgroundColor: "#f4f6f8" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Nom</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Téléphone</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Niveau</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Offre</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>CV</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Statut</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((post) => {
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
                      <TableCell>{post.jobId?.titre}</TableCell>
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
                              : "Statut inconnu"
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
                                Test
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
                    Aucun post trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Pagination */}
      {posts.length > rowsPerPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={Math.ceil(posts.length / rowsPerPage)}
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

export default AllPostEmploi;