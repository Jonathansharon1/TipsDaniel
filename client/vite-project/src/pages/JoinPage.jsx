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
import { Check as CheckIcon, TrendingUp as TrendingUpIcon, People as PeopleIcon, Security as SecurityIcon } from '@mui/icons-material';
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

  const plans = [
    {
      title: t('join.plans.monthly.title'),
      price: t('join.plans.monthly.price'),
      period: t('join.plans.monthly.period'),
      description: t('join.plans.monthly.description'),
      recommended: false,
      paypalLink: 'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-71T45749CG856552HNAMG2BA'
    },
    {
      title: t('join.plans.fourMonth.title'),
      price: t('join.plans.fourMonth.price'),
      period: t('join.plans.fourMonth.period'),
      description: t('join.plans.fourMonth.description'),
      recommended: true,
      paypalLink: 'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-76J25657SW802130DNAMG24Y'
    },
    {
      title: t('join.plans.annual.title'),
      price: t('join.plans.annual.price'),
      period: t('join.plans.annual.period'),
      description: t('join.plans.annual.description'),
      recommended: false,
      paypalLink: 'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-7AD86389KF802552ENAMG3OY'
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

        <Grid container spacing={4}>
          {plans.map((plan, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <StyledCard>
                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {plan.recommended && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        background: 'linear-gradient(45deg, #00B4D8, #48CAE4)',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}
                    >
                      {t('join.recommended')}
                    </Box>
                  )}
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      color: 'white', 
                      mb: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    {plan.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                    <PriceTypography 
                      variant="h4" 
                      component="span" 
                      className="price"
                      sx={{ 
                        fontWeight: 'bold',
                        mr: 1
                      }}
                    >
                      {plan.price}
                    </PriceTypography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}
                    >
                      {plan.period}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: 3,
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {plan.description}
                  </Typography>

                  <CustomButton
                    variant="contained"
                    onClick={() => handlePayment(plan.paypalLink)}
                    sx={{
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      color: 'white',
                      mt: 'auto',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                      }
                    }}
                  >
                    {t('join.getStarted')}
                  </CustomButton>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default JoinPage; 