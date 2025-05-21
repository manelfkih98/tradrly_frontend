import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContact } from "../../store/services/contactService";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  CircularProgress,
  Alert,
  Divider,
  Stack,
  Tooltip,
} from "@mui/material";
import { EmailOutlined, SubjectOutlined } from "@mui/icons-material";

function truncateText(text, maxLength = 100) {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

function AllContact() {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts.contacts);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return (
    <Box sx={{ p: 4, minHeight: "100vh",  }}>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress sx={{ color: "#914091" }} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          Une erreur est survenue : {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {contacts && contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <Grid item xs={12} sm={6} md={4} key={contact._id || index}>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  transition: "transform 0.3s ease",
                  bgcolor: "#fff",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 30px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: "linear-gradient(135deg,rgba(145, 64, 145, 0.4) 0%,rgba(30, 59, 138, 0.42) 100%)",
                    background: "linear-gradient(135deg,rgba(145, 64, 145, 0.62),rgba(30, 59, 138, 0.38))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 80,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#fff",
                      color: "#914091",
                      width: 50,
                      height: 50,
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    {contact.email.charAt(0).toUpperCase()}
                  </Avatar>
                </Box>

                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="#1E3A8A"
                    textAlign="center"
                    gutterBottom
                  >
                    {contact.object}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <EmailOutlined sx={{ color: "#914091" }} fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {contact.email}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <SubjectOutlined sx={{ color: "#1E3A8A", mt: 0.3 }} fontSize="small" />
                    <Tooltip title={contact.subject}>
                      <Typography variant="body2" color="text.primary">
                        {truncateText(contact.subject, 20)}
                      </Typography>
                    </Tooltip>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          !loading && (
            <Typography sx={{ mt: 4, mx: "auto" }} color="text.secondary">
              Aucun message de contact trouvé.
            </Typography>
          )
        )}
      </Grid>
    </Box>
  );
}

export default AllContact;
