import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '15px',
  maxWidth: '400px',
  width: '100%',
  margin: '0 auto',
}));

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Get admin credentials from environment variables
  const adminUsername = import.meta.env.VITE_ADMIN_USERNAME || 'jonson';
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || '3333';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === adminUsername && password === adminPassword) {
      onLogin(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <StyledPaper elevation={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              background: 'linear-gradient(45deg, #00B4D8 30%, #48CAE4 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0096c7 30%, #00B4D8 90%)',
              },
            }}
          >
            Login
          </Button>
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default LoginForm; 