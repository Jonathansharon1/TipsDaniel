import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { Card, CardMedia, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import { ArrowForwardIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(19, 47, 76, 0.8)',
  border: '1px solid rgba(0, 180, 216, 0.2)',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.05)',
    }
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  [theme.breakpoints.down('sm')]: {
    height: 150,
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  background: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  fontSize: theme.breakpoints.down('sm') ? '0.7rem' : '0.875rem',
  height: theme.breakpoints.down('sm') ? '24px' : '32px',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
  }
}));

const BlogCard = ({ title, category, date, mainParagraph, mainImage, id }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <StyledCard onClick={handleClick}>
      <StyledCardMedia
        component="img"
        image={mainImage}
        alt={title}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant="h6" 
          component="h2" 
          gutterBottom
          sx={{
            fontSize: isMobile ? '1rem' : '1.25rem',
            fontWeight: 600,
            color: 'white',
            mb: 2
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <StyledChip 
            label={category} 
            size="small"
          />
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: isMobile ? '0.7rem' : '0.875rem'
            }}
          >
            {new Date(date).toLocaleDateString(i18n.language)}
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.8)',
            mb: 2,
            flexGrow: 1,
            fontSize: isMobile ? '0.875rem' : '1rem'
          }}
        >
          {mainParagraph}
        </Typography>
        <Button
          endIcon={<ArrowForwardIcon />}
          sx={{
            color: '#00b4d8',
            textTransform: 'none',
            alignSelf: 'flex-start',
            '&:hover': {
              color: '#0096c7',
            }
          }}
        >
          {t('readMore')}
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default BlogCard; 