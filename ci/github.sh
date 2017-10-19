#!/bin/bash

set -e # Exit with nonzero exit code if anything fails

# Pull requests and commits to other branches shouldn't be able to push to github
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
    echo "Not installing github credentials"
    exit 0
fi

# Tell git to use ssh for push to github
git remote set-url origin git@github.com:brightinteractive/bright-js-framework.git

# Decrypt the deploy key and add to ssh-agent
openssl aes-256-cbc -K $encrypted_d857e448724f_key -iv $encrypted_d857e448724f_iv -in ci/.deploy-key.enc -out ci/.deploy-key -d
chmod 600 ci/.deploy-key
mv ci/.deploy-key ~/.ssh/id_rsa

# Setup some git configs
git config user.name "Bright Robot"
git config user.email "brightrobot@devrx.org"
