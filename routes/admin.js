const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Create a new post (protected route)
router.post('/posts', auth, async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    
    const post = new Post({
      title,
      content,
      category,
      tags: tags || [],
      author: 'Admin'
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a post (protected route)
router.put('/posts/:id', auth, async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, category, tags: tags || [], updatedAt: Date.now() },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a post (protected route)
router.delete('/posts/:id', auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 