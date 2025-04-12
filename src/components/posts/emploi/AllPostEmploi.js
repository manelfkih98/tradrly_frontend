import React, { useEffect } from "react";
import { fetchPostsJob, refuser,accepter } from "../../../store/services/postsService";
import { useDispatch, useSelector } from "react-redux";
import {passerTest} from "../../../store/services/QcmService"
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
} from "@mui/material";

const AllPost = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    dispatch(fetchPostsJob());
  }, [dispatch]);

  const handleRefuser = (id) => {
    dispatch(refuser(id)); 
  };
  const handleAccepter=(id)=>
  {
    dispatch(passerTest(id));
  };

  return (
    <Card sx={{ p: 8 }}>
      <TableContainer component={Paper}>
        <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
          Liste des Posts
        </Typography>

        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : error ? (
          <Typography color="error" align="center">
            Erreur: {error}
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>
                  <strong>Nom</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Tel</strong>
                </TableCell>
                <TableCell>
                  <strong>Niveau</strong>
                </TableCell>
                <TableCell>
                  <strong>Offre</strong>
                </TableCell>
                <TableCell>
                  <strong>CV</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <TableRow key={post._id}>
                    <TableCell>{post.name}</TableCell>
                    <TableCell>{post.email}</TableCell>
                    <TableCell>{post.number}</TableCell>
                    <TableCell>{post.niveau}</TableCell>
                    <TableCell>{post.jobId.titre}</TableCell>
                   
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
                      <Button onClick={() => handleRefuser(post._id)}>
                        Refuser
                      </Button>
                
                      <Button onClick={()=>handleAccepter(post._id)}>Passer un Test</Button>
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

export default AllPost;
