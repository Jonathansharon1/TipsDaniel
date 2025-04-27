import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Typography,
  useTheme
} from '@mui/material';
import { Language } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import { languageOptions } from '../locales/translations';
import styled from '@emotion/styled';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: '8px 16px',
  minWidth: '120px',
  '&:hover': {
    backgroundColor: 'rgba(0, 180, 216, 0.1)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(0, 180, 216, 0.2)',
    '&:hover': {
      backgroundColor: 'rgba(0, 180, 216, 0.3)',
    },
  },
}));

const LanguageSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentLanguage, setLanguage } = useLanguage();
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode) => {
    setLanguage(languageCode);
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Language fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(19, 47, 76, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            mt: 1,
          },
        }}
      >
        {languageOptions.map((option) => (
          <StyledMenuItem
            key={option.code}
            selected={currentLanguage === option.code}
            onClick={() => handleLanguageChange(option.code)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontSize: '1.2rem' }}>
                {option.flag}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {option.name}
              </Typography>
            </Box>
          </StyledMenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSelector; 