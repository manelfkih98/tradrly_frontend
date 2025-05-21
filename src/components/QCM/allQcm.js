import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQcm } from "../../store/services/QcmService";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  CircularProgress,
  Chip,
  Divider,
  Stack,
  Fade,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  borderRadius: 10,
  backgroundColor: "#F8FAFC",
  border: "1px solid #E5E7EB",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    borderColor: "#914091",
    boxShadow: "0 4px 12px rgba(145, 64, 145, 0.15)",
  },
});

const StyledAvatar = styled(Avatar)({
  width: 40,
  height: 40,
  backgroundColor: "#1E3A8A",
  fontSize: "1.2rem",
  border: "2px solid #DBEAFE",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

const AllQcm = () => {
  const QCMs = useSelector((state) => state.Qcms.QCM);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQcm());
  }, [dispatch]);

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
        maxWidth: "1200px",
        mx: "auto",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {QCMs === undefined ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress sx={{ color: "#914091" }} />
        </Box>
      ) : QCMs.length === 0 ? (
        <Typography
          align="center"
          variant="h6"
          sx={{ mt: 6, color: "#1E3A8A", fontWeight: 500 }}
        >
          Aucun QCM trouvé.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {QCMs.map((qcm) => {
            const total = qcm.questions?.length || 1;
            const score = qcm.resultat || 0;
            const percentage = Math.round((score / total) * 100);
            const isSuccess = percentage >= 50;

            return (
              <Grid item xs={12} sm={6} md={4} key={qcm._id}>
                <Fade in timeout={600}>
                  <StyledCard>
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                        <StyledAvatar>
                          {qcm.post_id?.name?.charAt(0).toUpperCase() || "?"}
                        </StyledAvatar>
                        <Box>
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            sx={{ color: "#1E3A8A" }}
                          >
                            {qcm.post_id?.name || "Sans nom"}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#1E3A8A", opacity: 0.7 }}
                          >
                            {qcm.post_id?.jobId?.titre || "Poste non spécifié"}
                          </Typography>
                        </Box>
                      </Stack>

                      <Divider sx={{ my: 1.5, borderColor: "#E5E7EB", width: "80%", mx: "auto" }} />

                      <Stack spacing={1.5} mb={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <MailIcon
                            fontSize="small"
                            sx={{ color: "#914091", "&:hover": { color: "#1E3A8A" } }}
                          />
                          <Typography variant="body2" sx={{ color: "#1E3A8A" }}>
                            {qcm.post_id?.email || "—"}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <PhoneIcon
                            fontSize="small"
                            sx={{ color: "#914091", "&:hover": { color: "#1E3A8A" } }}
                          />
                          <Typography variant="body2" sx={{ color: "#1E3A8A" }}>
                            {qcm.post_id?.number || "—"}
                          </Typography>
                        </Box>
                      </Stack>

                      <Divider sx={{ my: 1.5, borderColor: "#E5E7EB", width: "80%", mx: "auto" }} />

                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Chip
                          label={`Score : ${score}/${total}`}
                          sx={{
                            fontWeight: 500,
                            bgcolor: isSuccess ? "#DBEAFE" : "#FFF1F2",
                            color: isSuccess ? "green" : "#EF4444",
                            borderRadius: 1,
                          }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{ color: isSuccess ? "green" : "#EF4444" }}
                        >
                          {percentage}%
                        </Typography>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Fade>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default AllQcm;