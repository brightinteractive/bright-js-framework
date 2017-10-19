#!/bin/bash

set -e # Exit with nonzero exit code if anything fails

# Don't try to autopublish on pull requests
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo 'Pull request. Not bulding.'
  exit 0
fi

# Build the library
echo 'Building...'
gulp build

# Clean any build/install artifacts that might inadvertently be tracked by git
# Built products for deploy won't be affected by this as they're not tracked
git checkout .
cat .git/config

# Push tag to github if needed
local_version=$(node -e 'console.log(require("./package.json").version)')
latest_version=$(npm show @brightinteractive/bright-js-framework version)
should_release=$(node -e "console.log(require('semver').gt('$local_version', '$latest_version'))")

if [ $should_release = "true" ]
then
  echo 'Tag new version...'
  git tag local_version
  git push --tags
fi
