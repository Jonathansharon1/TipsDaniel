#!/bin/bash

# Navigate to the project root directory
cd "$(dirname "$0")"

# Check if there are any changes to commit
if git status --porcelain | grep -q .; then
  echo "Changes detected. Committing..."
  
  # Add all changes
  git add .
  
  # Commit with a descriptive message
  git commit -m "Update NavBar component with responsive design and fix navigation issues"
  
  # Push to the remote repository
  git push
  
  echo "Changes committed and pushed successfully!"
else
  echo "No changes to commit."
fi 