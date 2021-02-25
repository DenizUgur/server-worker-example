# Grab the latest alpine image
FROM ubuntu:20.10

# Install python, pip & node, npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_15.x | bash - && \
    apt-get install -y \
    make gcc g++ nodejs && \
    rm -rf /var/lib/apt/lists/*

# Copy the application
ADD . /opt/server

# Install dependencies
RUN cd /opt/server && npm ci && npm run build

ENV NODE_ENV="production"
WORKDIR /opt/server