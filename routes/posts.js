const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Get all posts with optional search and category filter
router.get('/', async (req, res) => {
  try {
    console.log('Fetching posts with query:', req.query);
    const { search, category } = req.query;
    
    let query = {};
    
    // Search by title or content
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }
    
    console.log('MongoDB query:', query);
    const posts = await Post.find(query).sort({ createdAt: -1 });
    console.log(`Found ${posts.length} posts`);
    
    res.json(posts);
  } catch (err) {
    console.error('Error in GET /api/posts:', err);
    res.status(500).json({ 
      message: 'Error fetching posts',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    console.error('Error in GET /api/posts/:id:', err);
    res.status(500).json({ 
      message: 'Error fetching post',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Get all categories
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Post.distinct('category');
    res.json(categories);
  } catch (err) {
    console.error('Error in GET /api/posts/categories/all:', err);
    res.status(500).json({ 
      message: 'Error fetching categories',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Create post (protected)
router.post('/', auth, async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    tags: req.body.tags
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update post (protected)
router.patch('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
    if (req.body.author) post.author = req.body.author;
    if (req.body.tags) post.tags = req.body.tags;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete post (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 