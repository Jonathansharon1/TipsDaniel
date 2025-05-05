import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { GlassCard } from '../components/GlassComponents';

const TermsOfUsePage = () => {
  const { t } = useLanguage();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <GlassCard sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ 
          fontSize: { xs: '2rem', md: '3rem' },
          color: 'white',
          textAlign: 'center',
          mb: 4
        }}>
          {t('termsOfUseTitle')}
        </Typography>

        <Typography variant="body1" sx={{ 
          color: 'white',
          fontSize: { xs: '1.1rem', md: '1.25rem' },
          lineHeight: 2,
          mb: 4,
          textAlign: 'center'
        }}>
          {t('termsOfUseWelcome')}
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ 
            color: 'white',
            mb: 2,
            fontSize: { xs: '1.25rem', md: '1.5rem' }
          }}>
            {t('termsOfUse1Title')}
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'white',
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            lineHeight: 2,
            mb: 4
          }}>
            {t('termsOfUse1Content')}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ 
            color: 'white',
            mb: 2,
            fontSize: { xs: '1.25rem', md: '1.5rem' }
          }}>
            {t('termsOfUse2Title')}
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'white',
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            lineHeight: 2,
            mb: 4
          }}>
            {t('termsOfUse2Content')}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ 
            color: 'white',
            mb: 2,
            fontSize: { xs: '1.25rem', md: '1.5rem' }
          }}>
            {t('termsOfUse3Title')}
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'white',
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            lineHeight: 2,
            mb: 4
          }}>
            {t('termsOfUse3Content')}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ 
            color: 'white',
            mb: 2,
            fontSize: { xs: '1.25rem', md: '1.5rem' }
          }}>
            {t('termsOfUse4Title')}
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'white',
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            lineHeight: 2,
            mb: 4
          }}>
            {t('termsOfUse4Content')}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ 
            color: 'white',
            mb: 2,
            fontSize: { xs: '1.25rem', md: '1.5rem' }
          }}>
            {t('termsOfUse5Title')}
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'white',
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            lineHeight: 2,
            mb: 4
          }}>
            {t('termsOfUse5Content')}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ 
          color: 'white',
          fontSize: { xs: '1.1rem', md: '1.25rem' },
          lineHeight: 2,
          textAlign: 'center',
          whiteSpace: 'pre-line'
        }}>
          {t('termsOfUseFooter')}
        </Typography>
      </GlassCard>
    </Container>
  );
};

export default TermsOfUsePage; 