import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Check as CheckIcon, TrendingUp as TrendingUpIcon, People as PeopleIcon, Security as SecurityIcon, CreditCard as CreditCardIcon, Payment as PaymentIcon, Flag as FlagIcon } from '@mui/icons-material';
import CustomButton from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(19, 47, 76, 0.8)',
  border: '1px solid rgba(0, 180, 216, 0.2)',
  borderRadius: '16px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0, 180, 216, 0.1), rgba(72, 202, 228, 0.1))',
    zIndex: -1
  },
  
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0, 180, 216, 0.2)',
    border: '1px solid rgba(0, 180, 216, 0.3)',
    
    '& .price': {
      transform: 'scale(1.05)',
      background: 'linear-gradient(45deg, #00B4D8, #48CAE4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }
  }
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
  transition: 'all 0.3s ease',
  background: 'linear-gradient(45deg, #ffffff, #48CAE4)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}));

const FeatureIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '40px',
  color: theme.palette.primary.main,
  '& svg': {
    fontSize: '1.5rem',
    filter: 'drop-shadow(0 0 8px rgba(0, 180, 216, 0.3))'
  }
}));

const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 32px rgba(0, 180, 216, 0.2)',
    border: '1px solid rgba(0, 180, 216, 0.3)',
  }
}));

const DashboardIcon = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(45deg, rgba(0, 180, 216, 0.2), rgba(72, 202, 228, 0.2))',
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: '24px',
    color: '#00B4D8'
  }
}));

const DashboardGrid = styled(Grid)(({ theme }) => ({
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)',
  padding: theme.spacing(4),
  borderRadius: '24px',
  marginBottom: theme.spacing(6),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0, 180, 216, 0.1), rgba(72, 202, 228, 0.1))',
    borderRadius: '24px',
    zIndex: -1
  }
}));

const DashboardTitle = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: theme.spacing(1)
}));

const DashboardValue = styled(Typography)(({ theme }) => ({
  color: '#00B4D8',
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: theme.spacing(2)
}));

const DashboardDescription = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '0.9rem',
  lineHeight: 1.6
}));

const PricingCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  position: 'relative',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 32px rgba(0, 180, 216, 0.2)',
    border: '1px solid rgba(0, 180, 216, 0.3)',
  }
}));

const RecommendedBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  background: 'linear-gradient(45deg, #00B4D8, #48CAE4)',
  color: 'white',
  padding: theme.spacing(0.5, 2),
  borderRadius: '12px',
  fontSize: '0.875rem',
  fontWeight: 600
}));

const LeagueBadge = styled('img')(({ theme }) => ({
  width: '80px',
  height: '80px',
  objectFit: 'contain',
  filter: 'grayscale(100%) brightness(0.8)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    filter: 'grayscale(0%) brightness(1)',
    transform: 'scale(1.1)'
  },
  [theme.breakpoints.down('sm')]: {
    width: '60px',
    height: '60px'
  }
}));

const LeagueSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  background: 'rgba(19, 47, 76, 0.3)',
  backdropFilter: 'blur(10px)',
  borderTop: '1px solid rgba(0, 180, 216, 0.2)',
  borderBottom: '1px solid rgba(0, 180, 216, 0.2)',
  margin: theme.spacing(6, 0)
}));

function JoinPage() {
  const theme = useTheme();
  const { t } = useLanguage();

  const leagues = [
    { name: 'Premier League', logo: '/assets/leagues/premier-league.png' },
    { name: 'La Liga', logo: '/assets/leagues/la-liga.png' },
    { name: 'Serie A', logo: '/assets/leagues/serie-a.png' },
    { name: 'Bundesliga', logo: '/assets/leagues/bundesliga.png' },
    { name: 'Ligue 1', logo: '/assets/leagues/ligue-1.png' },
    { name: 'Champions League', logo: '/assets/leagues/champions-league.png' }
  ];

  const paymentMethods = [
    {
      id: 1,
      title: t('join.paymentSection.option1.title'),
      description: t('join.paymentSection.option1.description'),
      button: t('join.paymentSection.option1.button'),
      link: 'https://app.paymentbeast.com/mc/payment?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ODA5IiwicmVxdWVzdCI6eyJyZWZlcmVuY2VJZCI6IkJyaWFuIENhcyIsImFtb3VudCI6MzkuOSwiY3VycmVuY3kiOiJVU0QifX0.AoVHX6EoGRMQhsE00Fm8NUZT4AfxwaNmBmVPscHshYw',
      icon: <CreditCardIcon />,
      badge: t('join.paymentSection.mostPopular'),
      background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.1), rgba(72, 202, 228, 0.1))',
      borderColor: 'rgba(0, 180, 216, 0.3)',
      buttonStyle: 'linear-gradient(45deg, #00B4D8, #0096C7)'
    },
    {
      id: 2,
      title: t('join.paymentSection.option2.title'),
      description: t('join.paymentSection.option2.description'),
      button: t('join.paymentSection.option2.button'),
      link: 'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-71T45749CG856552HNAMG2BA',
      icon: <PaymentIcon />,
      background: 'linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(0, 86, 179, 0.1))',
      borderColor: 'rgba(0, 123, 255, 0.3)',
      buttonStyle: 'linear-gradient(45deg, #007BFF, #0056B3)'
    },
    {
      id: 3,
      title: t('join.paymentSection.option3.title'),
      description: t('join.paymentSection.option3.description'),
      button: t('join.paymentSection.option3.button'),
      link: 'https://app.paymentbeast.com/mc/payment?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ODA5IiwicmVxdWVzdCI6eyJiaWxsaW5nQWRkcmVzcyI6eyJjb3VudHJ5Q29kZSI6IkJSIn0sInJlZmVyZW5jZUlkIjoiYnJhemlsIGJyaWFuIiwicGF5bWVudE1ldGhvZCI6IkVYVEVSTkFMX0hQUCIsImFtb3VudCI6MjIwLCJjdXJyZW5jeSI6IkJSTCJ9fQ.zCRZSh-xx1hKtokci5gqYp9cDG46p6GGHtWGtuQzCUA',
      icon: <FlagIcon />,
      background: 'linear-gradient(135deg, rgba(34, 139, 34, 0.1), rgba(0, 100, 0, 0.1))',
      borderColor: 'rgba(34, 139, 34, 0.3)',
      buttonStyle: 'linear-gradient(45deg, #228B22, #006400)'
    }
  ];

  const features = [
    {
      icon: <TrendingUpIcon />,
      title: 'Success Rate',
      value: '78%',
      description: 'Consistent winning predictions across all sports'
    },
    {
      icon: <PeopleIcon />,
      title: 'Community',
      value: '15+',
      description: 'Weekly expert recommendations from our team'
    },
    {
      icon: <SecurityIcon />,
      title: 'Reliability',
      value: '24/7',
      description: 'Round-the-clock support and updates'
    }
  ];

  const handlePayment = (paypalLink) => {
    window.open(paypalLink, '_blank');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      pt: { xs: 12, md: 16 },
      pb: 8,
      background: 'linear-gradient(180deg, rgba(10, 25, 41, 0.7) 0%, rgba(19, 47, 76, 0.8) 100%)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 0%, rgba(0, 180, 216, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }
    }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
            fontWeight: 700,
            mb: 4,
            textAlign: 'center',
            color: 'white'
          }}
        >
          {t('join.title')}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            mb: 6,
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.8)'
          }}
        >
          {t('join.subtitle')}
        </Typography>

        <Box sx={{
          background: 'rgba(19, 47, 76, 0.7)',
          borderRadius: '18px',
          boxShadow: '0 2px 16px 0 rgba(0,180,216,0.10)',
          p: { xs: 2, sm: 4 },
          mb: 5,
          maxWidth: 1000,
          mx: 'auto',
          mt: 4,
        }}>
          <Typography variant="h5" fontWeight={700} color="#fff" mb={2} textAlign="center">
            {t('join.whatWeOffer')}
          </Typography>
          <List sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 3 },
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            p: 0,
            m: 0,
          }}>
            {Object.values(t('join.features')).map((feature, idx) => (
              <ListItem key={idx} sx={{ width: 'auto', color: '#fff', p: 0, m: 0 }}>
                <FeatureIcon>
                  <CheckIcon />
                </FeatureIcon>
                <ListItemText primary={feature} primaryTypographyProps={{ fontSize: 17, fontWeight: 500 }} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 4,
        }}>
          <Box sx={{
            background: 'rgba(200, 200, 200, 0.10)',
            color: '#b0b0b0',
            borderLeft: '4px solid #b0b0b0',
            borderRadius: '8px',
            px: 3,
            py: 1.2,
            fontSize: '1rem',
            fontWeight: 500,
            maxWidth: 700,
            minWidth: 320,
            width: '100%',
            boxShadow: 'none',
            textAlign: 'left',
          }}>
            {t('termsOfUseJoinNote')}
          </Box>
        </Box>

        {/* Payment Methods Section */}
        <Box sx={{ mt: { xs: 6, md: 8 }, mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              mb: { xs: 4, md: 6 },
              textAlign: 'center',
              color: 'white',
              background: 'linear-gradient(45deg, #ffffff, #48CAE4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              px: { xs: 2, sm: 0 }
            }}
          >
            {t('join.paymentSection.title')}
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 1, sm: 0 } }}>
            {paymentMethods.map((method) => (
              <Grid item xs={12} sm={6} md={4} key={method.id}>
                <Box sx={{
                  position: 'relative',
                  height: '100%',
                  background: 'rgba(19, 47, 76, 0.8)',
                  borderRadius: { xs: '16px', md: '20px' },
                  border: `2px solid ${method.borderColor}`,
                  p: { xs: 3, sm: 3.5, md: 4 },
                  transition: 'all 0.3s ease-in-out',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: method.background,
                    zIndex: -1
                  },
                  '&:hover': {
                    transform: { xs: 'none', md: 'translateY(-8px)' },
                    boxShadow: { xs: `0 4px 20px ${method.borderColor}`, md: `0 12px 40px ${method.borderColor}` },
                    border: `2px solid ${method.borderColor.replace('0.3', '0.6')}`,
                  }
                }}>
                  {/* Badge for most popular */}
                  {method.badge && (
                    <Box sx={{
                      position: 'absolute',
                      top: { xs: 12, md: 16 },
                      right: { xs: 12, md: 16 },
                      background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                      color: 'white',
                      px: { xs: 1.5, md: 2 },
                      py: { xs: 0.3, md: 0.5 },
                      borderRadius: '12px',
                      fontSize: { xs: '0.7rem', md: '0.75rem' },
                      fontWeight: 600,
                      zIndex: 1
                    }}>
                      {method.badge}
                    </Box>
                  )}

                  {/* Icon */}
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: { xs: 2, md: 3 }
                  }}>
                    <Box sx={{
                      width: { xs: 56, md: 64 },
                      height: { xs: 56, md: 64 },
                      borderRadius: { xs: '14px', md: '16px' },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      '& svg': {
                        fontSize: { xs: '28px', md: '32px' },
                        color: '#00B4D8'
                      }
                    }}>
                      {method.icon}
                    </Box>
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      mb: { xs: 1.5, md: 2 },
                      textAlign: 'center',
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                      lineHeight: 1.3
                    }}
                  >
                    {method.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      mb: { xs: 3, md: 4 },
                      textAlign: 'center',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line',
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                    }}
                  >
                    {method.description}
                  </Typography>

                  {/* CTA Button */}
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    <CustomButton
                      variant="contained"
                      onClick={() => handlePayment(method.link)}
                      sx={{
                        background: method.buttonStyle,
                        color: 'white',
                        px: { xs: 2, sm: 2.5, md: 3 },
                        py: { xs: 1.2, md: 1.5 },
                        borderRadius: '12px',
                        fontWeight: 600,
                        fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                        boxShadow: `0 4px 15px ${method.borderColor}`,
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s ease',
                        width: '100%',
                        '&:hover': {
                          background: method.buttonStyle.replace('45deg', '225deg'),
                          boxShadow: `0 6px 20px ${method.borderColor}`,
                          transform: { xs: 'none', md: 'translateY(-2px)' },
                        }
                      }}
                    >
                      {method.button}
                    </CustomButton>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default JoinPage; 