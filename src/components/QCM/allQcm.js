import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
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
  
  } from "@mui/material";
const AllQcm = () => {
  const QCMs = useSelector((state) => state.Qcms.QCM);
  
  

    const dispatch=useDispatch();
    useEffect(()=>
    {
        dispatch(fetchQcm());
        console.log(QCMs)
    },[dispatch])
  return (
    <Card sx={{ p: 4 }}>
    <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
      Liste des tests
    </Typography>

    <TableContainer component={Paper}>
      
    <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>Nom</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Téléphone</strong></TableCell>
                <TableCell><strong>Resultat</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {QCMs && QCMs.length > 0 ? (
                QCMs.map((QCM) => (
                  <TableRow key={QCM._id}>
                    <TableCell>{QCM.post_id?.name || "N/A"}</TableCell>
                    <TableCell>{QCM.post_id?.email || "N/A"}</TableCell>
                    <TableCell>{QCM.post_id?.number || "N/A"}</TableCell>
                    <TableCell>{QCM.resultat}</TableCell>
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
  </Card>
  );
};
export default AllQcm;