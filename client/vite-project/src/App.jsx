import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { LanguageProvider } from './context/LanguageContext';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import PostDetailPage from './pages/PostDetailPage';
import AdminPage from './pages/AdminPage';
import NavBar from './components/NavBar';
import JoinPage from './pages/JoinPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import Footer from './components/Footer';

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
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
    },
    body1: {
      fontFamily: "'Inter', sans-serif",
    },
    body2: {
      fontFamily: "'Inter', sans-serif",
    },
    button: {
      fontFamily: "'Inter', sans-serif",
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
      <LanguageProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<PostDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/terms" element={<TermsOfUsePage />} />
          </Routes>
          <Footer />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App; 