# TipsDaniel Blog Server

A Node.js server for the TipsDaniel blog with MongoDB Atlas integration.

## Features

- CRUD operations for blog posts
- Pagination and search functionality
- Category and tag filtering
- Basic HTTP Authentication for admin operations
- MongoDB Atlas integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   NODE_ENV=development
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_secure_password
   ```
4. Set up MongoDB Atlas:
   - Create a new cluster
   - Create a database user with appropriate permissions
   - Configure network access (IP whitelist)
   - Get your connection string and add it to the `.env` file

## Running the Server

### Development Mode
```
npm run dev
```

### Production Mode
```
npm start
```

## API Endpoints

### Blog Posts

- `GET /api/blog/posts` - Get all blog posts (with pagination and search)
- `POST /api/blog/posts` - Create a new blog post (requires authentication)
- `GET /api/blog/posts/:id` - Get a specific blog post
- `PUT /api/blog/posts/:id` - Update a blog post (requires authentication)
- `DELETE /api/blog/posts/:id` - Delete a blog post (requires authentication)

### Categories and Tags

- `GET /api/blog/categories` - Get all categories
- `GET /api/blog/tags` - Get all tags

### Health Check

- `GET /api/health` - Check if the server is running

## Authentication

The server uses Basic HTTP Authentication for admin operations. To authenticate:

1. Create a Base64 encoded string of `username:password`
2. Include the encoded string in the Authorization header:
   ```
   Authorization: Basic <encoded_string>
   ```

Example using curl:
```
curl -X POST http://localhost:5000/api/blog/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" \
  -d '{"title":"My Post","content":"Content"}'
```

## Deployment

### Heroku

1. Create a new Heroku app
2. Connect your GitHub repository
3. Set the environment variables in the Heroku dashboard
4. Deploy the app

### DigitalOcean

1. Create a new Droplet
2. Install Node.js and MongoDB
3. Clone your repository
4. Set up environment variables
5. Use PM2 to keep the server running:
   ```
   pm2 start index.js --name "tipsdaniel-blog"
   ```

## License

MIT # TipsDaniel
