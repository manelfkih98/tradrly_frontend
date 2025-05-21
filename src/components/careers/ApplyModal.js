import { useState ,useEffect} from 'react';
import {
  Modal, Box, Typography, Divider, Grid, TextField, Button,
  Snackbar, Alert, Stepper, Step, StepLabel, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, IconButton,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { motion } from 'framer-motion';

import { postuler, postulerSansOffre } from '../../store/services/postsService';
import { BarLoader } from 'react-spinners';
import { Add, Delete } from '@mui/icons-material';
import {
  fetchDepartments,
 
} from "../../store/services/departService";
import { useDispatch, useSelector } from "react-redux";

// Minimalist modal styling
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 580,
  bgcolor: '#fafafa',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  p: 4,
  borderRadius: 3,
  maxHeight: '90vh',
  overflowY: 'auto',
  border: 'none',
};

// Compact stepper styling
const stepperStyle = {
  bgcolor: '#ffffff',
  borderRadius: 2,
  p: 2,
  mb: 3,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  '& .MuiStepLabel-label': {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '#4b5563',
  },
  '& .MuiStepLabel-label.Mui-active': {
    color: '#914091',
    fontWeight: 600,
  },
  '& .MuiStepIcon-root': {
    fontSize: '1.2rem',
    color: '#e5e7eb',
    '&.Mui-active': {
      color: '#914091',
    },
    '&.Mui-completed': {
      color: '#16a34a',
    },
  },
};

// Button styling
const buttonStyle = {
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.9rem',
  borderRadius: 1.5,
  px: 2.5,
  py: 0.75,
  transition: 'all 0.2s ease',
};

// Form field styling
const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 1.5,
    bgcolor: '#ffffff',
    '& fieldset': {
      borderColor: '#e5e7eb',
    },
    '&:hover fieldset': {
      borderColor: '#914091',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#914091',
      boxShadow: '0 0 0 3px rgba(145, 64, 145, 0.1)',
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.9rem',
    color: '#6b7280',
    fontWeight: 500,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#914091',
  },
};

// Select field styling
const selectStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 1.5,
    bgcolor: '#ffffff',
    '& fieldset': {
      borderColor: '#e5e7eb',
    },
    '&:hover fieldset': {
      borderColor: '#914091',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#914091',
      boxShadow: '0 0 0 3px rgba(145, 64, 145, 0.1)',
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.9rem',
    color: '#6b7280',
    fontWeight: 500,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#914091',
  },
};

// Table cell styling
const tableCellStyle = {
  borderBottom: '1px solid #e5e7eb',
  py: 1,
  px: 2,
};

const steps = ['Informations', 'Coordonnées', 'Profil', 'Confirmation'];

// Sample list of French departments (abbreviated for brevity)


const ApplyModal = ({ open, onClose, job }) => {
  const dispatch = useDispatch();
 
    const { departments, loading, error } = useSelector(
      (state) => state.departments
    );
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    titre: '',
  
    email: '',
    adresse: '',
    linkedin: '',
    dateNaissance: '',
    telephone: '',
   
    niveauEtude: '',
    departement: '',
    profil: '',
    competences: [''],
    generales: [''],
    langues: [''],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e, field, index) => {
    const { value } = e.target;
    if (['competences', 'generales', 'langues'].includes(field)) {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].map((item, i) => (i === index ? value : item)),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };
    useEffect(() => {
      dispatch(fetchDepartments());
    }, [dispatch]);

  const handleAddRow = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const handleRemoveRow = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    for (const key of Object.keys(formData)) {
      if (['competences', 'generales', 'langues'].includes(key)) {
        formData[key].forEach((item) => {
          if (item.trim()) data.append(key, item.trim());
        });
      } else {
        data.append(key, formData[key]);
      }
    }

    if (job) data.append('jobId', job._id);

    try {
      setIsSubmitting(true);
      
      await dispatch(job ? postuler(data) : postulerSansOffre(data));
      setSuccess(true);
      onClose();
      setFormData({
        nom: '',
        prenom: '',
        titre: '',
        email: '',
        adresse: '',
        linkedin: '',
        dateNaissance: '',
        telephone: '',
        niveauEtude: '',
        departement: '',
        profil: '',
        competences: [''],
        generales: [''],
        langues: [''],
      });
      setActiveStep(0);
    } catch (err) {
      console.error(err);
      alert("Une erreur s'est produite.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepFields = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ bgcolor: '#ffffff', p: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
            <TextField
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={(e) => handleChange(e, 'nom')}
              fullWidth
              sx={textFieldStyle}
              margin="normal"
            />
            <TextField
              label="Prénom"
              name="prenom"
              value={formData.prenom}
              onChange={(e) => handleChange(e, 'prenom')}
              fullWidth
              sx={textFieldStyle}
              margin="normal"
            />
            <TextField
              label="Titre"
              name="titre"
              value={formData.titre}
              onChange={(e) => handleChange(e, 'titre')}
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
              onChange={(e) => handleChange(e, 'dateNaissance')}
              fullWidth
              sx={textFieldStyle}
              margin="normal"
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ bgcolor: '#ffffff', p: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
          
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange(e, 'email')}
              fullWidth
              sx={textFieldStyle}
              margin="normal"
            />
            <TextField
              label="Adresse"
              name="adresse"
              value={formData.adresse}
              onChange={(e) => handleChange(e, 'adresse')}
              fullWidth
              sx={textFieldStyle}
              margin="normal"
            />
            <TextField
              label="LinkedIn"
              name="linkedin"
              value={formData.linkedin}
              onChange={(e) => handleChange(e, 'linkedin')}
              fullWidth
              sx={textFieldStyle}
              margin="normal"
            />
            <TextField
              label="Numéro"
              name="telephone"
              value={formData.telephone}
              onChange={(e) => handleChange(e, 'telephone')}
              fullWidth
              sx={textFieldStyle}
              margin="normal"
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ bgcolor: '#ffffff', p: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
   
            <TextField
              label="Niveau d'étude"
              name="niveauEtude"
              value={formData.niveauEtude}
              onChange={(e) => handleChange(e, 'niveauEtude')}
              fullWidth
              sx={textFieldStyle}
              margin="normal"
            />
            <FormControl fullWidth sx={selectStyle} margin="normal">
              <InputLabel id="departement-label">Département</InputLabel>
              <Select
                labelId="departement-label"
                name="departement"
                value={formData.departement}
                label="Département"
                onChange={(e) => handleChange(e, 'departement')}
              >
                <MenuItem value=""><em>Aucun</em></MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept.NameDep}>{dept.NameDep}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Profil"
              name="profil"
              multiline
              rows={3}
              value={formData.profil}
              onChange={(e) => handleChange(e, 'profil')}
              fullWidth
              sx={textFieldStyle}
              margin="normal"
            />
            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, fontWeight: 600, color: '#1E3A8A' }}>
              Compétences
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableCellStyle}>Compétence</TableCell>
                    <TableCell sx={tableCellStyle} align="right">
                      <IconButton
                        onClick={() => handleAddRow('competences')}
                        sx={{ color: '#914091' }}
                        size="small"
                      >
                        <Add />
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
                          onChange={(e) => handleChange(e, 'competences', index)}
                          fullWidth
                          variant="outlined"
                          size="small"
                          sx={{ ...textFieldStyle, '& .MuiInputLabel-root': { fontSize: '0.8rem' } }}
                        />
                      </TableCell>
                      <TableCell sx={tableCellStyle} align="right">
                        <IconButton
                          onClick={() => handleRemoveRow('competences', index)}
                          disabled={formData.competences.length === 1}
                          sx={{ color: '#b91c1c' }}
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, fontWeight: 600, color: '#1E3A8A' }}>
              Compétences générales
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableCellStyle}>Compétence générale</TableCell>
                    <TableCell sx={tableCellStyle} align="right">
                      <IconButton
                        onClick={() => handleAddRow('generales')}
                        sx={{ color: '#914091' }}
                        size="small"
                      >
                        <Add />
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
                          onChange={(e) => handleChange(e, 'generales', index)}
                          fullWidth
                          variant="outlined"
                          size="small"
                          sx={{ ...textFieldStyle, '& .MuiInputLabel-root': { fontSize: '0.8rem' } }}
                        />
                      </TableCell>
                      <TableCell sx={tableCellStyle} align="right">
                        <IconButton
                          onClick={() => handleRemoveRow('generales', index)}
                          disabled={formData.generales.length === 1}
                          sx={{ color: '#b91c1c' }}
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, fontWeight: 600, color: '#1E3A8A' }}>
              Langues
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableCellStyle}>Langue</TableCell>
                    <TableCell sx={tableCellStyle} align="right">
                      <IconButton
                        onClick={() => handleAddRow('langues')}
                        sx={{ color: '#914091' }}
                        size="small"
                      >
                        <Add />
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
                          onChange={(e) => handleChange(e, 'langues', index)}
                          fullWidth
                          variant="outlined"
                          size="small"
                          sx={{ ...textFieldStyle, '& .MuiInputLabel-root': { fontSize: '0.8rem' } }}
                        />
                      </TableCell>
                      <TableCell sx={tableCellStyle} align="right">
                        <IconButton
                          onClick={() => handleRemoveRow('langues', index)}
                          disabled={formData.langues.length === 1}
                          sx={{ color: '#b91c1c' }}
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ bgcolor: '#ffffff', p: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
            <Typography variant="subtitle1" fontWeight={600} color="#1E3A8A" mb={2}>
              Résumé de votre candidature
            </Typography>
            <Grid container spacing={1}>
              {Object.entries(formData).map(([key, value]) => (
                <Grid item xs={12} key={key}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2" sx={{ width: '40%', fontWeight: 500, color: '#6b7280' }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1E3A8A', flex: 1, wordBreak: 'break-word' }}>
                      {Array.isArray(value) ? value.filter((v) => v.trim()).join(', ') || 'Non spécifié' : value || 'Non spécifié'}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Box sx={modalStyle}>
            <Typography
              variant="h6"
              sx={{ color: '#1E3A8A', fontWeight: 700, fontSize: '1.5rem' }}
              gutterBottom
            >
              {job ? `Candidature: ${job.titre}` : 'Candidature Spontanée'}
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel sx={stepperStyle}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ minHeight: 300 }}>{renderStepFields()}</Box>

            {isSubmitting && (
              <Box display="flex" justifyContent="center" my={3}>
                <BarLoader color="#914091" height={5} width={120} />
              </Box>
            )}

            <Box mt={4} display="flex" justifyContent="space-between">
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  ...buttonStyle,
                  color: '#4b5563',
                  bgcolor: '#e5e7eb',
                  '&:hover': { bgcolor: '#d1d5db' },
                  '&:disabled': { bgcolor: '#f3f4f6', color: '#9ca3af' },
                }}
              >
                Retour
              </Button>
              {activeStep < steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    ...buttonStyle,
                    bgcolor: '#914091',
                    '&:hover': { bgcolor: '#7A347A' },
                  }}
                >
                  Continuer
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  sx={{
                    ...buttonStyle,
                    bgcolor: '#914091',
                    '&:hover': { bgcolor: '#7A347A' },
                    '&:disabled': { bgcolor: '#c4b5fd', color: '#fff' },
                  }}
                >
                  {isSubmitting ? 'Envoi...' : 'Envoyer'}
                </Button>
              )}
            </Box>
          </Box>
        </motion.div>
      </Modal>

      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ bgcolor: '#f3e8ff', color: '#1E3A8A', fontWeight: 500 }}
        >
          Candidature envoyée avec succès !
        </Alert>
      </Snackbar>
    </>
  );
};

export default ApplyModal;