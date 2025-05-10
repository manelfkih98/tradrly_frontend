import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  InputBase,
  alpha,
  Modal,
  TextField,
  Typography,
  Fade,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../image/image 4.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { loginCondidat } from '../store/services/postsService';

const navLinks = [
  { label: 'Who are we', path: '/about' },
  { label: 'Our work', path: '/home#work' },
  { label: 'Our team', path: '/home#team' },
  { label: 'Careers', path: '/careers' },
  { label: 'Blog', path: '/blog' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('email'));
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const candidateName = localStorage.getItem('name') || 'Candidat';

 
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem('email'));
    };
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await loginCondidat(data.email);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('name', response.data.nom);
      setIsLoggedIn(true);
      setOpen(false);
      reset();
     
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion.');
      console.error('Erreur de connexion:', err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
    reset();
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
    navigate('/home', { replace: true });
  };

  // Liste des liens avec "Candidatures" ajouté si connecté
  const links = isLoggedIn
    ? [...navLinks, { label: 'Candidatures', path: '/dashboardcon' }]
    : navLinks;

  return (
    <AppBar sx={{ backgroundColor: '#0a0a0a' }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 10 } }}>
        <Box sx={{ height: '99px', display: 'flex', alignItems: 'center' }}>
          <NavLink to='/home'>
            <img
              src={logo}
              alt='Logo'
              style={{ width: '120px', height: '50px', objectFit: 'contain' }}
            />
          </NavLink>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          {links.map((link) => (
            <Button
              key={link.label}
              component={NavLink}
              to={link.path}
              color='inherit'
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                position: 'relative',
                '&:hover': { color: '#1e3a8a' },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  width: '0%',
                  height: '2px',
                  backgroundColor: '#1e3a8a',
                  transition: 'width 0.3s',
                },
                '&:hover::after': { width: '100%' },
              }}
            >
              {link.label}
            </Button>
          ))}
          {isLoggedIn ? (
            <>
              <Typography
                sx={{
                  color: '#F3F4F6',
                  fontSize: '1rem',
                  fontWeight: 500,
                  mr: 2,
                }}
              >
                {candidateName}
              </Typography>
              <Button
                onClick={handleLogout}
                sx={{
                  textTransform: 'none',
                  fontSize: '1rem',
                  background: 'linear-gradient(90deg, rgba(30, 59, 138, 0.45), rgba(212, 175, 55, 0.45))',
                  color: 'white',
                  px: 3,
                  py: 1,
                  borderRadius: '8px',
                  '&:hover': { background: 'linear-gradient(90deg, #1e3a8a, #d4af37)' },
                }}
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setOpen(true)}
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                background: 'linear-gradient(90deg, rgba(30, 59, 138, 0.45), rgba(212, 175, 55, 0.45))',
                color: 'white',
                px: 3,
                py: 1,
                borderRadius: '8px',
                '&:hover': { background: 'linear-gradient(90deg, #1e3a8a, #d4af37)' },
              }}
            >
              Connexion
            </Button>
          )}
        </Box>

        <Box
          sx={{
            position: 'relative',
            borderRadius: '999px',
            backgroundColor: alpha('#ffffff', 0.1),
            '&:hover': { backgroundColor: alpha('#ffffff', 0.2) },
            width: 250,
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 0.5,
          }}
        >
          <SearchIcon sx={{ color: 'white', mr: 1 }} />
          <InputBase
            placeholder='Search for something…'
            inputProps={{ 'aria-label': 'search' }}
            sx={{ color: 'white', width: '100%' }}
          />
        </Box>
      </Toolbar>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Fade in={open}>
          <Box
            sx={{
              width: 360,
              bgcolor: '#1F2937',
              borderRadius: '12px',
              p: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography
              variant='h6'
              sx={{ color: '#F3F4F6', mb: 2, fontWeight: 600, textAlign: 'center' }}
            >
              Connexion
            </Typography>
            <Typography
              sx={{
                color: '#6B7280',
                fontSize: '0.9rem',
                textAlign: 'center',
                mb: 2,
                animation: 'fadeIn 0.5s ease-in',
                '@keyframes fadeIn': {
                  '0%': { opacity: 0, transform: 'translateY(-10px)' },
                  '100%': { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              Accédez à votre espace candidat
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'L’email est requis',
                  pattern: {
                    value: /^[ a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Veuillez entrer un email valide',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Email'
                    margin='normal'
                    variant='outlined'
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#F3F4F6',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                        '&:hover fieldset': { borderColor: '#8B5CF6' },
                        '&.Mui-focused fieldset': { borderColor: '#8B5CF6' },
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#8B5CF6' },
                      '& .MuiFormHelperText-root': { color: '#F87171' },
                    }}
                  />
                )}
              />
              {error && (
                <Typography sx={{ color: '#F87171', mt: 1, fontSize: '0.875rem' }}>
                  {error}
                </Typography>
              )}
              <Button
                type='submit'
                variant='contained'
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  background: 'linear-gradient(90deg, rgba(30, 59, 138, 0.49), rgba(212, 175, 55, 0.47))',
                  color: '#F3F4F6',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': { background: 'linear-gradient(90deg, #1e3a8a, #d4af37)' },
                }}
              >
                Se connecter
              </Button>
            </form>
            <Button
              onClick={handleClose}
              sx={{
                mt: 1,
                color: 'rgba(255, 255, 255, 0.7)',
                textTransform: 'none',
                fontSize: '0.875rem',
                width: '100%',
                '&:hover': { color: '#F3F4F6' },
              }}
            >
              Annuler
            </Button>
          </Box>
        </Fade>
      </Modal>
    </AppBar>
  );
};

export default Navbar;