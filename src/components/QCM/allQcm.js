import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQcm } from "../../store/services/QcmService";
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
  Box,
  Chip,
  Stack
} from "@mui/material";

const AllQcm = () => {
  const QCMs = useSelector((state) => state.Qcms.QCM);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQcm());
    console.log(QCMs);
  }, [dispatch]);

  return (
    <Card sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          textAlign: "center",
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        Liste des Tests
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5", height: 56 }}>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                <strong>Nom</strong>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                <strong>Email</strong>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                <strong>Téléphone</strong>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                <strong>Résultat</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {QCMs && QCMs.length > 0 ? (
              QCMs.map((QCM) => (
                <TableRow key={QCM._id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" } }}>
                  <TableCell>{QCM.post_id?.name || "N/A"}</TableCell>
                  <TableCell>{QCM.post_id?.email || "N/A"}</TableCell>
                  <TableCell>{QCM.post_id?.number || "N/A"}</TableCell>
                  <TableCell>
                    <Chip
                      label={QCM.resultat || "Non défini"}
                      color={QCM.resultat === "Réussi" ? "success" : "error"}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Aucun QCM trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {QCMs === undefined && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Card>
  );
};

export default AllQcm;
