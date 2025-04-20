import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(10, 25, 41, 0.7)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2196F3',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: 'rgba(255, 255, 255, 0.9)',
  },
});

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const getAuthHeader = () => {
    const credentials = btoa(`${username}:${password}`);
    return `Basic ${credentials}`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Test the credentials by making a request to the admin endpoint
      await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/posts`, {
        headers: {
          'Authorization': getAuthHeader()
        }
      });
      
      setIsLoggedIn(true);
      setSuccess('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog/posts`);
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/posts`, 
        {
          title,
          content,
          category,
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
          imageUrl,
          author: 'Admin'
        },
        {
          headers: {
            'Authorization': getAuthHeader()
          }
        }
      );
      setSuccess('Post created successfully!');
      setTitle('');
      setContent('');
      setCategory('');
      setTags('');
      setImageUrl('');
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPost) return;
    
    try {
      setLoading(true);
      setError(null);
      
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/posts/${editingPost._id}`,
        {
          title,
          content,
          imageUrl,
          category,
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
          author: 'Admin'
        },
        {
          headers: {
            'Authorization': getAuthHeader()
          }
        }
      );
      
      setEditingPost(null);
      setTitle('');
      setContent('');
      setImageUrl('');
      setCategory('');
      setTags('');
      setOpenDialog(false);
      await fetchPosts();
    } catch (err) {
      console.error('Error updating post:', err);
      setError(err.response?.data?.message || 'Failed to update post.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      setLoading(true);
      setError(null);
      
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/posts/${postId}`,
        {
          headers: {
            'Authorization': getAuthHeader()
          }
        }
      );
      await fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
      setError(err.response?.data?.message || 'Failed to delete post.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setImageUrl(post.imageUrl || '');
    setCategory(post.category || '');
    setTags(post.tags ? post.tags.join(', ') : '');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPost(null);
    setTitle('');
    setContent('');
    setImageUrl('');
    setCategory('');
    setTags('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1f3c 0%, #152238 100%)',
        py: 8,
      }}
    >
      <Container>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 6,
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Admin Dashboard
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 4 }}>
            {success}
          </Alert>
        )}

        {!isLoggedIn ? (
          <StyledPaper>
            <Typography variant="h5" sx={{ mb: 3, color: 'white' }}>
              Admin Login
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  disabled={loading}
                  fullWidth
                >
                  {loading ? <CircularProgress size={24} /> : 'Login'}
                </Button>
              </Grid>
            </Grid>
          </StyledPaper>
        ) : (
          <>
            <StyledPaper>
              <Typography variant="h5" sx={{ mb: 3, color: 'white' }}>
                Create New Post
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Content"
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    fullWidth
                  >
                    {loading ? <CircularProgress size={24} /> : 'Create Post'}
                  </Button>
                </Grid>
              </Grid>
            </StyledPaper>

            <StyledPaper>
              <Typography variant="h5" sx={{ mb: 3, color: 'white' }}>
                Manage Posts
              </Typography>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {posts.map((post) => (
                    <Grid item xs={12} key={post._id}>
                      <StyledPaper>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                              {post.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              Category: {post.category} • {new Date(post.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Box>
                            <IconButton
                              onClick={() => handleEditClick(post)}
                              sx={{ color: '#2196F3', mr: 1 }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeletePost(post._id)}
                              sx={{ color: '#f44336' }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </StyledPaper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </StyledPaper>
          </>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tags (comma separated)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Content"
                  multiline
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleUpdatePost} variant="contained" color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminPage; 