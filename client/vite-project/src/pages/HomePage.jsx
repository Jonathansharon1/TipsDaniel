import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  useTheme,
  Stack,
  CardActions,
  CardMedia,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  FavoriteBorder, 
  ChatBubbleOutline, 
  ShareOutlined,
  Search,
  Add,
  Person,
  ArrowForward,
  TrendingUp,
  Psychology,
  DataUsage,
  Security,
  SupportAgent
} from '@mui/icons-material';
// import teamsImage from '../assets/teams.jpg';
import droneFootage from '../assets/droneFootageField.jpg';
import analyticsField from '../assets/analyticsField.jpg';
import game1 from '../assets/game1.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import CustomButton from '../components/Button';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(12, 0, 8, 0),
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${droneFootage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.7,
    transform: 'scale(1.7)',
    zIndex: 0
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(10, 25, 41, 0.7) 0%, rgba(19, 47, 76, 0.8) 100%)',
    zIndex: 1
  }
}));

const ActionButton = styled(CustomButton)(({ theme }) => ({
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'transparent',
    color: 'white'
  }
}));

const BottomNav = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(8px)',
  background: 'rgba(19, 47, 76, 0.8)'
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.15), rgba(0, 180, 216, 0.05))',
  marginBottom: theme.spacing(2),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -1,
    padding: 1,
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.5), rgba(0, 180, 216, 0.2))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  },
  '& svg': {
    fontSize: '2rem',
    color: theme.palette.primary.main,
    filter: 'drop-shadow(0 0 8px rgba(0, 180, 216, 0.3))'
  }
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  background: 'linear-gradient(145deg, rgba(19, 47, 76, 0.8) 0%, rgba(10, 25, 41, 0.9) 100%)',
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    padding: 1,
    background: 'linear-gradient(145deg, rgba(0, 180, 216, 0.1), rgba(0, 180, 216, 0.05))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out'
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0, 180, 216, 0.15)',
    '&::before': {
      opacity: 1
    },
    '& .feature-icon': {
      transform: 'scale(1.1)',
      '& svg': {
        transform: 'rotate(10deg)',
        color: theme.palette.primary.light
      }
    }
  }
}));

const FeatureDescription = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.85)',
  fontSize: '1.1rem',
  lineHeight: 1.7,
  letterSpacing: '0.015em',
  fontWeight: 300,
  marginTop: theme.spacing(2),
  fontFamily: '"Inter", sans-serif',
  '& strong': {
    color: theme.palette.primary.light,
    fontWeight: 500
  }
}));

const StepWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(3),
  padding: theme.spacing(4),
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '28px',
    top: '80px',
    bottom: '-50%',
    width: '2px',
    background: 'linear-gradient(180deg, #00B4D8 0%, rgba(0, 180, 216, 0) 100%)',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  '&:last-child::before': {
    display: 'none'
  }
}));

const StepNumber = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #00B4D8, #0096C7)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  fontWeight: 700,
  position: 'relative',
  flexShrink: 0,
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: '-4px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.5), rgba(0, 180, 216, 0.2))',
    filter: 'blur(4px)',
    zIndex: -1
  }
}));

const StepContent = styled(Box)(({ theme }) => ({
  flex: 1,
  background: 'linear-gradient(145deg, rgba(19, 47, 76, 0.3) 0%, rgba(10, 25, 41, 0.4) 100%)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: 'linear-gradient(145deg, rgba(19, 47, 76, 0.4) 0%, rgba(10, 25, 41, 0.5) 100%)',
    transform: 'translateX(8px)',
    '& .step-highlight': {
      opacity: 0.15
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 0% 50%, rgba(0, 180, 216, 0.1) 0%, transparent 50%)',
    opacity: 0.5,
    transition: 'opacity 0.3s ease-in-out'
  }
}));

const StepTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.75rem',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  position: 'relative',
  display: 'inline-block',
  background: 'linear-gradient(45deg, #ffffff, #48CAE4)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: '40px',
    height: '3px',
    background: 'linear-gradient(90deg, #00B4D8, transparent)',
    borderRadius: '2px'
  }
}));

const StepHighlight = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '-20%',
  top: '-50%',
  width: '200px',
  height: '200px',
  background: 'radial-gradient(circle, #00B4D8 0%, transparent 70%)',
  opacity: 0.1,
  transition: 'opacity 0.3s ease-in-out',
  className: 'step-highlight'
}));

const UnderlinedText = styled('span')(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  color: '#00B4D8',
  background: 'linear-gradient(45deg, #00B4D8 30%, #48CAE4 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 20px rgba(0, 180, 216, 0.5)',
  fontWeight: 800,
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '-5%',
    bottom: '-4px',
    width: '110%',
    height: '3px',
    background: 'linear-gradient(90deg, rgba(0, 180, 216, 0), #00B4D8 50%, rgba(0, 180, 216, 0))',
    borderRadius: '4px',
    boxShadow: '0 0 10px rgba(0, 180, 216, 0.7)',
    transition: 'all 0.3s ease-in-out',
    animation: 'glow 1.5s ease-in-out infinite alternate'
  },
  '&::before': {
    content: 'attr(data-text)',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #00B4D8 30%, #48CAE4 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'drop-shadow(0 0 15px rgba(0, 180, 216, 0.5))'
  },
  '@keyframes glow': {
    '0%': {
      boxShadow: '0 0 5px rgba(0, 180, 216, 0.5)',
      background: 'linear-gradient(90deg, rgba(0, 180, 216, 0), #00B4D8 50%, rgba(0, 180, 216, 0))'
    },
    '100%': {
      boxShadow: '0 0 20px rgba(0, 180, 216, 0.8)',
      background: 'linear-gradient(90deg, rgba(0, 180, 216, 0.3), #48CAE4 50%, rgba(0, 180, 216, 0.3))'
    }
  }
}));

const AnimatedTypography = motion(Typography);
const AnimatedBox = motion(Box);

const heroVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    } 
  }
};

const heroTextVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      delay: 0.3, 
      ease: "easeOut" 
    } 
  }
};

const buttonVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5, 
      delay: 0.6,
      type: "spring",
      stiffness: 200
    } 
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 400
    }
  },
  tap: {
    scale: 0.95,
    y: 0
  }
};

const GlowingButtonWrapper = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '-4px',
    background: 'linear-gradient(45deg, #00B4D8, #48CAE4, #0096C7)',
    borderRadius: '16px',
    filter: 'blur(10px)',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    zIndex: -1
  },
  '&:hover::before': {
    opacity: 1
  }
}));

function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if we need to scroll to a section (when navigating from another page)
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        // Small delay to ensure the page has rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      // Clear the state to prevent scrolling on subsequent renders
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Fetch latest blog posts
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/blog/posts');
        setLatestPosts(response.data.posts);
      } catch (err) {
        console.error('Error fetching latest posts:', err);
        setError('Failed to load latest blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  const handleJoinClick = () => {
    navigate('/join');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBlogClick = () => {
    navigate('/blog');
  };

  const handleReadMore = (postId) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, marginTop: '100px', marginBottom: '100px' }}>
          <AnimatedBox
            initial="hidden"
            animate="visible"
            sx={{ 
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
              px: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3
            }}
          >
            <AnimatedTypography 
              variant="heroHeading" 
              component="h1"
              variants={heroVariants}
              sx={{ 
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                textAlign: 'center',
                maxWidth: '700px',
                lineHeight: 1.2,
                background: 'linear-gradient(45deg, #ffffff 30%, #48CAE4 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}
            >
              Come <UnderlinedText>Win</UnderlinedText> <br/>With TipsDaniel
            </AnimatedTypography>
            
            <AnimatedTypography 
              variant="hero" 
              variants={heroTextVariants}
              sx={{ 
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                maxWidth: '600px',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                mb: 4
              }}
            >
              The combined power of AI and human expertise that help you see the future in any game.
            </AnimatedTypography>

            <GlowingButtonWrapper
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <CustomButton 
                onClick={handleJoinClick}
                showArrow={true}
              >
                Start Winning Now
              </CustomButton>
            </GlowingButtonWrapper>
          </AnimatedBox>
        </Container>
      </HeroSection>


      {/* Features Section */}
      <Box id="features" sx={{ 
        py: 20, 
        borderTop: 1, 
        borderColor: 'divider', 
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.15,
          zIndex: 0,
          transform: 'scale(1.1)',
          transition: 'transform 0.5s ease-in-out',
          '&:hover': {
            transform: 'scale(1.15)',
          }
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(19, 47, 76, 0.9) 0%, rgba(10, 25, 41, 0.95) 100%)',
          zIndex: 1
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
            position: 'relative'
          }}>
            <Typography variant="h2" align="center" sx={{ 
              mb: 8, 
              color: 'primary.main',
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              letterSpacing: '-0.02em',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #00B4D8, transparent)',
                borderRadius: '2px'
              }
            }}>
              Why You Will Win with Us?
            </Typography>
            <Typography variant="h6" align="center" sx={{ 
              mb: 4,
              lineHeight: 1.8,
              fontSize: "1.1rem",
              maxWidth: "800px",
              margin: "0 auto",
              color: "rgba(255,255,255,0.9)",
              "& p": {
                mb: 2
              }
            }}>
              <p>If you love football, crave the thrill, and know there's more to winning than just luck — you're one of us.</p>
              
              <p>We're a private network of sharp minds who live the game, study the numbers, and built an AI system that turns raw data into real advantages.</p>
              
              <p>This isn't guesswork. It's precision, strategy, and community — built for those who play to win.</p>
            </Typography>
            <Box sx={{ 
              position: 'relative',
              width: '100%',
              minHeight: { xs: '300px', md: '500px' },
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(19, 47, 76, 0.3) 0%, rgba(10, 25, 41, 0.4) 100%)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              mb: 8,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(0, 180, 216, 0.1) 0%, transparent 70%)',
                zIndex: 0
              }
            }}>
              <Box sx={{ 
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 4
              }}>
                <Typography variant="h3" sx={{ 
                  color: 'white',
                  fontWeight: 700,
                  mb: 4,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  background: 'linear-gradient(45deg, #ffffff 30%, #48CAE4 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '4px',
                    background: 'linear-gradient(90deg, transparent, #00B4D8, transparent)',
                    borderRadius: '2px'
                  }
                }}>
                  Our Winning Edge
                </Typography>
                
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 3,
                  width: '100%',
                  maxWidth: '800px',
                  mb: 4,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    height: '80%',
                    background: 'radial-gradient(circle, rgba(0, 180, 216, 0.1) 0%, transparent 70%)',
                    zIndex: -1
                  }
                }}>
                  <Box sx={{ 
                    position: 'relative',
                    p: 3,
                    borderRadius: '20px',
                    background: 'rgba(0, 180, 216, 0.05)',
                    border: '1px solid rgba(0, 180, 216, 0.2)',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(0, 180, 216, 0.1)',
                    backdropFilter: 'blur(5px)',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      background: 'rgba(0, 180, 216, 0.1)',
                      boxShadow: '0 12px 30px rgba(0, 180, 216, 0.3), inset 0 0 15px rgba(0, 180, 216, 0.2)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.1) 0%, transparent 100%)',
                      zIndex: -1
                    }
                  }}>
                    <Typography variant="h2" sx={{ 
                      color: 'primary.light',
                      fontWeight: 700,
                      mb: 1,
                      textShadow: '0 2px 4px rgba(0, 180, 216, 0.3)'
                    }}>
                      87%
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      color: 'white',
                      fontWeight: 600,
                      mb: 1
                    }}>
                      Win Rate
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Consistently outperforming market expectations
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    position: 'relative',
                    p: 3,
                    borderRadius: '20px',
                    background: 'rgba(255, 107, 107, 0.05)',
                    border: '1px solid rgba(255, 107, 107, 0.2)',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255, 107, 107, 0.1)',
                    backdropFilter: 'blur(5px)',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      background: 'rgba(255, 107, 107, 0.1)',
                      boxShadow: '0 12px 30px rgba(255, 107, 107, 0.3), inset 0 0 15px rgba(255, 107, 107, 0.2)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, transparent 100%)',
                      zIndex: -1
                    }
                  }}>
                    <Typography variant="h2" sx={{ 
                      color: 'secondary.light',
                      fontWeight: 700,
                      mb: 1,
                      textShadow: '0 2px 4px rgba(255, 107, 107, 0.3)'
                    }}>
                      24/7
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      color: 'white',
                      fontWeight: 600,
                      mb: 1
                    }}>
                      Analysis
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Round-the-clock monitoring of global matches
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    position: 'relative',
                    p: 3,
                    borderRadius: '20px',
                    background: 'rgba(76, 175, 80, 0.05)',
                    border: '1px solid rgba(76, 175, 80, 0.2)',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(76, 175, 80, 0.1)',
                    backdropFilter: 'blur(5px)',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      background: 'rgba(76, 175, 80, 0.1)',
                      boxShadow: '0 12px 30px rgba(76, 175, 80, 0.3), inset 0 0 15px rgba(76, 175, 80, 0.2)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, transparent 100%)',
                      zIndex: -1
                    }
                  }}>
                    <Typography variant="h2" sx={{ 
                      color: 'success.light',
                      fontWeight: 700,
                      mb: 1,
                      textShadow: '0 2px 4px rgba(76, 175, 80, 0.3)'
                    }}>
                      500+
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      color: 'white',
                      fontWeight: 600,
                      mb: 1
                    }}>
                      Matches Analyzed
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Deep insights across multiple leagues and competitions
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    position: 'relative',
                    p: 3,
                    borderRadius: '20px',
                    background: 'rgba(255, 167, 38, 0.05)',
                    border: '1px solid rgba(255, 167, 38, 0.2)',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255, 167, 38, 0.1)',
                    backdropFilter: 'blur(5px)',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      background: 'rgba(255, 167, 38, 0.1)',
                      boxShadow: '0 12px 30px rgba(255, 167, 38, 0.3), inset 0 0 15px rgba(255, 167, 38, 0.2)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, rgba(255, 167, 38, 0.1) 0%, transparent 100%)',
                      zIndex: -1
                    }
                  }}>
                    <Typography variant="h2" sx={{ 
                      color: 'warning.light',
                      fontWeight: 700,
                      mb: 1,
                      textShadow: '0 2px 4px rgba(255, 167, 38, 0.3)'
                    }}>
                      3.2x
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      color: 'white',
                      fontWeight: 600,
                      mb: 1
                    }}>
                      ROI
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Superior returns compared to traditional betting strategies
                    </Typography>
                  </Box>
                </Box>
                
                <Typography 
                  sx={{ 
                    fontSize: '1.1rem',
                    color: 'rgba(255, 255, 255, 0.95)',
                    maxWidth: '600px',
                    mx: 'auto',
                    mb: 4,
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    fontWeight: 500,
                    lineHeight: 1.6,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '50px',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, rgba(0, 180, 216, 0.5), transparent)',
                      borderRadius: '2px'
                    }
                  }}
                >
                  Our advanced analytics platform provides real-time insights and predictions for upcoming matches, giving you the edge you need to win consistently.
                </Typography>
                
                <GlowingButtonWrapper
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <CustomButton 
                    onClick={handleJoinClick}
                    showArrow={true}
                  >
                    Join Our Winning Team
                  </CustomButton>
                </GlowingButtonWrapper>
              </Box>
            </Box>
            
            <Grid container spacing={4} alignItems="stretch">
              <Grid item xs={12} md={4}>
                <FeatureCard sx={{ 
                  height: '100%',
                  background: 'rgba(19, 47, 76, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0, 180, 216, 0.15)',
                    '&::before': {
                      opacity: 1
                    },
                    '& .feature-icon': {
                      transform: 'scale(1.1)',
                      '& svg': {
                        transform: 'rotate(10deg)',
                        color: theme.palette.primary.light
                      }
                    }
                  }
                }}>
                  <FeatureIcon className="feature-icon" sx={{ transition: 'all 0.3s ease-in-out' }}>
                    <DataUsage sx={{ transition: 'all 0.3s ease-in-out' }} />
                  </FeatureIcon>
                  <Typography variant="h5" sx={{ 
                    color: 'primary.light',
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    marginBottom: 1
                  }}>
                    Proven Edge with AI-Powered Insights
                  </Typography>
                  <FeatureDescription>
                    Join a community that leverages <strong>cutting-edge artificial intelligence</strong> and expert analysis to identify high-value football bets. Our system doesn't guess — it calculates.
                  </FeatureDescription>
                </FeatureCard>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FeatureCard sx={{ 
                  height: '100%',
                  background: 'rgba(19, 47, 76, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0, 180, 216, 0.15)',
                    '&::before': {
                      opacity: 1
                    },
                    '& .feature-icon': {
                      transform: 'scale(1.1)',
                      '& svg': {
                        transform: 'rotate(10deg)',
                        color: theme.palette.primary.light
                      }
                    }
                  }
                }}>
                  <FeatureIcon className="feature-icon" sx={{ transition: 'all 0.3s ease-in-out' }}>
                    <Psychology sx={{ transition: 'all 0.3s ease-in-out' }} />
                  </FeatureIcon>
                  <Typography variant="h5" sx={{ 
                    color: 'primary.light',
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    marginBottom: 1
                  }}>                  
                    Trusted by a Team of Experts   
                  </Typography>
                  <FeatureDescription>
                    Behind every prediction stands a dedicated team of <strong>experienced analysts</strong> working hand-in-hand with our advanced models. It's the perfect balance between human expertise and machine precision.
                  </FeatureDescription>
                </FeatureCard>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FeatureCard sx={{ 
                  height: '100%',
                  background: 'rgba(19, 47, 76, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0, 180, 216, 0.15)',
                    '&::before': {
                      opacity: 1
                    },
                    '& .feature-icon': {
                      transform: 'scale(1.1)',
                      '& svg': {
                        transform: 'rotate(10deg)',
                        color: theme.palette.primary.light
                      }
                    }
                  }
                }}>
                  <FeatureIcon className="feature-icon" sx={{ transition: 'all 0.3s ease-in-out' }}>
                    <TrendingUp sx={{ transition: 'all 0.3s ease-in-out' }} />
                  </FeatureIcon>
                  <Typography variant="h5" sx={{ 
                    color: 'primary.light',
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    marginBottom: 1
                  }}>
                    Built for Winners, Backed by Results
                  </Typography>
                  <FeatureDescription>
                    Our community isn't just about tips — it's about consistent, <strong>data-driven success</strong>. We track performance, optimize strategies, and deliver real value to our members week after week.
                  </FeatureDescription>
                </FeatureCard>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box id="how-it-works" sx={{ 
        py: 15,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${analyticsField})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
          zIndex: 0,
          transform: 'scale(1.05)',
          transition: 'transform 0.5s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          }
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(19, 47, 76, 0.6) 0%, rgba(10, 25, 41, 0.7) 100%)',
          zIndex: 1
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ 
              mb: 12,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              background: 'linear-gradient(45deg, #ffffff 30%, #48CAE4 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #00B4D8, transparent)',
                borderRadius: '2px'
              }
            }}
          >
            How It Works
          </Typography>

          <Box sx={{ 
            maxWidth: '900px', 
            mx: 'auto',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              right: '-20px',
              bottom: '-20px',
              background: 'radial-gradient(circle at 50% 50%, rgba(0, 180, 216, 0.1) 0%, transparent 70%)',
              zIndex: -1,
              borderRadius: '24px'
            }
          }}>
            {[
              {
                number: '1',
                title: 'Join the Inner Circle',
                description: 'Become part of our exclusive community of smart bettors.'
              },
              {
                number: '2',
                title: 'Get Early Game Intelligence',
                description: 'Receive real-time alerts with deep analytics on matches across multiple leagues — long before the market reacts.'
              },
              {
                number: '3',
                title: 'Profit with Precision',
                description: 'Make informed bets backed by data and expertise — and watch your edge grow.'
              }
            ].map((step) => (
              <StepWrapper key={step.number}>
                <StepNumber>{step.number}</StepNumber>
                <StepContent>
                  <StepHighlight />
                  <StepTitle variant="h3">
                    {step.title}
                  </StepTitle>
                  <Typography
                    sx={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    {step.description}
                  </Typography>
                </StepContent>
              </StepWrapper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Blog Section */}
      <Box id="blog" sx={{ 
        py: 20, 
        borderTop: 1, 
        borderColor: 'divider', 
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 100%, rgba(0, 180, 216, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" sx={{ 
            mb: 8, 
            color: 'primary.main',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            letterSpacing: '-0.02em',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '4px',
              background: 'linear-gradient(90deg, transparent, #00B4D8, transparent)',
              borderRadius: '2px'
            }
          }}>
            Latest from Our Blog
          </Typography>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>
          ) : (
            <Grid container spacing={4}>
              {latestPosts.map((post) => (
                <Grid item key={post._id} xs={12} sm={6} md={4}>
                  <FeatureCard>
                    {post.imageUrl && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={post.imageUrl}
                        alt={post.title}
                        sx={{
                          objectFit: 'cover',
                          borderRadius: '8px',
                          mb: 2
                        }}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {post.content.substring(0, 150)}...
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip 
                          label={post.category} 
                          size="small" 
                          sx={{ 
                            background: 'rgba(0, 180, 216, 0.1)',
                            color: 'primary.light'
                          }} 
                        />
                        <CustomButton
                          variant="text"
                          onClick={() => handleReadMore(post._id)}
                          endIcon={<ArrowForward />}
                        >
                          Read More
                        </CustomButton>
                      </Box>
                    </CardContent>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <GlowingButtonWrapper
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <CustomButton 
                onClick={handleBlogClick}
                showArrow={true}
              >
                View All Blog Posts
              </CustomButton>
            </GlowingButtonWrapper>
          </Box>
        </Container>
      </Box>

      {/* Final Call to Action */}
      <Box sx={{ 
        py: 15,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${game1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.7,
          zIndex: 0,
          transform: 'scale(1.1)'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(10, 25, 41, 0.6) 0%, rgba(19, 47, 76, 0.7) 100%)',
          zIndex: 1
        }
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box 
            sx={{ 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              position: 'relative',
              background: 'rgba(10, 25, 41, 0.3)',
              backdropFilter: 'blur(8px)',
              borderRadius: '24px',
              padding: '3rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                background: 'linear-gradient(45deg, #ffffff 30%, #48CAE4 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                textShadow: '0 2px 20px rgba(0,0,0,0.5)'
              }}
            >
              Bet Smarter. Win More.
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '1.25rem',
                color: 'rgba(255, 2555 255, 0.95)',
                maxWidth: '600px',
                mb: 4,
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                fontWeight: 500
              }}
            >
              Stop guessing. Start betting with confidence — backed by data, experts, and real football passion.
            </Typography>
            <GlowingButtonWrapper
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <CustomButton 
                onClick={handleJoinClick}
                showArrow={true}
              >
                Get Access Now
              </CustomButton>
            </GlowingButtonWrapper>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, borderTop: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Typography align="center" color="text.secondary">
            © 2025 TipsDaniel. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;