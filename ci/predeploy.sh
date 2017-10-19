#!/bin/bash

set -e # Exit with nonzero exit code if anything fails

# Don't try to autopublish on pull requests
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  exit 0
fi

bash ci/github.sh

# Build the library and docsite
gulp build

# Clean any build/install artifacts that might inadvertently be tracked by git
# Built products for deploy won't be affected by this as they're not tracked
git checkout .
cat .git/config

# Bump the npm version and tag on github
npm version patch
git push --tags

# Get the new version
version=$(node -e 'console.log(require("./package.json").version)')

# Push the latest package.json to master
git add package.json
git commit -m "$version\n[ci skip]"
git push origin master

