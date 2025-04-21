import express from 'express';
import BlogPost from '../models/BlogPost.js';
import auth from '../middleware/auth.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Configure S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all posts (protected route)
router.get('/posts', auth, async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json({ status: 'success', data: posts });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error fetching posts', error: error.message });
  }
});

// Create a new post (protected route)
router.post('/posts', auth, async (req, res) => {
  try {
    const post = new BlogPost(req.body);
    await post.save();
    res.status(201).json({ status: 'success', data: post });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error creating post', error: error.message });
  }
});

// Update a post (protected route)
router.put('/posts/:id', auth, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ status: 'error', message: 'Post not found' });
    }
    res.json({ status: 'success', data: post });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error updating post', error: error.message });
  }
});

// Delete a post (protected route)
router.delete('/posts/:id', auth, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ status: 'error', message: 'Post not found' });
    }
    res.json({ status: 'success', message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error deleting post', error: error.message });
  }
});

// Get presigned URL for S3 upload
router.get('/presigned-url', auth, async (req, res) => {
  try {
    const { fileName, fileType } = req.query;
    const fileExtension = fileName.split('.').pop();
    const key = `blog-images/${uuidv4()}.${fileExtension}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      ContentType: fileType,
      Expires: 60 // URL expires in 60 seconds
    };

    const presignedUrl = await s3Client.getSignedUrlPromise('putObject', params);

    res.json({
      url: presignedUrl,
      fields: {
        key
      }
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
});

// Upload image to S3
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No file uploaded' });
    }

    const file = req.file;
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${crypto.randomBytes(16).toString('hex')}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype
    });

    await s3Client.send(command);

    const imageUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    res.json({
      status: 'success',
      data: {
        url: imageUrl
      }
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ status: 'error', message: 'Failed to upload image' });
  }
});

export default router; 