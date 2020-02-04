#!/usr/bin/env bash

set -euxo pipefail

npm version prerelease --preid beta --no-git-tag-version
npm publish --tag beta
