import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOffresStageActive,
  fetchOffresEmploiActive,
} from '../../store/services/offreService';
import { fetchDepartments } from '../../store/services/departService';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import FilterListIcon from '@mui/icons-material/FilterList';
import JobCard from './JobCard';
import JobDetailsModal from './JobDetailsModal';
import ApplyModal from './ApplyModal';

const theme = createTheme({
  palette: {
    primary: { main: '#6366f1' },
    secondary: { main: '#0f172a' },
    text: { secondary: '#64748b' },
    background: { 
      default: '#fefefe',
      paper: '#ffffff'
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function CareersPage() {
  const dispatch = useDispatch();
  const { offreStageActive, offreJobActive, loading: offresLoading, error: offresError } = useSelector(
    (state) => state.offres
  );
  const { departments, loading: departmentsLoading, error: departmentsError } = useSelector(
    (state) => state.departments
  );

  const [selectedJob, setSelectedJob] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedStageDepartment, setSelectedStageDepartment] = useState('all');
  const [selectedJobDepartment, setSelectedJobDepartment] = useState('all');

  useEffect(() => {
    dispatch(fetchOffresStageActive());
    dispatch(fetchOffresEmploiActive());
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setDetailsOpen(true);
  };

  const handleApply = (job = null) => {
    setSelectedJob(job);
    setApplyOpen(true);
  };

  const renderJobGrid = (jobs, title, selectedDepartment, icon) => {
    console.log('Rendering job grid for:', selectedDepartment);
    const jobList = jobs?.OffreJobActive ?? jobs?.OffreStageActive ?? [];
    const filteredJobs =
      selectedDepartment === 'all'
        ? jobList
        : jobList.filter((job) => job.departement._id && job.departement._id === selectedDepartment);

    const isStage = title === 'Offres de Stage';

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card 
          sx={{ 
            mb: 8, 
            borderRadius: 4, 
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            border: '1px solid rgba(99, 102, 241, 0.1)',
            overflow: 'visible',
            position: 'relative',
          }}
        >
          {/* Decorative gradient bar */}
          <Box
            sx={{
              height: 6,
              background: isStage 
                ? 'linear-gradient(90deg, #f59e0b, #f97316)' 
                : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              borderRadius: '16px 16px 0 0',
            }}
          />
          
          <CardContent sx={{ p: 6 }}>
            {/* Section Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60,
                  height: 60,
                  borderRadius: 3,
                  background: isStage 
                    ? 'linear-gradient(135deg, #fef3c7, #fed7aa)' 
                    : 'linear-gradient(135deg, #e0e7ff, #ddd6fe)',
                  mr: 3,
                }}
              >
                {icon}
              </Box>
              <Box>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'secondary.main',
                    mb: 1,
                  }}
                >
                  {title}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary',
                    fontSize: '1.1rem',
                  }}
                >
                  {isStage 
                    ? 'Démarrez votre parcours professionnel avec nous' 
                    : 'Rejoignez notre équipe et façonnez l\'avenir'}
                </Typography>
              </Box>
            </Box>

            {/* Department Filter */}
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <FilterListIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                  Filtrer par département
                </Typography>
              </Box>
              
              <FormControl 
                sx={{ 
                  minWidth: 280,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    backgroundColor: '#f8fafc',
                    '&:hover': {
                      backgroundColor: '#f1f5f9',
                    },
                  },
                }} 
                error={!!departmentsError}
              >
                <InputLabel id={`${title}-department-filter-label`}>
                  Choisir un département
                </InputLabel>
                {departmentsLoading ? (
                  <Skeleton variant="rectangular" width={280} height={56} sx={{ borderRadius: 3 }} />
                ) : departmentsError ? (
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography color="error" sx={{ mb: 2 }}>
                      {departmentsError}
                    </Typography>
                    <Button
                      onClick={() => dispatch(fetchDepartments())}
                      variant="outlined"
                      size="small"
                    >
                      Réessayer
                    </Button>
                  </Box>
                ) : (
                  <Select
                    labelId={`${title}-department-filter-label`}
                    value={selectedDepartment}
                    label="Choisir un département"
                    onChange={(e) =>
                      title === 'Offres de Stage'
                        ? setSelectedStageDepartment(e.target.value)
                        : setSelectedJobDepartment(e.target.value)
                    }
                    aria-label={`Filtrer les ${title.toLowerCase()} par département`}
                  >
                    <MenuItem value="all">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <BusinessIcon sx={{ mr: 1, fontSize: 18 }} />
                        Tous les départements
                      </Box>
                    </MenuItem>
                    {departments && departments.length > 0 ? (
                      departments.map((dept) => (
                        <MenuItem key={dept._id} value={dept._id}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <BusinessIcon sx={{ mr: 1, fontSize: 18, color: 'primary.main' }} />
                            {dept.NameDep}
                          </Box>
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Aucun département disponible</MenuItem>
                    )}
                  </Select>
                )}
              </FormControl>
            </Box>

            <Divider sx={{ mb: 5, borderColor: 'rgba(99, 102, 241, 0.2)' }} />

            {/* Error Display */}
            {offresError && (
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  mb: 4,
                  p: 3,
                  backgroundColor: '#fef2f2',
                  borderRadius: 3,
                  border: '1px solid #fecaca',
                }}
              >
                <Typography color="error" sx={{ mb: 2 }}>
                  {offresError}
                </Typography>
                <Button
                  onClick={() => {
                    dispatch(fetchOffresStageActive());
                    dispatch(fetchOffresEmploiActive());
                  }}
                  variant="contained"
                  color="error"
                >
                  Réessayer
                </Button>
              </Box>
            )}

            {/* Jobs Grid */}
            <Grid container spacing={4}>
              {offresLoading ? (
                [...Array(6)].map((_, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Skeleton 
                      variant="rectangular" 
                      height={320} 
                      sx={{ borderRadius: 3 }}
                    />
                  </Grid>
                ))
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <Grid item xs={12} sm={6} md={4} key={job._id}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <JobCard
                        job={job}
                        onViewDetails={handleViewDetails}
                        onApply={handleApply}
                        sx={{ 
                          height: '100%',
                          borderRadius: 3,
                          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                          border: '1px solid rgba(0,0,0,0.05)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
                            transform: 'translateY(-2px)',
                          }
                        }}
                      />
                    </motion.div>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box 
                    sx={{ 
                      textAlign: 'center', 
                      py: 8,
                      backgroundColor: '#f8fafc',
                      borderRadius: 3,
                      border: '2px dashed #e2e8f0',
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'text.secondary',
                        mb: 1,
                        fontWeight: 500,
                      }}
                    >
                      Aucune offre disponible
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Aucune offre disponible pour ce département actuellement.
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: '#fafbfc', minHeight: '100vh' }}>
        <div style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <Container maxWidth="lg">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  mb: 8,
                  position: 'relative',
                }}
              >
                {/* Background decoration */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -50,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 200,
                    height: 200,
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: -1,
                  }}
                />
                
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                  }}
                >
                  Votre Avenir Commence Ici
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 400,
                    mb: 4,
                    maxWidth: '800px',
                    margin: '0 auto',
                    lineHeight: 1.6,
                  }}
                >
                  Rejoignez une équipe passionnée et contribuez à façonner l'avenir 
                  de la technologie. Découvrez des opportunités qui correspondent à vos ambitions.
                </Typography>
                
                {/* Stats chips */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Chip 
                    label="Innovation" 
                    sx={{ 
                      backgroundColor: '#e0e7ff', 
                      color: '#6366f1', 
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      px: 2,
                    }} 
                  />
                  <Chip 
                    label="Croissance" 
                    sx={{ 
                      backgroundColor: '#fef3c7', 
                      color: '#f59e0b', 
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      px: 2,
                    }} 
                  />
                  <Chip 
                    label="Excellence" 
                    sx={{ 
                      backgroundColor: '#dcfce7', 
                      color: '#16a34a', 
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      px: 2,
                    }} 
                  />
                </Box>
              </Box>
            </motion.div>

            {/* Spontaneous Application Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              role="region"
              aria-labelledby="spontaneous-application-title"
            >
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 4,
                  mb: 8,
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
                  border: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Decorative elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 100,
                    height: 100,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '50%',
                  }}
                />
                
                <CardContent
                  sx={{
                    textAlign: 'center',
                    py: 6,
                    px: 4,
                    position: 'relative',
                  }}
                >
                  <SendIcon 
                    sx={{ 
                      fontSize: 48, 
                      color: '#ffffff', 
                      mb: 2,
                      opacity: 0.9,
                    }} 
                  />
                  <Typography
                    id="spontaneous-application-title"
                    variant="h4"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    Candidature Spontanée
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      mb: 4,
                      fontSize: '1.1rem',
                      maxWidth: '600px',
                      margin: '0 auto 2rem auto',
                    }}
                  >
                    Vous ne trouvez pas le poste idéal ? Envoyez-nous votre candidature 
                    et nous vous contacterons dès qu'une opportunité correspondra à votre profil.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleApply()}
                    aria-label="Soumettre une candidature spontanée"
                    startIcon={<SendIcon />}
                    sx={{
                      backgroundColor: '#ffffff',
                      color: '#667eea',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      borderRadius: 3,
                      px: 6,
                      py: 2,
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                      '&:hover': {
                        backgroundColor: '#f8fafc',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Postuler Maintenant
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Job and Internship Sections */}
            {renderJobGrid(
              offreJobActive, 
              'Offres d\'Emploi', 
              selectedJobDepartment,
              <WorkIcon sx={{ fontSize: 28, color: '#6366f1' }} />
            )}
            {renderJobGrid(
              offreStageActive, 
              'Offres de Stage', 
              selectedStageDepartment,
              <SchoolIcon sx={{ fontSize: 28, color: '#f59e0b' }} />
            )}

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
      </Box>
    </ThemeProvider>
  );
}

export default CareersPage;