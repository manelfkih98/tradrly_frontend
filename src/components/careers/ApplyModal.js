import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { postuler, postulerSansOffre } from '../../store/services/postsService';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  maxHeight: '90vh',
  overflowY: 'auto',
};

function ApplyModal({ open, onClose, job }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    niveau: '',
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async () => {
    // validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.niveau ||
      !formData.file
    ) {
      alert('Veuillez remplir tous les champs requis et joindre un CV.');
      return;
    }

    // préparation du FormData
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('number', formData.number);
    data.append('niveau', formData.niveau);
    data.append('file', formData.file);
    if (job) {
      data.append('jobId', job._id);
    } else {
      // pour la spontannée
      data.append('jobId', 'null');
    }

    try {
      setIsSubmitting(true);
      if (job) {
        await dispatch(postuler(data));
      } else {
        await dispatch(postulerSansOffre(data));
      }
      onClose();
    } catch (err) {
      console.error('Erreur lors de la soumission :', err);
      alert('Une erreur est survenue. Merci de réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={modalStyle}>
          <Typography
            variant="h5"
            sx={{ color: '#1e3a8a', fontWeight: 600 }}
            gutterBottom
          >
            {job ? `Postuler à ${job.titre}` : 'Candidature Spontanée'}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            {[
              { label: 'Nom complet', name: 'name', required: true },
              { label: 'Email', name: 'email', type: 'email', required: true },
              { label: 'Téléphone', name: 'number' },
              { label: 'Niveau', name: 'niveau', required: true },
            ].map(({ label, name, type = 'text', required = false }) => (
              <Grid item xs={12} key={name}>
                <TextField
                  fullWidth
                  label={label}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  required={required}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1e3a8a',
                    },
                  }}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  borderColor: '#1e3a8a',
                  color: '#1e3a8a',
                  '&:hover': { borderColor: '#d4af37', color: '#d4af37' },
                }}
              >
                Télécharger CV
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx"
                  hidden
                  onChange={handleChange}
                />
              </Button>
              {formData.file && (
                <Typography variant="body2" mt={1}>
                  Fichier : {formData.file.name}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                borderColor: '#1e3a8a',
                color: '#1e3a8a',
                '&:hover': { borderColor: '#d4af37', color: '#d4af37' },
              }}
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting}
              sx={{
                bgcolor: '#1e3a8a',
                '&:hover': { bgcolor: '#d4af37', color: '#1e3a8a' },
              }}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Soumettre'}
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Modal>
  );
}

export default ApplyModal;
