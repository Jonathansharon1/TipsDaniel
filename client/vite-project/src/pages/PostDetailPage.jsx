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
  useMediaQuery,
  Card,
  CardMedia,
  CardContent
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

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(19, 47, 76, 0.8)',
  border: '1px solid rgba(0, 180, 216, 0.2)',
  borderRadius: '16px',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 400,
  [theme.breakpoints.down('sm')]: {
    height: 250,
  },
}));

const GlassCard = styled(Card)(({ theme }) => ({
  borderRadius: 32,
  background: 'rgba(36, 44, 66, 0.95)',
  color: '#fff',
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100vw',
  maxWidth: 'none',
  margin: 0,
  padding: theme.spacing(5, 5, 4, 5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 1.5, 2, 1.5),
    maxWidth: '100vw',
  },
}));

const GlassChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(191, 201, 219, 0.13)',
  color: '#bfc9db',
  fontWeight: 500,
  fontSize: '0.85rem',
  borderRadius: 16,
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(2),
  padding: '0 12px',
  height: 26,
  boxShadow: '0 0 4px 1px rgba(0,180,216,0.10)',
}));

const GlassImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: 340,
  objectFit: 'cover',
  borderRadius: 24,
  marginBottom: theme.spacing(3),
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
      <Container maxWidth={false} sx={{ py: 8, px: { xs: 0, sm: 4 } }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 4 }}>{t('failedToLoadPost')}</Alert>
        ) : post ? (
          <GlassCard>
            {(() => {
              const postDate = post.date || post.createdAt || post.datePublished;
              return (
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: '#bfc9db',
                    fontSize: '1rem',
                    textAlign: 'center',
                    mb: 2,
                    fontWeight: 400,
                  }}
                >
                  {postDate && (new Date(postDate)).toLocaleDateString()} {post.author && (
                    post.author.toLowerCase() === 'admin' ? '| By TipsDaniel' : `| By ${post.author}`
                  )}
                </Typography>
              );
            })()}
            {post.image && (
              <GlassImage src={post.image} alt={post.title} />
            )}
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem' },
                fontWeight: 800,
                color: '#fff',
                textAlign: 'center',
                mb: 2,
                lineHeight: 1.18,
                wordBreak: 'break-word',
              }}
            >
              {post.title}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
              {post.category && <GlassChip label={post.category} />}
              {post.tags && post.tags.map((tag, idx) => (
                <GlassChip key={idx} label={tag} />
              ))}
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: '#e3eaf7',
                fontSize: '1.13rem',
                lineHeight: 1.7,
                mt: 2,
                whiteSpace: 'pre-line',
                wordBreak: 'break-word',
                textAlign: 'left',
                width: '100%',
              }}
            >
              {post.content}
            </Typography>
          </GlassCard>
        ) : null}
      </Container>
    </Box>
  );
};

export default PostDetailPage; 