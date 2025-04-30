import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

const StyledCard = styled(Box)(({ theme }) => ({
  background: 'rgba(19, 47, 76, 0.8)',
  border: '1px solid rgba(0, 180, 216, 0.2)',
  borderRadius: '16px',
  overflow: 'hidden',
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: '12px',
  }
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    padding: '0 5%',
  },
  [theme.breakpoints.down('md')]: {
    padding: '0 2%',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0',
    marginBottom: theme.spacing(3),
  }
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: '12px',
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    borderRadius: '8px',
  }
}));

const ContentTypography = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontSize: '1.1rem',
  lineHeight: 1.8,
  whiteSpace: 'pre-wrap',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    lineHeight: 1.6,
    marginBottom: theme.spacing(3),
  }
}));

const PostDetailPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get all posts using the environment variable
        const response = await axios.get(`https://surebetapp-b6984bb7acd6.herokuapp.com/all_blogs`);
        
        if (response.data && response.data.data) {
          // Get posts for current language
          const currentLang = language || 'en';
          const languagePosts = response.data.data[currentLang] || [];
          
          // Find the specific post by ID
          const foundPost = languagePosts.find(p => String(p.blog_id) === String(id));
          
          if (foundPost) {
            setPost(foundPost);
            setError(null);
          } else {
            setError('Post not found');
            setPost(null);
          }
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        if (err.code === 'ERR_NETWORK') {
          setError('Network error. Please check your connection and try again.');
        } else {
          setError('Failed to load post. Please try again later.');
        }
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, language]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info">Post not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ 
      px: { xs: 1, sm: 2, md: 3 }  // Responsive padding for container
    }}>
      <StyledCard>
        {/* Title */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ 
          color: '#fff',
          fontSize: { 
            xs: '1.5rem',  // Smaller font on mobile
            sm: '1.8rem',  // Medium size on tablet
            md: '2.5rem'   // Large on desktop
          },
          fontWeight: 600,
          mb: { xs: 2, sm: 3, md: 4 },  // Responsive margin
          lineHeight: { xs: 1.3, md: 1.2 }  // Adjusted line height
        }}>
          {post.title}
        </Typography>

        {/* Main Image */}
        {post.main_image && (
          <ImageContainer>
            <StyledImage
              src={post.main_image}
              alt={post.title}
              loading="lazy"
            />
          </ImageContainer>
        )}

        {/* Main Paragraph */}
        {post.main_paragraph && (
          <ContentTypography>
            {post.main_paragraph}
          </ContentTypography>
        )}

        {/* Second Image */}
        {post.second_image && (
          <ImageContainer>
            <StyledImage
              src={post.second_image}
              alt={`${post.title} - additional image`}
              loading="lazy"
            />
          </ImageContainer>
        )}

        {/* Blog Content */}
        {post.blog && (
          <ContentTypography>
            {post.blog}
          </ContentTypography>
        )}
      </StyledCard>
    </Container>
  );
};

export default PostDetailPage; 