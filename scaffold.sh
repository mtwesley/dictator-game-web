#!/bin/bash

# Define your directory structure
DIRS=(
  "src/api"
  "src/assets/styles"
  "src/components/shared"
  "src/router"
  "src/store/modules"
  "src/views"
  "tests/unit"
  "tests/e2e"
)

# Create directories and add .gitkeep files
for dir in "${DIRS[@]}"; do
  mkdir -p $dir
  touch $dir/.gitkeep
done

echo "Directories and .gitkeep files created."
