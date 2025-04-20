import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String },
  imageUrl: { type: String },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  collection: 'blogposts' // Changed from 'posts' to 'blogposts'
});

// Update the updatedAt timestamp before saving
blogPostSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost; 