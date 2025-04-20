import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '15px',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const PostImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: '400px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginBottom: '24px',
  [theme.breakpoints.down('sm')]: {
    maxHeight: '250px',
    marginBottom: '16px',
  },
}));

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog/posts/${id}`);
        setPost(response.data.data);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        background: 'linear-gradient(135deg, #1a1f3c 0%, #152238 100%)'
      }}>
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

  if (!post) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, px: 2 }}>
        <Alert severity="info">Post not found</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1f3c 0%, #152238 100%)',
      py: { xs: 4, sm: 6, md: 8 }
    }}>
      <Container maxWidth="lg" sx={{ 
        mt: { xs: 8, sm: 10, md: 12.5 }, 
        mb: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <StyledPaper>
          {post.imageUrl && (
            <PostImage src={post.imageUrl} alt={post.title} />
          )}
          
          <Typography 
            variant={isMobile ? "h3" : "h2"} 
            component="h1" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
              lineHeight: 1.2
            }}
          >
            {post.title}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="subtitle1" 
              color="text.secondary" 
              gutterBottom
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {post.category && (
                <Chip 
                  label={post.category} 
                  sx={{ 
                    background: 'linear-gradient(45deg, #00B4D8 30%, #48CAE4 90%)',
                    color: 'white',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }} 
                />
              )}
              {post.tags && post.tags.map((tag) => (
                <Chip 
                  key={tag} 
                  label={tag} 
                  sx={{ 
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }} 
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography 
            variant="body1" 
            sx={{ 
              whiteSpace: 'pre-wrap', 
              lineHeight: 1.8,
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {post.content}
          </Typography>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default PostDetailPage; 