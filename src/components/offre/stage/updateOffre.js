import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOffreStage } from "../../../store/services/offreService";
import { fetchDepartments } from "../../../store/services/departService";
import dayjs from "dayjs";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Box,
  Typography,
  FormHelperText,
} from "@mui/material";

const UpdateOffre = ({ open, handleClose, offre }) => {
  const dispatch = useDispatch();
  const departments =
    useSelector((state) => state.departments.departments) || [];

  const [editedOffre, setEditedOffre] = useState({
    titre: "",
    description: "",
    date_limite: "",
    departement: "",
  });

  useEffect(() => {
    if (offre) {
      setEditedOffre({
        _id: offre._id || "",
        titre: offre.titre || "",
        description: offre.description || "",
        date_limite: offre.date_limite || "",
        departement: offre.departement?._id || "",
      });
    }
    dispatch(fetchDepartments());
  }, [dispatch, offre]);

  const handleChange = (e) => {
    setEditedOffre({ ...editedOffre, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!editedOffre._id) {
      console.error("Erreur: ID de l'offre manquant");
      return;
    }
    dispatch(updateOffreStage(editedOffre._id, editedOffre));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>
        Modifier l’offre de stage
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Titre"
                name="titre"
                fullWidth
                value={editedOffre.titre}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={4}
                value={editedOffre.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Date de clôture"
                name="date_limite"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={
                  editedOffre.date_limite
                    ? dayjs(editedOffre.date_limite).format("YYYY-MM-DD")
                    : ""
                }
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Département</InputLabel>
                <Select
                  name="departement"
                  value={editedOffre.departement || ""}
                  onChange={handleChange}
                >
                  {departments.length > 0 ? (
                    departments.map((dep) => (
                      <MenuItem key={dep._id} value={dep._id}>
                        {dep.NameDep}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Aucun département disponible</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Annuler
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOffre;
