import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import PostDetailPage from './pages/PostDetailPage';
import AdminPage from './pages/AdminPage';
import NavBar from './components/NavBar';
import JoinPage from './pages/JoinPage';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00B4D8',
      light: '#48CAE4',
      dark: '#0096C7',
    },
    secondary: {
      main: '#FF6B6B',
      light: '#FF8E8E',
      dark: '#E64A4A',
    },
    background: {
      default: '#121212',
      paper: '#1A1F3C',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Poppins', sans-serif",
    h1: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    body1: {
      fontFamily: "'Inter', sans-serif",
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: "'Inter', sans-serif",
      lineHeight: 1.6,
    },
    button: {
      fontFamily: "'Inter', 'Poppins', sans-serif",
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '0.7rem 1.8rem',
          fontSize: '1.1rem',
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<PostDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App; 