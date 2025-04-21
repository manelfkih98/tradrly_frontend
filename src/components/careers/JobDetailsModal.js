import { Modal, Box, Typography, Divider, Button } from '@mui/material';
import { motion } from 'framer-motion';

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

function JobDetailsModal({ open, onClose, job }) {
  if (!job) return null;

  // Formatage de la date
  const formattedDate = new Date(job.date_publi).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Modal open={open} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={modalStyle}>
          <Typography variant="h5" sx={{ color: '#1e3a8a', fontWeight: 600 }} gutterBottom>
            {job.titre}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {job.type} - Publié le {formattedDate}
          </Typography>
          <Divider className="my-4" />
          <Typography variant="h6" sx={{ color: '#1e3a8a' }}>
            Description
          </Typography>
          <Typography variant="body1" className="mb-4">
            {job.description}
          </Typography>
          <Typography variant="h6" sx={{ color: '#1e3a8a' }}>
            Exigences
          </Typography>
          <ul className="list-disc pl-5 mb-4">
            {job.requirements.map((req, index) => (
              <li key={index}>
                <Typography variant="body1">{req}</Typography>
              </li>
            ))}
          </ul>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#1e3a8a',
              '&:hover': { bgcolor: '#d4af37', color: '#1e3a8a' },
            }}
            onClick={onClose}
            fullWidth
          >
            Fermer
          </Button>
        </Box>
      </motion.div>
    </Modal>
  );
}

export default JobDetailsModal;
