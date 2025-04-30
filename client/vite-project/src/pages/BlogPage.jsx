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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLanguage } from '../context/LanguageContext';

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
    paddingLeft: 8,
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

const GlassCard = styled(Box)(({ theme }) => ({
  background: 'rgba(19, 47, 76, 0.8)',
  border: '1px solid rgba(0, 180, 216, 0.2)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(0, 180, 216, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    borderRadius: '12px',
  }
}));

const BlogImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '250px',
  objectFit: 'cover',
  borderRadius: '12px',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  [theme.breakpoints.down('sm')]: {
    height: '200px',
    borderRadius: '8px',
    marginBottom: theme.spacing(1.5),
  }
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
  const { t, language } = useLanguage();
  const [allPosts, setAllPosts] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Fetch all posts once
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://surebetapp-b6984bb7acd6.herokuapp.com/all_blogs');
        if (response.data && response.data.data) {
          setAllPosts(response.data.data);
          console.log('Fetched allPosts:', response.data.data);
        } else {
          setError('Failed to fetch posts');
        }
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Update posts and categories when language or allPosts changes
  useEffect(() => {
    const currentLang = language || 'en';
    console.log('Current language:', currentLang);
    const languagePosts = allPosts[currentLang] || [];
    console.log('Posts for current language:', languagePosts);
    
    // Sort posts by date (most recent first)
    const sortedPosts = [...languagePosts].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    
    setPosts(sortedPosts);
    const uniqueCategories = [...new Set(languagePosts.map(post => post.category))];
    setCategories(uniqueCategories);
  }, [allPosts, language]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.main_paragraph && post.main_paragraph.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
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
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, px: { xs: 1, sm: 2, md: 3 } }}>
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
          placeholder={t('search') || 'Search'}
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
          <InputLabel>{t('categories') || 'Categories'}</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label={t('categories') || 'Categories'}
            MenuProps={{
              PaperProps: {
                sx: { background: 'rgba(36, 44, 66, 0.98)', color: '#fff', borderRadius: 3 }
              }
            }}
          >
            <MenuItem value="all">{t('all') || 'All'}</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </GlassFormControl>
      </Box>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {filteredPosts.length === 0 ? (
          <Grid item xs={12}>
            <Alert severity="info" sx={{ 
              mt: 4, 
              textAlign: 'center', 
              background: 'rgba(0,180,216,0.08)', 
              color: '#00B4D8', 
              borderRadius: 2, 
              fontSize: { xs: '1rem', md: '1.2rem' }, 
              py: { xs: 2, md: 4 } 
            }}>
              {t('noPostsFound') || 'No posts found matching your search.'}
            </Alert>
          </Grid>
        ) : (
          filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.blog_id}>
              <GlassCard>
                {post.main_image && (
                  <BlogImage
                    src={post.main_image}
                    alt={post.title}
                    loading="lazy"
                  />
                )}
                <Typography
                  gutterBottom
                  variant="h4"
                  component="h2"
                  sx={{
                    fontSize: { xs: '1.2rem', md: '1.3rem' },
                    mb: { xs: 1, md: 2 },
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
                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                    mb: { xs: 1.5, md: 2 },
                    color: '#bfc9db',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    flexGrow: 1,
                  }}
                >
                  {post.main_paragraph && post.main_paragraph.length > 150
                    ? post.main_paragraph.slice(0, 150) + '...'
                    : post.main_paragraph}
                </Typography>
                {post.category && (
                  <Chip 
                    label={post.category} 
                    sx={{ 
                      mb: { xs: 1.5, md: 2 }, 
                      background: 'rgba(191, 201, 219, 0.15)', 
                      color: '#bfc9db', 
                      fontWeight: 600,
                      fontSize: { xs: '0.8rem', md: '0.875rem' },
                      height: { xs: '24px', md: '32px' }
                    }} 
                  />
                )}
                <GlassReadMore onClick={() => handleReadMore(post.blog_id)}>
                  {t('readMore') || 'Read More'}
                </GlassReadMore>
              </GlassCard>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default BlogPage; 