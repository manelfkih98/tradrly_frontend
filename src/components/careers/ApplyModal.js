import { useState, useEffect } from 'react';
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
import { fetchDepartments } from "../../store/services/departService";
import { useDispatch, useSelector } from "react-redux";

// Minimalist modal styling (unchanged)
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

// Stepper, button, textField, select, and tableCell styles (unchanged)
const stepperStyle = { /* ... unchanged ... */ };
const buttonStyle = { /* ... unchanged ... */ };
const textFieldStyle = { /* ... unchanged ... */ };
const selectStyle = { /* ... unchanged ... */ };
const tableCellStyle = { /* ... unchanged ... */ };

const steps = ['Informations', 'Coordonnées', 'Profil', 'Confirmation'];

// Validation rules for each step
const validateStep = (step, formData) => {
  const errors = {};

  switch (step) {
    case 0: // Informations
      if (!formData.nom.trim()) errors.nom = 'Le nom est requis';
      if (!formData.prenom.trim()) errors.prenom = 'Le prénom est requis';
      if (!formData.titre.trim()) errors.titre = 'Le titre est requis';
      if (!formData.dateNaissance) {
        errors.dateNaissance = 'La date de naissance est requise';
      } else {
        const selectedDate = new Date(formData.dateNaissance);
        const today = new Date();
        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 120);
        if (selectedDate > today) {
          errors.dateNaissance = 'La date de naissance ne peut pas être dans le futur';
        } else if (selectedDate < minDate) {
          errors.dateNaissance = 'La date de naissance semble invalide (trop ancienne)';
        }
      }
      break;

    case 1: // Coordonnées
      if (!formData.email.trim()) {
        errors.email = 'L\'email est requis';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Format d\'email invalide';
      }
      if (!formData.adresse.trim()) errors.adresse = 'L\'adresse est requise';
      if (!formData.telephone.trim()) {
        errors.telephone = 'Le numéro de téléphone est requis';
      } 
      break;

    case 2: // Profil
      if (!formData.niveauEtude.trim()) errors.niveauEtude = 'Le niveau d\'étude est requis';
      if (!formData.departement) errors.departement = 'Le département est requis';
      if (!formData.profil.trim()) errors.profil = 'Le profil est requis';
      if (!formData.competences.some(comp => comp.trim())) {
        errors.competences = 'Au moins une compétence est requise';
      }
      break;

    case 3: // Confirmation
      // No additional validation needed here, as we validate all fields in previous steps
      break;

    default:
      break;
  }

  return errors;
};

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
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e, field, index) => {
    const { value } = e.target;
    setFormData((prev) => {
      if (['competences', 'generales', 'langues'].includes(field)) {
        return {
          ...prev,
          [field]: prev[field].map((item, i) => (i === index ? value : item)),
        };
      }
      return { ...prev, [field]: value };
    });
    // Clear error for the field being edited
    setFormErrors((prev) => ({ ...prev, [field]: '' }));
  };

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleAddRow = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
    setFormErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleRemoveRow = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
    setFormErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleNext = () => {
    const errors = validateStep(activeStep, formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setErrorMessage('Veuillez corriger les erreurs avant de continuer.');
      return;
    }
    setFormErrors({});
    setErrorMessage('');
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setFormErrors({});
    setErrorMessage('');
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    // Validate all steps before submission
    for (let step = 0; step < steps.length - 1; step++) {
      const errors = validateStep(step, formData);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setErrorMessage('Veuillez corriger les erreurs dans les étapes précédentes avant de soumettre.');
        setActiveStep(step);
        return;
      }
    }

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
      setErrorMessage('');
      setSuccessMessage('');
      await dispatch(job ? postuler(data) : postulerSansOffre(data));
      setSuccessMessage(job ? 'Candidature envoyée avec succès !' : 'Candidature spontanée envoyée avec succès !');
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
      setFormErrors({});
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Une erreur s\'est produite.';
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Get today's date in YYYY-MM-DD format for the max attribute
  const today = new Date().toISOString().split('T')[0];

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
              error={!!formErrors.nom}
              helperText={formErrors.nom}
              required
            />
            <TextField
              label="Prénom"
              name="prenom"
              value={formData.prenom}
              onChange={(e) => handleChange(e, 'prenom')}
              fullWidth
              sx={textFieldStyle}
              margin="normal"
              error={!!formErrors.prenom}
              helperText={formErrors.prenom}
              required
            />
            <TextField
              label="Titre"
              name="titre"
              value={formData.titre}
              onChange={(e) => handleChange(e, 'titre')}
              fullWidth
              sx={textFieldStyle}
              margin="normal"
              error={!!formErrors.titre}
              helperText={formErrors.titre}
              required
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
              inputProps={{ max: today }}
              error={!!formErrors.dateNaissance}
              helperText={formErrors.dateNaissance}
              required
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
              error={!!formErrors.email}
              helperText={formErrors.email}
              required
            />
            <TextField
              label="Adresse"
              name="adresse"
              value={formData.adresse}
              onChange={(e) => handleChange(e, 'adresse')}
              fullWidth
              sx={textFieldStyle}
              margin="normal"
              error={!!formErrors.adresse}
              helperText={formErrors.adresse}
              required
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
              label="téléphone"
              name="telephone"
              value={formData.telephone}
              onChange={(e) => handleChange(e, 'telephone')}
              fullWidth
              sx={textFieldStyle}
              margin="normal"
              error={!!formErrors.telephone}
              helperText={formErrors.telephone}
              required
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
              error={!!formErrors.niveauEtude}
              helperText={formErrors.niveauEtude}
              required
            />
            <FormControl fullWidth sx={selectStyle} margin="normal" error={!!formErrors.departement}>
              <InputLabel id="departement-label">Département</InputLabel>
              <Select
                labelId="departement-label"
                name="departement"
                value={formData.departement}
                label="Département"
                onChange={(e) => handleChange(e, 'departement')}
                required
              >
                <MenuItem value=""><em>Aucun</em></MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept.NameDep}>{dept.NameDep}</MenuItem>
                ))}
              </Select>
              {!!formErrors.departement && (
                <Typography variant="caption" color="error">
                  {formErrors.departement}
                </Typography>
              )}
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
              error={!!formErrors.profil}
              helperText={formErrors.profil}
              required
            />
            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, fontWeight: 600, color: '#1E3A8A' }}>
              Compétences
            </Typography>
            {formErrors.competences && (
              <Typography variant="caption" color="error" sx={{ mb: 1, display: 'block' }}>
                {formErrors.competences}
              </Typography>
            )}
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
        open={!!errorMessage || !!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={successMessage ? 'success' : 'error'}
          sx={{ width: '100%', maxWidth: 500, borderRadius: 2 }}
        >
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ApplyModal;