#!/bin/bash

# Build documentation
yarn --cwd ./documentation build
yarn typedoc

# Deploy API documentation
rm -rf /tmp/smartts-sdk
git clone --depth 1 --branch gh-pages git@github.com:RomarQ/smartts-sdk.git "/tmp/smartts-sdk"
git -C /tmp/smartts-sdk rm -rf .
mv documentation/build/* /tmp/smartts-sdk/
mv api_documentation /tmp/smartts-sdk/api
git -C /tmp/smartts-sdk add .
git -C /tmp/smartts-sdk commit --amend --no-edit
git -C /tmp/smartts-sdk push --force origin gh-pages
