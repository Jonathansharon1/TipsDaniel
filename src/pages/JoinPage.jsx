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
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Check as CheckIcon } from '@mui/icons-material';
import CustomButton from '../components/Button';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(19, 47, 76, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #00B4D8, #48CAE4)',
  },
  
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0, 180, 216, 0.2)',
    
    '&::before': {
      height: '6px',
    }
  }
}));

const FeatureIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '40px',
  color: theme.palette.primary.main,
  '& svg': {
    fontSize: '1.5rem',
    filter: 'drop-shadow(0 0 8px rgba(0, 180, 216, 0.3))'
  }
}));

const plans = [
  {
    title: 'Basic Plan',
    price: '$29',
    period: '/month',
    features: [
      'Access to basic predictions',
      'Daily match analysis',
      'Basic statistics',
      'Email support',
      'Mobile app access'
    ],
    recommended: false
  },
  {
    title: 'Pro Plan',
    price: '$49',
    period: '/month',
    features: [
      'Everything in Basic',
      'Advanced predictions',
      'Real-time updates',
      'Priority support',
      'Expert analysis',
      'Custom alerts'
    ],
    recommended: true
  },
  {
    title: 'Premium Plan',
    price: '$99',
    period: '/month',
    features: [
      'Everything in Pro',
      'VIP predictions',
      '1-on-1 support',
      'Early access',
      'Custom strategies',
      'API access'
    ],
    recommended: false
  }
];

function JoinPage() {
  const theme = useTheme();

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
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(45deg, #ffffff 30%, #48CAE4 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)'
            }}
          >
            Choose Your Plan
          </Typography>
          <Typography 
            sx={{ 
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              mx: 'auto',
              mb: 4
            }}
          >
            Select the perfect plan for your betting journey. All plans include our core features with additional benefits as you upgrade.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {plans.map((plan) => (
            <Grid item xs={12} md={4} key={plan.title}>
              <StyledCard 
                sx={{ 
                  transform: plan.recommended ? 'scale(1.05)' : 'none',
                  zIndex: plan.recommended ? 1 : 0,
                  '&:hover': {
                    transform: plan.recommended ? 'scale(1.08) translateY(-8px)' : 'translateY(-8px)'
                  }
                }}
              >
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
                      Recommended
                    </Box>
                  )}
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      mb: 3,
                      color: 'white',
                      fontWeight: 700,
                      textAlign: 'center'
                    }}
                  >
                    {plan.title}
                  </Typography>
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography
                      variant="h3"
                      component="span"
                      sx={{
                        color: 'white',
                        fontWeight: 700
                      }}
                    >
                      {plan.price}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="span"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        ml: 1
                      }}
                    >
                      {plan.period}
                    </Typography>
                  </Box>
                  <List sx={{ mb: 4, flex: 1 }}>
                    {plan.features.map((feature) => (
                      <ListItem key={feature} sx={{ px: 0 }}>
                        <FeatureIcon>
                          <CheckIcon />
                        </FeatureIcon>
                        <ListItemText
                          primary={feature}
                          sx={{
                            '& .MuiListItemText-primary': {
                              color: 'rgba(255, 255, 255, 0.9)',
                              fontSize: '1rem'
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <CustomButton 
                    fullWidth 
                    showArrow={true}
                    sx={{
                      mt: 'auto',
                      background: plan.recommended 
                        ? 'linear-gradient(45deg, #00B4D8, #48CAE4)'
                        : 'linear-gradient(45deg, rgba(0, 180, 216, 0.8), rgba(72, 202, 228, 0.8))'
                    }}
                  >
                    Get Started
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