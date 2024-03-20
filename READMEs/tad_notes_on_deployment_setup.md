# Getting access to ghcr.io

1. Go to https://github.com/settings/tokens/new
1. Create a token with the `read:packages` permission.
1. run "docker login ghcr.io -u YOUR_GITHUB_USERNAME"
1. and use the token as the password on a one-time (or minimal basis)