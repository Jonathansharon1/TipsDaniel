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
  MenuItem,
  LinearProgress
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
  const [username, setUsername] = useState(import.meta.env.VITE_ADMIN_USERNAME || '');
  const [password, setPassword] = useState(import.meta.env.VITE_ADMIN_PASSWORD || '');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSecondImage, setSelectedSecondImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [secondImagePreview, setSecondImagePreview] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [secondImageUploadProgress, setSecondImageUploadProgress] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      fetchPosts();
    }
  }, [isLoggedIn]);

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
    if (!isLoggedIn) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/posts`,
        {
          headers: {
            'Authorization': getAuthHeader()
          }
        }
      );
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event, isSecondImage = false) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }
      if (isSecondImage) {
        setSelectedSecondImage(file);
        setSecondImagePreview(URL.createObjectURL(file));
      } else {
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
      setError(null);
    }
  };

  const insertImageAfterParagraphs = (content, imageUrl) => {
    const paragraphs = content.split('\n\n');
    if (paragraphs.length >= 2) {
      paragraphs.splice(2, 0, `\n![Content Image](${imageUrl})\n`);
      return paragraphs.join('\n\n');
    }
    return content;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let finalImageUrl = '';
      let finalSecondImageUrl = '';
      
      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        
        const uploadResponse = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': getAuthHeader()
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        });
        
        if (uploadResponse.data.status === 'success') {
          finalImageUrl = uploadResponse.data.data.url;
        } else {
          throw new Error('Failed to upload main image');
        }
      }

      if (selectedSecondImage) {
        const formData = new FormData();
        formData.append('image', selectedSecondImage);
        
        const uploadResponse = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': getAuthHeader()
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setSecondImageUploadProgress(progress);
          }
        });
        
        if (uploadResponse.data.status === 'success') {
          finalSecondImageUrl = uploadResponse.data.data.url;
        } else {
          throw new Error('Failed to upload second image');
        }
      }

      let finalContent = content;
      if (finalSecondImageUrl) {
        finalContent = insertImageAfterParagraphs(content, finalSecondImageUrl);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/posts`,
        {
          title,
          content: finalContent,
          category,
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
          imageUrl: finalImageUrl,
          author: 'Admin'
        },
        {
          headers: {
            'Authorization': getAuthHeader()
          }
        }
      );

      setPosts([response.data.data, ...posts]);
      setSuccess('Post created successfully!');
      setTitle('');
      setContent('');
      setCategory('');
      setTags('');
      setSelectedImage(null);
      setSelectedSecondImage(null);
      setImagePreview('');
      setSecondImagePreview('');
      setUploadProgress(0);
      setSecondImageUploadProgress(0);
      fetchPosts();
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.response?.data?.message || 'Failed to create post');
      setUploadProgress(0);
      setSecondImageUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPost) return;
    
    try {
      setLoading(true);
      setError(null);
      
      let finalImageUrl = editingPost.imageUrl;
      let finalSecondImageUrl = '';
      let finalContent = content;
      
      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        
        const uploadResponse = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': getAuthHeader()
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        });
        
        if (uploadResponse.data.status === 'success') {
          finalImageUrl = uploadResponse.data.data.url;
        } else {
          throw new Error('Failed to upload main image');
        }
      }

      if (selectedSecondImage) {
        const formData = new FormData();
        formData.append('image', selectedSecondImage);
        
        const uploadResponse = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': getAuthHeader()
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setSecondImageUploadProgress(progress);
          }
        });
        
        if (uploadResponse.data.status === 'success') {
          finalSecondImageUrl = uploadResponse.data.data.url;
        } else {
          throw new Error('Failed to upload second image');
        }
      }

      if (finalSecondImageUrl) {
        finalContent = insertImageAfterParagraphs(content, finalSecondImageUrl);
      }
      
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/posts/${editingPost._id}`,
        {
          title,
          content: finalContent,
          imageUrl: finalImageUrl,
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
      setCategory('');
      setTags('');
      setSelectedImage(null);
      setSelectedSecondImage(null);
      setImagePreview('');
      setSecondImagePreview('');
      setUploadProgress(0);
      setSecondImageUploadProgress(0);
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
    setCategory(post.category || '');
    setTags(post.tags ? post.tags.join(', ') : '');
    setSelectedImage(null);
    setSelectedSecondImage(null);
    setImagePreview('');
    setSecondImagePreview('');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPost(null);
    setTitle('');
    setContent('');
    setCategory('');
    setTags('');
    setSelectedImage(null);
    setSelectedSecondImage(null);
    setImagePreview('');
    setSecondImagePreview('');
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
              <form onSubmit={handleSubmit}>
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
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                        Main Image
                      </Typography>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, false)}
                        style={{ display: 'none' }}
                        id="main-image-upload"
                      />
                      <label htmlFor="main-image-upload">
                        <Button
                          variant="contained"
                          component="span"
                          color="primary"
                          disabled={loading}
                        >
                          Choose Main Image
                        </Button>
                      </label>
                      {selectedImage && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Selected file: {selectedImage.name}
                          </Typography>
                          {imagePreview && (
                            <Box sx={{ mt: 1, maxWidth: 200 }}>
                              <img 
                                src={imagePreview} 
                                alt="Preview" 
                                style={{ width: '100%', height: 'auto', borderRadius: '4px' }} 
                              />
                            </Box>
                          )}
                          {uploadProgress > 0 && (
                            <Box sx={{ mt: 1 }}>
                              <LinearProgress variant="determinate" value={uploadProgress} />
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                Uploading: {uploadProgress}%
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                        Content Image (will be placed after 2 paragraphs)
                      </Typography>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, true)}
                        style={{ display: 'none' }}
                        id="second-image-upload"
                      />
                      <label htmlFor="second-image-upload">
                        <Button
                          variant="contained"
                          component="span"
                          color="primary"
                          disabled={loading}
                        >
                          Choose Content Image
                        </Button>
                      </label>
                      {selectedSecondImage && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Selected file: {selectedSecondImage.name}
                          </Typography>
                          {secondImagePreview && (
                            <Box sx={{ mt: 1, maxWidth: 200 }}>
                              <img 
                                src={secondImagePreview} 
                                alt="Preview" 
                                style={{ width: '100%', height: 'auto', borderRadius: '4px' }} 
                              />
                            </Box>
                          )}
                          {secondImageUploadProgress > 0 && (
                            <Box sx={{ mt: 1 }}>
                              <LinearProgress variant="determinate" value={secondImageUploadProgress} />
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                Uploading: {secondImageUploadProgress}%
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      )}
                    </Box>
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
                      type="submit"
                      disabled={loading}
                      fullWidth
                    >
                      {loading ? <CircularProgress size={24} /> : 'Create Post'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
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
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Main Image
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, false)}
                    style={{ display: 'none' }}
                    id="edit-main-image-upload"
                  />
                  <label htmlFor="edit-main-image-upload">
                    <Button
                      variant="contained"
                      component="span"
                      color="primary"
                      disabled={loading}
                    >
                      Choose Main Image
                    </Button>
                  </label>
                  {selectedImage && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Selected file: {selectedImage.name}
                      </Typography>
                      {imagePreview && (
                        <Box sx={{ mt: 1, maxWidth: 200 }}>
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            style={{ width: '100%', height: 'auto', borderRadius: '4px' }} 
                          />
                        </Box>
                      )}
                      {uploadProgress > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <LinearProgress variant="determinate" value={uploadProgress} />
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Uploading: {uploadProgress}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                  {editingPost?.imageUrl && !selectedImage && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Current image:
                      </Typography>
                      <Box sx={{ mt: 1, maxWidth: 200 }}>
                        <img 
                          src={editingPost.imageUrl} 
                          alt="Current" 
                          style={{ width: '100%', height: 'auto', borderRadius: '4px' }} 
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Content Image (will be placed after 2 paragraphs)
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, true)}
                    style={{ display: 'none' }}
                    id="edit-second-image-upload"
                  />
                  <label htmlFor="edit-second-image-upload">
                    <Button
                      variant="contained"
                      component="span"
                      color="primary"
                      disabled={loading}
                    >
                      Choose Content Image
                    </Button>
                  </label>
                  {selectedSecondImage && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Selected file: {selectedSecondImage.name}
                      </Typography>
                      {secondImagePreview && (
                        <Box sx={{ mt: 1, maxWidth: 200 }}>
                          <img 
                            src={secondImagePreview} 
                            alt="Preview" 
                            style={{ width: '100%', height: 'auto', borderRadius: '4px' }} 
                          />
                        </Box>
                      )}
                      {secondImageUploadProgress > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <LinearProgress variant="determinate" value={secondImageUploadProgress} />
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Uploading: {secondImageUploadProgress}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
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