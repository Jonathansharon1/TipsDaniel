import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import logo from '../assets/LogoTips.jpg';
import { useLanguage } from '../context/LanguageContext';
import { languageOptions } from '../locales/translations';
import ReactCountryFlag from 'react-country-flag';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(26, 31, 60, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const Logo = styled('img')(({ theme }) => ({
  height: '50px',
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    height: '40px',
  },
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const NavLink = styled(Link)(({ theme, active }) => ({
  color: active ? '#00B4D8' : 'white',
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: active ? 600 : 400,
  position: 'relative',
  padding: '0.5rem 1rem',
  transition: 'all 0.3s ease',
  fontFamily: "'Inter', sans-serif",
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: active ? '100%' : '0%',
    height: '2px',
    backgroundColor: '#00B4D8',
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    color: '#00B4D8',
    '&::after': {
      width: '100%',
    },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const NavButton = styled('button')(({ theme, active }) => ({
  background: 'none',
  border: 'none',
  color: active ? '#00B4D8' : 'white',
  fontSize: '1.1rem',
  fontWeight: active ? 600 : 400,
  position: 'relative',
  padding: '0.5rem 1rem',
  transition: 'all 0.3s ease',
  fontFamily: "'Inter', sans-serif",
  cursor: 'pointer',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: active ? '100%' : '0%',
    height: '2px',
    backgroundColor: '#00B4D8',
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    color: '#00B4D8',
    '&::after': {
      width: '100%',
    },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const LanguageSelector = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const LanguageMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    minWidth: '150px',
  },
}));

const LanguageMenuItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const JoinButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #00b4d8 0%, #0096c7 100%)',
  color: '#fff',
  padding: '0.7rem 2.2rem 0.7rem 1.5rem',
  borderRadius: '18px',
  fontWeight: 700,
  fontSize: '1.15rem',
  boxShadow: '0 2px 16px 0 rgba(0,180,216,0.15)',
  textTransform: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '0.1em',
  transition: 'background 0.2s, box-shadow 0.2s',
  '&:hover': {
    background: 'linear-gradient(90deg, #0096c7 0%, #00b4d8 100%)',
    boxShadow: '0 4px 24px 0 rgba(0,180,216,0.25)',
  },
}));

const LanguageButton = styled(Button)(({ theme }) => ({
  minWidth: '140px',
  maxWidth: '200px',
  padding: theme.spacing(1, 2),
  marginLeft: theme.spacing(1),
  color: 'white',
  border: '1px solid rgba(255,255,255,0.3)',
  background: 'transparent',
  borderRadius: '20px',
  fontWeight: 500,
  boxShadow: 'none',
  textTransform: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  overflow: 'visible',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: theme.palette.primary.main,
  },
}));

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSectionClick = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileOpen(false);
  };

  const handleLanguageClick = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageSelect = (code) => {
    setLanguage(code);
    handleLanguageClose();
  };

  const currentLanguageOption = languageOptions.find(option => option.code === language);

  return (
    <>
      <StyledAppBar 
        position="fixed" 
        sx={{ 
          background: scrolled 
            ? 'rgba(26, 31, 60, 0.95)' 
            : 'rgba(26, 31, 60, 0.8)',
          boxShadow: scrolled 
            ? '0 4px 30px rgba(0, 0, 0, 0.2)' 
            : '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 1, sm: 2 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/">
                <Logo src={logo} alt={t('brandName')} />
              </Link>
              <span style={{ display: 'none' }}>{t('brandName')}</span>
            </Box>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <NavLinks>
                  <NavButton 
                    active={location.pathname === '/' && document.getElementById('features')?.getBoundingClientRect().top < 100}
                    onClick={() => handleSectionClick('features')}
                  >
                    {t('whyUs')}
                  </NavButton>
                  <NavButton 
                    active={location.pathname === '/' && document.getElementById('how-it-works')?.getBoundingClientRect().top < 100}
                    onClick={() => handleSectionClick('how-it-works')}
                  >
                    {t('howItWorks')}
                  </NavButton>
                  <NavLink 
                    to="/blog" 
                    active={location.pathname === '/blog'}
                  >
                    {t('blog')}
                  </NavLink>
                </NavLinks>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <LanguageButton
                    onClick={handleLanguageClick}
                    startIcon={
                      currentLanguageOption ? (
                        <ReactCountryFlag
                          countryCode={currentLanguageOption.countryCode}
                          svg
                          style={{ width: '1.5em', height: '1.5em', borderRadius: '50%', marginRight: 4 }}
                          title={currentLanguageOption.name}
                        />
                      ) : (
                        <ReactCountryFlag
                          countryCode="GB"
                          svg
                          style={{ width: '1.5em', height: '1.5em', borderRadius: '50%', marginRight: 4 }}
                          title="English"
                        />
                      )
                    }
                    endIcon={<ArrowDropDownIcon style={{ fontSize: 18, marginLeft: 2 }} />}
                  >
                    {currentLanguageOption?.name || 'English'}
                  </LanguageButton>
                  
                  <JoinButton component={Link} to="/join">
                    {t('joinNow')}
                    <ArrowForwardIcon sx={{ fontSize: 26 }} />
                  </JoinButton>

                  <Menu
                    anchorEl={languageAnchorEl}
                    open={Boolean(languageAnchorEl)}
                    onClose={handleLanguageClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        minWidth: '120px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        '& .MuiMenuItem-root': {
                          padding: '12px 16px',
                          fontSize: '1rem',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem onClick={() => handleLanguageSelect('en')}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span role="img" aria-label="English">🇺🇸</span>
                        <Typography>English</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem onClick={() => handleLanguageSelect('es')}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span role="img" aria-label="Spanish">🇪🇸</span>
                        <Typography>Español</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem onClick={() => handleLanguageSelect('he')}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span role="img" aria-label="Hebrew">🇮🇱</span>
                        <Typography>עברית</Typography>
                      </Box>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            background: 'rgba(26, 31, 60, 0.95)',
            backdropFilter: 'blur(10px)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '20px',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton
              color="inherit"
              aria-label="close drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              component={Link}
              to="/"
              onClick={handleDrawerToggle}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1.1rem',
                justifyContent: 'flex-start',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/features"
              onClick={handleDrawerToggle}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1.1rem',
                justifyContent: 'flex-start',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {t('whyUs')}
            </Button>
            <Button
              component={Link}
              to="/how-it-works"
              onClick={handleDrawerToggle}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1.1rem',
                justifyContent: 'flex-start',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {t('howItWorks')}
            </Button>
            <Button
              component={Link}
              to="/blog"
              onClick={handleDrawerToggle}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1.1rem',
                justifyContent: 'flex-start',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {t('blog')}
            </Button>
            <Button
              component={Link}
              to="/join"
              onClick={handleDrawerToggle}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1.1rem',
                justifyContent: 'flex-start',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {t('joinNow')}
            </Button>
            <Box sx={{ mt: 2 }}>
              <Button
                onClick={handleLanguageClick}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  width: '100%',
                  justifyContent: 'flex-start',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <ReactCountryFlag
                  countryCode={languageOptions.find(opt => opt.code === language)?.countryCode || 'US'}
                  svg
                  style={{ width: '1.5em', height: '1.5em', borderRadius: '50%' }}
                />
                {languageOptions.find(opt => opt.code === language)?.name}
              </Button>
              <Menu
                anchorEl={languageAnchorEl}
                open={Boolean(languageAnchorEl)}
                onClose={handleLanguageClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    background: 'rgba(26, 31, 60, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    minWidth: '150px',
                    '& .MuiMenuItem-root': {
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    },
                  },
                }}
              >
                {languageOptions.map((option) => (
                  <MenuItem
                    key={option.code}
                    onClick={() => handleLanguageSelect(option.code)}
                    selected={option.code === language}
                    sx={{
                      color: option.code === language ? theme.palette.primary.main : 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ReactCountryFlag
                        countryCode={option.countryCode}
                        svg
                        style={{ width: '1.5em', height: '1.5em', borderRadius: '50%', marginRight: 8 }}
                        title={option.name}
                      />
                      <Typography>{option.name}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Box>
      </Drawer>
      <Toolbar />
    </>
  );
};

export default NavBar; 