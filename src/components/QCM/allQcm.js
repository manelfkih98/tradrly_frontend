import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQcm } from "../../store/services/QcmService";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Stack,
  Chip,
  Grid,
  CircularProgress,
  Divider,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ScoreIcon from "@mui/icons-material/EmojiEvents";
import { styled } from "@mui/system";

// Style pour une carte professionnelle
const ProfessionalCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#ffffff",
  border: "1px solid #e8ecef",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  transition: "box-shadow 0.2s ease-in-out",
  "&:hover": {
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
  },
}));

const AllQcm = () => {
  const QCMs = useSelector((state) => state.Qcms.QCM);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQcm());
  }, [dispatch]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: "100vh" }}>
      {QCMs === undefined ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : QCMs.length === 0 ? (
        <Typography
          align="center"
          variant="h6"
          color="text.secondary"
          sx={{ mt: 6, fontWeight: 500 }}
        >
          Aucun QCM trouvé.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {QCMs.map((qcm) => (
            <Grid item xs={12} sm={6} md={4} key={qcm._id}>
              <ProfessionalCard>
                <CardContent sx={{ p: 3 }}>
                  {/* En-tête avec avatar et nom */}
                  <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <Avatar
                      sx={{
                        bgcolor: "#003087",
                        width: 48,
                        height: 48,
                        fontSize: 20,
                        fontWeight: 600,
                      }}
                    >
                      {qcm.post_id?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        color="#1a202c"
                      >
                        {qcm.post_id?.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight={500}
                      >
                        {qcm.post_id?.jobId?.titre || "Poste non spécifié"}
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider sx={{ my: 2, borderColor: "#e8ecef" }} />

                  {/* Informations de contact */}
                  <Stack spacing={1.5} mb={2}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <MailIcon
                        fontSize="small"
                        sx={{ color: "#6b7280" }}
                      />
                      <Typography
                        variant="body2"
                        color="#374151"
                        fontWeight={400}
                      >
                        {qcm.post_id?.email}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <PhoneIcon
                        fontSize="small"
                        sx={{ color: "#6b7280" }}
                      />
                      <Typography
                        variant="body2"
                        color="#374151"
                        fontWeight={400}
                      >
                        {qcm.post_id?.number}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Score */}
                  <Chip
                    icon={
                      <ScoreIcon
                        sx={{ fontSize: 18, color: "inherit" }}
                      />
                    }
                    label={`Score : ${qcm.resultat} / ${qcm.questions?.length}`}
                    color={
                      qcm.resultat >= (qcm.questions?.length || 1) / 2
                        ? "success"
                        : "error"
                    }
                    variant="outlined"
                    sx={{
                      fontWeight: 500,
                      borderRadius: 2,
                      fontSize: "0.85rem",
                      bgcolor: qcm.resultat >= (qcm.questions?.length || 1) / 2
                        ? "rgba(34, 197, 94, 0.1)"
                        : "rgba(239, 68, 68, 0.1)",
                      borderColor: qcm.resultat >= (qcm.questions?.length || 1) / 2
                        ? "rgba(34, 197, 94, 0.5)"
                        : "rgba(239, 68, 68, 0.5)",
                    }}
                  />
                </CardContent>
              </ProfessionalCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AllQcm;