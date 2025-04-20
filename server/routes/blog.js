import express from 'express';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

// Get all posts with optional search and category filtering
router.get('/posts', async (req, res, next) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = category;
    }

    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .select('-__v'); // Exclude version field
      
    res.json({
      status: 'success',
      data: posts
    });
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

// Get all categories
router.get('/posts/categories', async (req, res, next) => {
  try {
    const categories = await BlogPost.distinct('category');
    res.json({
      status: 'success',
      data: categories
    });
  } catch (error) {
    next(error);
  }
});

// Get a single post by ID
router.get('/posts/:id', async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id).select('-__v');
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({
      status: 'success',
      data: post
    });
  } catch (error) {
    next(error);
  }
});

export default router; 