import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLanguage } from '../context/LanguageContext';
import { GlassCard, GlassButton } from '../components/GlassComponents';

const StyledImage = styled('img')(({ theme }) => ({
  width: '90%',
  height: 'auto',
  maxWidth: '100%',
  objectFit: 'contain',
  borderRadius: '16px',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Typography color="error" variant="h5" align="center">
            {this.props.t('failedToLoadPost')}
          </Typography>
        </Container>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const LoadingComponent = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <CircularProgress />
  </Box>
);

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allPosts, setAllPosts] = useState(null);
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [recommendedLoading, setRecommendedLoading] = useState(true);

  // Function to get random posts
  const getRandomPosts = (allPosts, currentPostId, currentLanguage, count = 3) => {
    if (!allPosts?.data) return [];
    // Get posts for current language
    const languagePosts = allPosts.data[currentLanguage] || [];
    // Filter out current post and get random posts
    const filteredPosts = languagePosts.filter(post => String(post.blog_id) !== String(currentPostId));
    const shuffled = [...filteredPosts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Fetch all posts for recommendations with caching
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        // Check if we have cached data
        const cachedData = localStorage.getItem('allPosts');
        const cachedTimestamp = localStorage.getItem('allPostsTimestamp');
        const now = new Date().getTime();
        
        if (cachedData && cachedTimestamp && (now - parseInt(cachedTimestamp)) < 5 * 60 * 1000) {
          // Use cached data if less than 5 minutes old
          const data = JSON.parse(cachedData);
          setAllPosts(data);
          setRecommendedPosts(getRandomPosts(data, id, language));
        } else {
          // Fetch new data
          const response = await fetch('https://surebetapp-b6984bb7acd6.herokuapp.com/all_blogs', {
            headers: {
              'Cache-Control': 'max-age=300' // Cache for 5 minutes
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch posts');
          }
          const data = await response.json();
          
          // Cache the new data
          localStorage.setItem('allPosts', JSON.stringify(data));
          localStorage.setItem('allPostsTimestamp', now.toString());
          
          setAllPosts(data);
          setRecommendedPosts(getRandomPosts(data, id, language));
        }
      } catch (err) {
        console.error('Error fetching recommended posts:', err);
      } finally {
        setRecommendedLoading(false);
      }
    };

    fetchAllPosts();
  }, [id, language]);

  // Memoize the random posts selection
  const memoizedRandomPosts = useMemo(() => {
    return getRandomPosts(allPosts, id, language);
  }, [allPosts, id, language]);

  // Fetch single post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch('https://surebetapp-b6984bb7acd6.herokuapp.com/all_blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        
        // Find the post in the current language
        const languagePosts = data.data[language] || [];
        const foundPost = languagePosts.find(p => String(p.blog_id) === String(id));
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, language]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <ErrorBoundary t={t}>
      <Suspense fallback={<LoadingComponent />}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {post && (
            <>
              <GlassCard sx={{ p: { xs: 2, md: 4 }, mb: 4 }}>
                {/* Title */}
                <Typography variant="h3" component="h1" gutterBottom sx={{ 
                  fontSize: { xs: '2rem', md: '3rem' },
                  color: 'white',
                  textAlign: 'center',
                  mb: 4
                }}>
                  {post.title}
                </Typography>
                
                {/* Main Image */}
                {post.main_image && (
                  <StyledImage
                    src={post.main_image}
                    alt={post.title}
                    loading="lazy"
                    width="1200"
                    height="800"
                  />
                )}

                {/* Main Paragraph */}
                {post.main_paragraph && (
                  <Typography variant="body1" sx={{ 
                    color: 'white',
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    lineHeight: 2,
                    mb: 6,
                    '& p': { 
                      mb: 4,
                      letterSpacing: '0.3px'
                    }
                  }}>
                    {post.main_paragraph}
                  </Typography>
                )}

                {/* Second Image */}
                {post.second_image && (
                  <StyledImage
                    src={post.second_image}
                    alt={`${post.title} - additional image`}
                    loading="lazy"
                    width="1200"
                    height="800"
                  />
                )}

                {/* Blog Content */}
                {post.blog && (
                  <Typography variant="body1" sx={{ 
                    color: 'white',
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    lineHeight: 2,
                    mb: 4,
                    '& p': { 
                      mb: 4,
                      letterSpacing: '0.3px'
                    }
                  }}>
                    {post.blog}
                  </Typography>
                )}
              </GlassCard>

              {/* Recommended Posts Section */}
              <Typography variant="h4" component="h2" sx={{ 
                color: 'white',
                textAlign: 'center',
                mb: 4,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}>
                {t('postsYouMightLike')}
              </Typography>

              {recommendedLoading ? (
                <Box display="flex" justifyContent="center" my={4}>
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {recommendedPosts.map((recommendedPost) => (
                    <Grid item xs={12} md={4} key={recommendedPost.blog_id}>
                      <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        {recommendedPost.main_image && (
                          <StyledImage
                            src={recommendedPost.main_image}
                            alt={recommendedPost.title}
                            loading="lazy"
                            width="800"
                            height="600"
                            sx={{ mb: 0 }}
                          />
                        )}
                        <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="h6" component="h3" sx={{ 
                            color: 'white',
                            mb: 2,
                            fontSize: { xs: '1.1rem', md: '1.25rem' }
                          }}>
                            {recommendedPost.title}
                          </Typography>
                          <Box sx={{ mt: 'auto', pt: 2 }}>
                            <GlassButton
                              variant="contained"
                              onClick={() => navigate(`/blog/${recommendedPost.blog_id}`)}
                              sx={{ width: '100%' }}
                            >
                              {t('readMore')}
                            </GlassButton>
                          </Box>
                        </Box>
                      </GlassCard>
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          )}
        </Container>
      </Suspense>
    </ErrorBoundary>
  );
};

export default PostDetailPage; 