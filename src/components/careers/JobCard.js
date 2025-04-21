import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Chip,
    Box,
  } from '@mui/material';
  import { Business, LocationOn, Work } from '@mui/icons-material';
  import { motion } from 'framer-motion';
  
  function JobCard({ job, onViewDetails, onApply }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)' }}
        transition={{ duration: 0.3 }}
        style={{ height: '100%' }}
      >
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
          }}
          role="article"
          aria-labelledby={`job-title-${job._id}`}
        >
          <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Typography
              id={`job-title-${job._id}`}
              variant="h5"
              sx={{
                color: '#1e3a8a',
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.3,
              }}
            >
              {job.titre}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <Chip
                icon={<Work sx={{ color: '#1E88E5 !important' }} />}
                label={job.type}
                size="small"
                sx={{
                  bgcolor: '#e8f0fe',
                  color: '#1e3a8a',
                  fontWeight: 500,
                }}
              />
              {job.location && (
                <Chip
                  icon={<LocationOn sx={{ color: '#1E88E5 !important' }} />}
                  label={job.location}
                  size="small"
                  sx={{
                    bgcolor: '#e8f0fe',
                    color: '#1e3a8a',
                    fontWeight: 500,
                  }}
                />
              )}
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: '#475569',
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {job.description}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {job.requirements.slice(0, 2).map((req, index) => (
                <Chip
                  key={index}
                  label={req}
                  size="small"
                  sx={{
                    bgcolor: '#1e3a8a',
                    color: 'white',
                    fontWeight: 500,
                    borderRadius: '16px',
                   
                  }}
                />
              ))}
            </Box>
          </CardContent>
          <CardActions
            sx={{
              justifyContent: 'space-between',
              p: 2,
              bgcolor: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="small"
                sx={{
                  color: '#1e3a8a',
                  fontWeight: 600,
                  '&:hover': { color: '#d4af37' },
                }}
                onClick={() => onViewDetails(job)}
                aria-label={`Voir les détails de ${job.titre}`}
              >
                Détails
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="small"
                variant="contained"
                sx={{
                  bgcolor: '#1e3a8a',
                  color: 'white',
                  fontWeight: 600,
                  px: 3,
                  '&:hover': {
                    bgcolor: '#d4af37',
                    color: '#1e3a8a',
                  },
                }}
                onClick={() => onApply(job)}
                aria-label={`Postuler pour ${job.titre}`}
              >
                Postuler
              </Button>
            </motion.div>
          </CardActions>
        </Card>
      </motion.div>
    );
  }
  
  export default JobCard;