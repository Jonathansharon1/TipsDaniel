const axios = require('axios');

const SERVER_URL = 'http://localhost:5000';
const ADMIN_USERNAME = 'jonson';
const ADMIN_PASSWORD = '3333';

// Create Base64 encoded credentials
const credentials = Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString('base64');

async function createTestPost() {
  try {
    const response = await axios.post(
      `${SERVER_URL}/api/blog/posts`,
      {
        title: 'Welcome to TipsDaniel - Your Ultimate Football Betting Guide',
        content: `Welcome to TipsDaniel, your premier destination for expert football betting insights and analysis!

Our team of experienced analysts and betting experts works tirelessly to provide you with the most accurate predictions and valuable insights for your betting decisions.

What We Offer:

1. Expert Match Analysis
- Detailed pre-match analysis
- Team form and statistics
- Head-to-head records
- Key player information
- Weather and pitch conditions

2. Betting Strategies
- Value betting opportunities
- Risk management techniques
- Bankroll management
- Different betting markets explained
- Live betting strategies

3. Market Insights
- Odds movement analysis
- Market liquidity assessment
- Bookmaker comparisons
- Early value identification
- Market manipulation detection

4. Regular Updates
- Daily match previews
- Weekend betting guides
- Special event coverage
- Live match updates
- Post-match analysis

Join our community of successful bettors and start making informed decisions today!

Remember: Successful betting is about making informed decisions based on thorough analysis and proper risk management.`,
        author: 'TipsDaniel Team',
        category: 'Welcome',
        tags: ['welcome', 'introduction', 'betting', 'analysis', 'strategy'],
        imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`
        }
      }
    );
    
    console.log('Success! Test post created:', response.data);
  } catch (error) {
    console.error('Error creating test post:', error.response ? error.response.data : error.message);
  }
}

createTestPost(); 