import React, { useEffect } from "react";
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
  Typography,
  Card,
  Button,
  Alert,
  Stack,
} from "@mui/material";

const Demande = () => {
  const dispatch = useDispatch();
  const demandes = useSelector((state) => state.posts.demandes);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    dispatch(postWithoutOffre());
  }, [dispatch]);

  const handleRefuser = (id) => {
    dispatch(refuserDemande(id)).then(() => {
      dispatch(postWithoutOffre());
    });
  };

  const handleAccepter = (id) => {
    dispatch(accepterDemande(id)).then(() => {
      dispatch(postWithoutOffre());
    });
  };

  return (
    <Card sx={{ p: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Liste des demandes
      </Typography>

      <TableContainer component={Paper}>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto", my: 4 }} />
        )  : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>Nom</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Tel</strong></TableCell>
                <TableCell><strong>Niveau</strong></TableCell>
                <TableCell><strong>CV</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {demandes && demandes.length > 0 ? (
                demandes.map((post) => (
                  <TableRow key={post._id}>
                    <TableCell>{post.name}</TableCell>
                    <TableCell>{post.email}</TableCell>
                    <TableCell>{post.number}</TableCell>
                    <TableCell>{post.niveau}</TableCell>
                    <TableCell>
                      <a
                        href={post.cv_local_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Télécharger CV
                      </a>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRefuser(post._id)}
                        >
                          Refuser
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleAccepter(post._id)}
                        >
                          Accepter
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Aucun post trouvé.
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

export default Demande;
