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
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '10px',
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  background: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  fontSize: theme.breakpoints.down('sm') ? '0.7rem' : '0.875rem',
  height: theme.breakpoints.down('sm') ? '24px' : '32px',
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
        // Using environment variable for API URL
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`, {
          params: {
            search: searchTerm,
            category: selectedCategory === 'All' ? '' : selectedCategory
          }
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/categories`);
        // Filter out empty categories and duplicates, ensure only one 'All' at the beginning
        const filteredCategories = response.data.filter(Boolean);
        const uniqueCategories = [...new Set(filteredCategories)].filter(cat => cat !== 'All');
        setCategories(['All', ...uniqueCategories]);
      } catch (error) {
        console.error('Error fetching categories:', error);
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
          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
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

      {filteredPosts.length === 0 ? (
        <Alert severity="info" sx={{ mb: 4 }}>
          No posts found matching your criteria.
        </Alert>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {filteredPosts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} md={4}>
              <StyledCard>
                {post.imageUrl && (
                  <CardMedia
                    component="img"
                    height={isMobile ? "160" : "200"}
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
                      lineHeight: 1.2
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
                      mb: 2
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