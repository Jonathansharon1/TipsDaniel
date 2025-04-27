import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Box, 
  TextField, 
  InputAdornment,
  CircularProgress,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  CardActions
} from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import Button from '../components/Button';
import { styled } from '@mui/material/styles';
import { useLanguage } from '../context/LanguageContext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

// Add styled components for modern look
const ModernSearchField = styled(TextField)(({ theme }) => ({
  borderRadius: 18,
  background: 'rgba(36, 44, 66, 0.95)',
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: 18,
    background: 'rgba(36, 44, 66, 0.95)',
    color: '#fff',
    fontSize: '1.1rem',
    '& fieldset': {
      border: 'none',
    },
    '& input::placeholder': {
      color: '#bfc9db',
      opacity: 1,
      fontSize: '1.1rem',
    },
  },
  '& .MuiInputAdornment-root': {
    color: '#bfc9db',
    fontSize: 28,
  },
}));

const ModernFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 180,
  borderRadius: 18,
  background: 'rgba(36, 44, 66, 0.95)',
  '& .MuiOutlinedInput-root': {
    borderRadius: 18,
    background: 'rgba(36, 44, 66, 0.95)',
    color: '#fff',
    fontSize: '1.1rem',
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#bfc9db',
    fontSize: '1.1rem',
    background: 'rgba(36,44,66,0.95)',
    px: 0.5,
  },
  '& .MuiSelect-select': {
    color: '#fff',
    borderRadius: 18,
    background: 'rgba(36, 44, 66, 0.95)',
    fontSize: '1.1rem',
  },
}));

const ModernCard = styled(Card)(({ theme }) => ({
  borderRadius: 24,
  background: 'rgba(36, 44, 66, 0.95)',
  color: '#fff',
  boxShadow: '0 4px 32px 0 rgba(0,0,0,0.12)',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
  paddingBottom: theme.spacing(2),
}));

const ModernChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(191, 201, 219, 0.15)',
  color: '#bfc9db',
  fontWeight: 600,
  fontSize: '1rem',
  borderRadius: 12,
  marginBottom: theme.spacing(2),
}));

const ModernReadMore = styled(Button)(({ theme }) => ({
  color: '#fff',
  background: 'linear-gradient(90deg, #00b4d8 0%, #0096c7 100%)',
  borderRadius: 14,
  fontWeight: 700,
  fontSize: '1.15rem',
  padding: '0.9rem 2.2rem 0.9rem 1.5rem',
  boxShadow: '0 2px 16px 0 rgba(0,180,216,0.15)',
  textTransform: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '0.2em',
  transition: 'background 0.2s, box-shadow 0.2s',
  '&:hover': {
    background: 'linear-gradient(90deg, #0096c7 0%, #00b4d8 100%)',
    boxShadow: '0 4px 24px 0 rgba(0,180,216,0.25)',
  },
}));

// Modern glassmorphic search bar and select
const GlassSearchField = styled(TextField)(({ theme }) => ({
  borderRadius: 24,
  background: 'rgba(36, 44, 66, 0.95)',
  width: '100%',
  maxWidth: 700,
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
  '& .MuiOutlinedInput-root': {
    borderRadius: 24,
    background: 'rgba(36, 44, 66, 0.95)',
    color: '#fff',
    fontSize: '1.2rem',
    border: 'none',
    boxShadow: 'none',
    paddingLeft: 8,
    '& fieldset': {
      border: 'none',
    },
    '& input::placeholder': {
      color: '#bfc9db',
      opacity: 1,
      fontSize: '1.2rem',
    },
  },
  '& .MuiInputAdornment-root': {
    color: '#bfc9db',
    fontSize: 32,
    marginRight: 8,
  },
}));

const GlassFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  borderRadius: 24,
  background: 'rgba(36, 44, 66, 0.95)',
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
  '& .MuiOutlinedInput-root': {
    borderRadius: 24,
    background: 'rgba(36, 44, 66, 0.95)',
    color: '#fff',
    fontSize: '1.2rem',
    border: 'none',
    boxShadow: 'none',
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#bfc9db',
    fontSize: '1.1rem',
    background: 'rgba(36,44,66,0.95)',
    px: 0.5,
    borderRadius: 12,
    marginLeft: 8,
    marginTop: 2,
  },
  '& .MuiSelect-select': {
    color: '#fff',
    borderRadius: 24,
    background: 'rgba(36, 44, 66, 0.95)',
    fontSize: '1.2rem',
    padding: '16px 20px',
  },
}));

const GlassCard = styled(Card)(({ theme }) => ({
  borderRadius: 28,
  background: 'rgba(36, 44, 66, 0.95)',
  color: '#fff',
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
  border: 'none',
  padding: 32,
  marginBottom: theme.spacing(2),
}));

const GlassChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(191, 201, 219, 0.13)',
  color: '#bfc9db',
  fontWeight: 500,
  fontSize: '0.85rem',
  borderRadius: 16,
  marginBottom: theme.spacing(2),
  padding: '0 12px',
  height: 26,
  boxShadow: '0 0 4px 1px rgba(0,180,216,0.10)',
}));

const GlassReadMore = styled(Button)(({ theme }) => ({
  color: '#fff',
  background: 'linear-gradient(90deg, #00b4d8 0%, #0096c7 100%)',
  borderRadius: 18,
  fontWeight: 600,
  fontSize: '1rem',
  padding: '0.7rem 1.5rem',
  boxShadow: '0 2px 16px 0 rgba(0,180,216,0.15)',
  textTransform: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '0.2em',
  transition: 'background 0.2s, box-shadow 0.2s',
  width: '100%',
  justifyContent: 'center',
  '&:hover': {
    background: 'linear-gradient(90deg, #0096c7 0%, #00b4d8 100%)',
    boxShadow: '0 4px 24px 0 rgba(0,180,216,0.25)',
  },
}));

const BlogPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Increased debounce time to 500ms for better performance

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch posts when debounced search term or category changes
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog/posts`, {
          params: {
            search: debouncedSearchTerm,
            category: selectedCategory === 'All' ? '' : selectedCategory
          }
        });
        setPosts(response.data.data);
      } catch (error) {
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [debouncedSearchTerm, selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog/posts/categories`);
        const filteredCategories = response.data.data.filter(Boolean);
        const uniqueCategories = [...new Set(filteredCategories)].filter(cat => cat !== 'All');
        setCategories(['All', ...uniqueCategories]);
      } catch (error) {
        setError('Failed to load categories. Please try again later.');
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReadMore = (postId) => {
    navigate(`/blog/${postId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, px: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
          fontWeight: 700,
          mb: 2,
          textAlign: 'center',
          color: 'white'
        }}
      >
        {t('blogSectionTitle')}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
          mb: 4,
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.8)'
        }}
      >
        {t('blogSectionSubtitle')}
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 3,
        mb: 7,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 1100,
        width: '100%',
        mx: 'auto',
        p: { xs: 2, sm: 4 },
      }}>
        <GlassSearchField
          variant="outlined"
          size="medium"
          placeholder={t('search')}
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: 32, color: '#bfc9db' }} />
              </InputAdornment>
            ),
          }}
        />
        <GlassFormControl size="medium">
          <InputLabel>{t('categories')}</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label={t('categories')}
            MenuProps={{
              PaperProps: {
                sx: { background: 'rgba(36, 44, 66, 0.98)', color: '#fff', borderRadius: 3 }
              }
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </GlassFormControl>
      </Box>
      <Grid container spacing={5}>
        {filteredPosts.length === 0 ? (
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mt: 4, textAlign: 'center', background: 'rgba(0,180,216,0.08)', color: '#00B4D8', borderRadius: 2, fontSize: '1.2rem', py: 4 }}>
              {t('noPostsFound') || 'No posts found matching your search.'}
            </Alert>
          </Grid>
        ) : (
          filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <GlassCard>
                <CardContent sx={{ flexGrow: 1, pb: 0, p: 0 }}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h2"
                    sx={{
                      fontSize: '1.3rem',
                      mb: 2,
                      color: '#fff',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      lineHeight: 1.18,
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.05rem',
                      mb: 2,
                      color: '#bfc9db',
                      fontWeight: 400,
                      lineHeight: 1.5,
                    }}
                  >
                    {post.excerpt}
                  </Typography>
                  {post.content && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.98rem',
                        mb: 2,
                        color: '#bfc9db',
                        fontWeight: 400,
                        lineHeight: 1.5,
                        opacity: 0.85,
                      }}
                    >
                      {post.content.slice(0, 120)}{post.content.length > 120 ? '...' : ''}
                    </Typography>
                  )}
                  {post.category && (
                    <GlassChip label={post.category} sx={{ mb: 3 }} />
                  )}
                </CardContent>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ pt: 2 }}>
                  <GlassReadMore
                    fullWidth
                    onClick={() => handleReadMore(post._id)}
                  >
                    {t('readMore')}
                  </GlassReadMore>
                </Box>
              </GlassCard>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default BlogPage; 