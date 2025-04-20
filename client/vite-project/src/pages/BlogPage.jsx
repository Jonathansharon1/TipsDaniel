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
  useMediaQuery
} from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import Button from '../components/Button';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '15px',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.05)',
    }
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '10px',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 250,
  transition: 'transform 0.3s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    height: 200,
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

const BlogPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog/posts`, {
          params: {
            search: searchTerm,
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
  }, [searchTerm, selectedCategory]);

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
    <Container maxWidth="lg" sx={{ mt: { xs: 6, sm: 8, md: 10 }, mb: 8, px: { xs: 2, sm: 3, md: 4 } }}>
      <Typography 
        variant={isMobile ? "h3" : "h2"} 
        component="h1" 
        gutterBottom 
        align="center" 
        sx={{ 
          mb: { xs: 4, sm: 5, md: 6 },
          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 700
        }}
      >
        Blog
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                sx: {
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2196F3',
                  },
                }
              }}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size={isMobile ? "small" : "medium"}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Category"
                sx={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2196F3',
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Container maxWidth="lg" sx={{ mt: 4, px: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      ) : filteredPosts.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No posts found matching your criteria
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {filteredPosts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} md={4}>
              <StyledCard>
                {post.imageUrl && (
                  <StyledCardMedia
                    component="img"
                    image={post.imageUrl}
                    alt={post.title}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
                  <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    component="h2" 
                    gutterBottom
                    sx={{ 
                      fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                      lineHeight: 1.2,
                      fontWeight: 600,
                      color: 'white'
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      mb: 2,
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}
                  >
                    {post.content.substring(0, isMobile ? 80 : 150)}...
                  </Typography>
                  <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap' }}>
                    {post.tags && post.tags.map((tag) => (
                      <StyledChip key={tag} label={tag} />
                    ))}
                  </Box>
                  <Button 
                    onClick={() => handleReadMore(post._id)} 
                    showArrow
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      mt: 'auto',
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                      }
                    }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BlogPage; 