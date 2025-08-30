#!/bin/bash

# Check if a commit message is provided
if [ -z "$1" ]; then
    echo "Error: Commit message is required as the first argument."
    echo "Usage: ./git-commit.sh \"Your commit message\""
    exit 1
fi

MESSAGE="$1"

# Run npm format if package.json exists
if [ -f "package.json" ]; then
    echo "Running \"npm run format\"..."
    npm run format || echo "npm run format finished with errors but continuing..."

    # Run lint fix if available
    echo "Running \"npm run lint:fix\"..."
    if ! npm run lint:fix 2>/dev/null; then
        echo "Note: npm run lint:fix not found or finished with errors but continuing..."
    fi
fi

# Stage all changes
echo "Running \"git add .\"..."
if ! git add .; then
    echo "Error: \"git add .\" failed."
    exit 1
fi

# Commit changes
echo "Running \"git commit -am \"$MESSAGE\"..."
if ! git commit -am "$MESSAGE"; then
    echo "Error: \"git commit\" failed."
    exit 1
fi

# Push changes
echo "Running \"git push\"..."
if ! git push; then
    echo "Error: \"git push\" failed."
    exit 1
fi

echo "All commands executed successfully."
