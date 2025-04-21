import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOffresStageActive,
  fetchOffresEmploiActive,
} from '../../store/services/offreService';
import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Button,
  Skeleton,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import JobCard from './JobCard';
import JobDetailsModal from './JobDetailsModal';
import ApplyModal from './ApplyModal';

const theme = createTheme({
  palette: {
    primary: { main: '#1E88E5' },
    secondary: { main: '#1e3a8a' },
    text: { secondary: '#475569' },
  },
});

function CareersPage() {
  const dispatch = useDispatch();
  const { offreStageActive, offreJobActive, loading, error } = useSelector(
    (state) => state.offres
  );

  const [selectedJob, setSelectedJob] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOffresStageActive());
    dispatch(fetchOffresEmploiActive());
  }, [dispatch]);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setDetailsOpen(true);
  };

  const handleApply = (job = null) => {
    setSelectedJob(job);
    setApplyOpen(true);
  };

  const renderJobGrid = (jobs, title) => {
    const jobList = jobs?.OffreJobActive ?? jobs?.OffreStageActive ?? [];
    return (
      <Box sx={{ mb: 12 }}>
        <Typography variant="h4" sx={{ color: 'secondary.main', fontWeight: 600, mb: 4 }}>
          {title}
        </Typography>
        <Divider sx={{ mb: 6 }} />
        {error && (
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography color="error">{error}</Typography>
            <Button
              onClick={() => {
                dispatch(fetchOffresStageActive());
                dispatch(fetchOffresEmploiActive());
              }}
            >
              Réessayer
            </Button>
          </Box>
        )}
        <Grid container spacing={4}>
          {loading ? (
            [...Array(3)].map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))
          ) : jobList.length > 0 ? (
            jobList.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job._id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <JobCard
                    job={job}
                    onViewDetails={handleViewDetails}
                    onApply={handleApply}
                  />
                </motion.div>
              </Grid>
            ))
          ) : (
            <Typography>Aucune offre disponible.</Typography>
          )}
        </Grid>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ paddingTop: '100px' }}>
        <Container maxWidth="lg">
          {/* First Header Section */}
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              backgroundColor: '#f8fafc',
              borderRadius: 3,
              paddingTop: { xs: 8, md: 9 },
              paddingBottom: { xs: 8, md: 9 },
              paddingLeft: 0,
              paddingRight: 0,
              mb: 4,
            }}
          >
            <Typography
              variant="h3"
              sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}
            >
              Rejoignez une équipe visionnaire
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: '1.2rem',
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              Chez nous, chaque idée compte. Explorez nos opportunités et contribuez à des projets qui redéfinissent l'avenir.
            </Typography>
          </Box>

          {/* Second Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                width: '100%',
                textAlign: 'center',
                background: 'linear-gradient(90deg, #e0f2fe, #bfdbfe)',
                borderRadius: 3,
                padding: { xs: 2, md: 4 },
                mb: 4,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: 'secondary.main', fontWeight: 600, mb: 1 }}
              >
                Lancez votre carrière dès aujourd'hui
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '1rem',
                  maxWidth: '700px',
                  margin: '0 auto',
                }}
              >
                Découvrez des rôles stimulants et faites partie d'une aventure qui valorise votre talent et votre ambition.
              </Typography>
            </Box>
          </motion.div>

          {/* Spontaneous Application Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            role="region"
            aria-labelledby="spontaneous-application-title"
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'linear-gradient(90deg, #1e40af, #60a5fa)',
                borderRadius: 3,
                padding: { xs: 4, md: 5 },
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                mb: 6,
              }}
            >
              <Typography
                id="spontaneous-application-title"
                variant="h6"
                sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Candidature Spontanée
              </Typography>
              <Button
                variant="contained"
                onClick={() => handleApply()}
                aria-label="Soumettre une candidature spontanée"
                startIcon={<SendIcon />}
                sx={{
                  backgroundColor: '#ffffff',
                  color: 'secondary.main',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  borderRadius: 2,
                  paddingX: 6,
                  paddingY: 1.5,
                  '&:hover': {
                    backgroundColor: '#f1f5f9',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                Déposez votre candidature spontanée
              </Button>
            </Box>
          </motion.div>

          {/* Job and Internship Sections */}
          {renderJobGrid(offreJobActive, 'Offres d’Emploi')}
          {renderJobGrid(offreStageActive, 'Offres de Stage')}

          {/* Modals */}
          <JobDetailsModal
            open={detailsOpen}
            onClose={() => setDetailsOpen(false)}
            job={selectedJob}
          />
          <ApplyModal
            open={applyOpen}
            onClose={() => setApplyOpen(false)}
            job={selectedJob}
          />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default CareersPage;