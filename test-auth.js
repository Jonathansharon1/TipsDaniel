const axios = require('axios');

// Replace with your actual server URL
const SERVER_URL = 'http://localhost:5000';

// Replace with your actual admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'your_secure_password';

// Create Base64 encoded credentials
const credentials = Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString('base64');

// Test creating a blog post with authentication
async function testCreatePost() {
  try {
    const response = await axios.post(
      `${SERVER_URL}/api/blog/posts`,
      {
        title: 'Test Post',
        content: 'This is a test post created with authentication.',
        category: 'Test',
        tags: ['test', 'authentication']
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`
        }
      }
    );
    
    console.log('Success! Post created:', response.data);
    return response.data._id; // Return the post ID for further tests
  } catch (error) {
    console.error('Error creating post:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Test getting a blog post without authentication (should work)
async function testGetPost(postId) {
  try {
    const response = await axios.get(`${SERVER_URL}/api/blog/posts/${postId}`);
    console.log('Success! Post retrieved:', response.data);
    return true;
  } catch (error) {
    console.error('Error retrieving post:', error.response ? error.response.data : error.message);
    return false;
  }
}

// Test updating a blog post with authentication
async function testUpdatePost(postId) {
  try {
    const response = await axios.put(
      `${SERVER_URL}/api/blog/posts/${postId}`,
      {
        title: 'Updated Test Post',
        content: 'This post has been updated with authentication.'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`
        }
      }
    );
    
    console.log('Success! Post updated:', response.data);
    return true;
  } catch (error) {
    console.error('Error updating post:', error.response ? error.response.data : error.message);
    return false;
  }
}

// Test deleting a blog post with authentication
async function testDeletePost(postId) {
  try {
    const response = await axios.delete(
      `${SERVER_URL}/api/blog/posts/${postId}`,
      {
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      }
    );
    
    console.log('Success! Post deleted:', response.data);
    return true;
  } catch (error) {
    console.error('Error deleting post:', error.response ? error.response.data : error.message);
    return false;
  }
}

// Test updating a blog post without authentication (should fail)
async function testUpdatePostWithoutAuth(postId) {
  try {
    await axios.put(
      `${SERVER_URL}/api/blog/posts/${postId}`,
      {
        title: 'This should fail',
        content: 'This update should fail because there is no authentication.'
      }
    );
    
    console.log('Error: Update succeeded without authentication');
    return false;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('Success! Update failed without authentication as expected');
      return true;
    } else {
      console.error('Unexpected error:', error.response ? error.response.data : error.message);
      return false;
    }
  }
}

// Run all tests
async function runTests() {
  console.log('Starting authentication tests...');
  
  // Test creating a post with authentication
  console.log('\n1. Testing post creation with authentication:');
  const postId = await testCreatePost();
  
  if (postId) {
    // Test getting a post without authentication
    console.log('\n2. Testing post retrieval without authentication:');
    await testGetPost(postId);
    
    // Test updating a post with authentication
    console.log('\n3. Testing post update with authentication:');
    await testUpdatePost(postId);
    
    // Test updating a post without authentication
    console.log('\n4. Testing post update without authentication:');
    await testUpdatePostWithoutAuth(postId);
    
    // Test deleting a post with authentication
    console.log('\n5. Testing post deletion with authentication:');
    await testDeletePost(postId);
  }
  
  console.log('\nAuthentication tests completed!');
}

// Run the tests
runTests(); 