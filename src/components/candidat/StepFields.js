import React from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, ErrorOutline as ErrorOutlineIcon } from "@mui/icons-material";

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 1.5,
    bgcolor: "#ffffff",
    "& fieldset": {
      borderColor: "#e5e7eb",
    },
    "&:hover fieldset": {
      borderColor: "#914091",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#914091",
      boxShadow: "0 0 0 3px rgba(145, 64, 145, 0.1)",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.9rem",
    color: "#6b7280",
    fontWeight: 500,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#914091",
  },
};

const tableCellStyle = {
  borderBottom: "1px solid #e5e7eb",
  py: 1,
  px: 2,
};

const buttonStyle = {
  textTransform: "none",
  fontWeight: 600,
  fontSize: "0.9rem",
  borderRadius: 1.5,
  px: 2.5,
  py: 0.75,
  transition: "all 0.2s ease",
};

const StepFields = ({ activeStep, formData, setFormData, errorMessage }) => {
  const handleChange = (e, field, index) => {
    const { value } = e.target;
    if (["competences", "generales", "langues"].includes(field)) {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].map((item, i) => (i === index ? value : item)),
      }));
    } else if (field === "cvLocalFile") {
      setFormData((prev) => ({ ...prev, cvLocalFile: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAddRow = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleRemoveRow = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  switch (activeStep) {
    case 0:
      return (
        <Box sx={{ bgcolor: "#ffffff", p: 3, borderRadius: 2, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)" }}>
          <TextField
            label="Nom"
            name="nom"
            value={formData.nom}
            onChange={(e) => handleChange(e, "nom")}
            fullWidth
            sx={textFieldStyle}
            margin="normal"
          />
          <TextField
            label="Prénom"
            name="prenom"
            value={formData.prenom}
            onChange={(e) => handleChange(e, "prenom")}
            fullWidth
            sx={textFieldStyle}
            margin="normal"
          />
          <TextField
            label="Titre"
            name="titre"
            value={formData.titre}
            onChange={(e) => handleChange(e, "titre")}
            fullWidth
            sx={textFieldStyle}
            margin="normal"
          />
          <TextField
            label="Date de naissance"
            name="dateNaissance"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dateNaissance}
            onChange={(e) => handleChange(e, "dateNaissance")}
            fullWidth
            sx={textFieldStyle}
            margin="normal"
          />
        </Box>
      );
    case 1:
      return (
        <Box sx={{ bgcolor: "#ffffff", p: 3, borderRadius: 2, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)" }}>
          <TextField
            label="Téléphone"
            name="telephone"
            value={formData.telephone}
            onChange={(e) => handleChange(e, "telephone")}
            fullWidth
            sx={textFieldStyle}
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange(e, "email")}
            fullWidth
            sx={textFieldStyle}
            margin="normal"
          />
          <TextField
            label="Adresse"
            name="adresse"
            value={formData.adresse}
            onChange={(e) => handleChange(e, "adresse")}
            fullWidth
            sx={textFieldStyle}
            margin="normal"
          />
          <TextField
            label="LinkedIn"
            name="linkedin"
            value={formData.linkedin}
            onChange={(e) => handleChange(e, "linkedin")}
            fullWidth
            sx={textFieldStyle}
            margin="normal"
          />
          
        </Box>
      );
    case 2:
      return (
        <Box sx={{ bgcolor: "#ffffff", p: 3, borderRadius: 2, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)" }}>
          
          <TextField
            label="Niveau d'étude"
            name="niveauEtude"
            value={formData.niveauEtude}
            onChange={(e) => handleChange(e, "niveauEtude")}
            fullWidth
            sx={textFieldStyle}
            margin="normal"
          />
          <TextField
            label="Département"
            name="departement"
            value={formData.departement}
            onChange={(e) => handleChange(e, "departement")}
            fullWidth
            sx={textFieldStyle}
            margin="normal"
          />
          <TextField
            label="Profil"
            name="profil"
            multiline
            rows={3}
            value={formData.profil}
            onChange={(e) => handleChange(e, "profil")}
            fullWidth
            sx={textFieldStyle}
            margin="normal"
          />
          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, fontWeight: 600, color: "#1E3A8A" }}>
            Compétences
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={tableCellStyle}>Compétence</TableCell>
                  <TableCell sx={tableCellStyle} align="right">
                    <IconButton
                      onClick={() => handleAddRow("competences")}
                      sx={{ color: "#914091" }}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.competences.map((comp, index) => (
                  <TableRow key={index}>
                    <TableCell sx={tableCellStyle}>
                      <TextField
                        value={comp}
                        onChange={(e) => handleChange(e, "competences", index)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ ...textFieldStyle, "& .MuiInputLabel-root": { fontSize: "0.8rem" } }}
                      />
                    </TableCell>
                    <TableCell sx={tableCellStyle} align="right">
                      <IconButton
                        onClick={() => handleRemoveRow("competences", index)}
                        disabled={formData.competences.length === 1}
                        sx={{ color: "#b91c1c" }}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, fontWeight: 600, color: "#1E3A8A" }}>
            Compétences générales
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={tableCellStyle}>Compétence générale</TableCell>
                  <TableCell sx={tableCellStyle} align="right">
                    <IconButton
                      onClick={() => handleAddRow("generales")}
                      sx={{ color: "#914091" }}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.generales.map((gen, index) => (
                  <TableRow key={index}>
                    <TableCell sx={tableCellStyle}>
                      <TextField
                        value={gen}
                        onChange={(e) => handleChange(e, "generales", index)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ ...textFieldStyle, "& .MuiInputLabel-root": { fontSize: "0.8rem" } }}
                      />
                    </TableCell>
                    <TableCell sx={tableCellStyle} align="right">
                      <IconButton
                        onClick={() => handleRemoveRow("generales", index)}
                        disabled={formData.generales.length === 1}
                        sx={{ color: "#b91c1c" }}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, fontWeight: 600, color: "#1E3A8A" }}>
            Langues
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={tableCellStyle}>Langue</TableCell>
                  <TableCell sx={tableCellStyle} align="right">
                    <IconButton
                      onClick={() => handleAddRow("langues")}
                      sx={{ color: "#914091" }}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.langues.map((lang, index) => (
                  <TableRow key={index}>
                    <TableCell sx={tableCellStyle}>
                      <TextField
                        value={lang}
                        onChange={(e) => handleChange(e, "langues", index)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ ...textFieldStyle, "& .MuiInputLabel-root": { fontSize: "0.8rem" } }}
                      />
                    </TableCell>
                    <TableCell sx={tableCellStyle} align="right">
                      <IconButton
                        onClick={() => handleRemoveRow("langues", index)}
                        disabled={formData.langues.length === 1}
                        sx={{ color: "#b91c1c" }}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {errorMessage && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }} role="alert">
              <ErrorOutlineIcon sx={{ color: "#b91c1c", fontSize: "1.25rem" }} />
              <Typography color="error" sx={{ fontSize: "0.95rem" }}>
                {errorMessage}
              </Typography>
            </Box>
          )}
        </Box>
      );
    case 3:
      return (
        <Box sx={{ bgcolor: "#ffffff", p: 3, borderRadius: 2, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)" }}>
          <Typography variant="subtitle1" fontWeight={600} color="#1E3A8A" mb={2}>
            Résumé de votre candidature
          </Typography>
          <Grid container spacing={1}>
            {Object.entries(formData).map(([key, value]) => (
              key !== "cvLocalFile" && (
                <Grid item xs={12} key={key}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2" sx={{ width: "40%", fontWeight: 500, color: "#6b7280" }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#1E3A8A", flex: 1, wordBreak: "break-word" }}>
                      {Array.isArray(value) ? value.filter((v) => v.trim()).join(", ") || "Non spécifié" : value || "Non spécifié"}
                    </Typography>
                  </Box>
                </Grid>
              )
            ))}
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
               
              </Box>
            </Grid>
          </Grid>
        </Box>
      );
    default:
      return null;
  }
};

export default StepFields;