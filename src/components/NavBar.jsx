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
  useMediaQuery
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import logo from '../assets/LogoTips.jpg';
import Button from './Button';

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

const NavLink = styled(Link)(({ theme, active }) => ({
  color: active ? '#00B4D8' : 'white',
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: active ? 600 : 400,
  position: 'relative',
  padding: '0.5rem 1rem',
  transition: 'all 0.3s ease',
  fontFamily: "'Inter', 'Poppins', sans-serif",
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
  fontFamily: "'Inter', 'Poppins', sans-serif",
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

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const drawer = (
    <Box
      sx={{
        width: 250,
        background: 'rgba(26, 31, 60, 0.95)',
        height: '100%',
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <Logo src={logo} alt="Tips Daniel Logo" />
      </Box>
      <List>
        <ListItem button onClick={() => handleSectionClick('features')}>
          <ListItemText primary="Why Us?" />
        </ListItem>
        <ListItem button onClick={() => handleSectionClick('how-it-works')}>
          <ListItemText primary="How It Works?" />
        </ListItem>
        <ListItem button component={Link} to="/blog" onClick={() => setMobileOpen(false)}>
          <ListItemText primary="Blog" />
        </ListItem>
        <ListItem button component={Link} to="/join" onClick={() => setMobileOpen(false)}>
          <ListItemText primary="Join Now" />
        </ListItem>
      </List>
    </Box>
  );

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
                <Logo src={logo} alt="Tips Daniel Logo" />
              </Link>
            </Box>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
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
                    Why Us?
                  </NavButton>
                  <NavButton 
                    active={location.pathname === '/' && document.getElementById('how-it-works')?.getBoundingClientRect().top < 100}
                    onClick={() => handleSectionClick('how-it-works')}
                  >
                    How It Works?
                  </NavButton>
                  <NavLink 
                    to="/blog" 
                    active={location.pathname === '/blog'}
                  >
                    Blog
                  </NavLink>
                </NavLinks>
                <Button 
                  component={Link} 
                  to="/join"
                  showArrow
                  size="medium"
                >
                  Join Now
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Drawer
        variant="temporary"
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
            width: 250,
            background: 'rgba(26, 31, 60, 0.95)',
            backdropFilter: 'blur(10px)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Toolbar />
    </>
  );
};

export default NavBar; 