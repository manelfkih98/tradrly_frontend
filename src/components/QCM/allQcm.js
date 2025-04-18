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
} from "@mui/material";
import MailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ScoreIcon from "@mui/icons-material/EmojiEvents";
import { styled } from "@mui/system";

// Style sans animation (design propre et doux)
const StaticCard = styled(Card)(() => ({
  background: "rgba(255, 255, 255, 0.7)",
  border: "1px solid #e0e0e0",
  borderRadius: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  backdropFilter: "blur(6px)",
}));

const AllQcm = () => {
  const QCMs = useSelector((state) => state.Qcms.QCM);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQcm());
  }, [dispatch]);

  return (
    <Box sx={{ p: 4,  minHeight: "100vh" }}>
     

      {QCMs === undefined ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : QCMs.length === 0 ? (
        <Typography align="center">Aucun QCM trouvé.</Typography>
      ) : (
        <Grid container spacing={4}>
          {QCMs.map((qcm) => (
            <Grid item xs={12} sm={6} md={4} key={qcm._id}>
              <StaticCard>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 56,
                        height: 56,
                        fontSize: 24,
                      }}
                    >
                      {qcm.post_id?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      {qcm.post_id?.name}
                    </Typography>
                  </Stack>

                  <Stack spacing={1} mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <MailIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        {qcm.post_id?.email}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <PhoneIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        {qcm.post_id?.number}
                      </Typography>
                    </Box>
                  </Stack>

                  <Chip
                    icon={<ScoreIcon />}
                    label={`Score : ${qcm.resultat} / ${qcm.questions?.length}`}
                    color={
                      qcm.resultat >= (qcm.questions?.length || 1) / 2
                        ? "success"
                        : "error"
                    }
                    variant="filled"
                    sx={{
                      fontWeight: "bold",
                      borderRadius: 3,
                      fontSize: "0.9rem",
                    }}
                  />
                </CardContent>
              </StaticCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AllQcm;
