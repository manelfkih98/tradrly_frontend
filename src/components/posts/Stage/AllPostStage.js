import React, { useEffect } from "react";
import {
  fetchPostsStage,
  refuserStage,
} from "../../../store/services/postsService";
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
  const posts = useSelector((state) => state.posts.posts_stage);
  const loading = useSelector((state) => state.posts.loading);

  useEffect(() => {
    dispatch(fetchPostsStage());
  }, [dispatch]);

  const handleRefuser = (id) => {
    dispatch(  refuserStage
(id));
  };

  const handleAccepter = (id) => {
    dispatch(passerTest(id));
  };

  return (
    <Box sx={{ p: 3 }}>
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
              {posts.length > 0 ? (
                posts.map((post) => {
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
                          status={post.status || "en_attente"}
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
                                color="primary"
                                size="small"
                                startIcon={<QuizIcon />}
                                onClick={() => handleAccepter(post._id)}
                                sx={{
                                  borderRadius: "12px",
                                  textTransform: "none",
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
    </Box>
  );
};

export default AllPostStage;
