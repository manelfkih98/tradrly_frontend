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
  Chip,
  CircularProgress,
  Alert,
  Divider,
  Stack,
} from "@mui/material";
import { EmailOutlined, SubjectOutlined } from "@mui/icons-material";

function AllContact() {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts.contacts);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          Une erreur est survenue : {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {contacts && contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <Grid item xs={12} sm={6} md={4} key={contact._id || index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: "0.3s",
                  bgcolor: "#fff",
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Avatar
                      sx={{
                        bgcolor: "#1e88e5",
                        width: 44,
                        height: 44,
                        fontSize: "1rem",
                      }}
                    >
                      {contact.email.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {contact.object}
                      </Typography>
                     
                    </Box>
                  </Stack>

                  <Divider sx={{ mb: 2 }} />

                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <EmailOutlined fontSize="small" color="primary" />
                    <Typography variant="body2" color="text.secondary">
                      {contact.email}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <SubjectOutlined fontSize="small" color="action" sx={{ mt: 0.3 }} />
                    <Typography variant="body2">{contact.subject}</Typography>
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
