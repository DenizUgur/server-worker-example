# Grab the latest alpine image
FROM ubuntu:20.10

# Install python, pip & node, npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_15.x | bash - && \
    apt-get install -y \
    python3 python3-pip \
    make gcc g++ nodejs && \
    rm -rf /var/lib/apt/lists/*

# Copy the application
ADD . /opt

# Install dependencies
RUN cd /opt && \
    npm --prefix backend ci && \
    npm --prefix backend/server/ ci && \
    npm --prefix backend/worker/ ci && \
    npm --prefix frontend/ ci && \
    npm --prefix backend/server/ build && \
    npm --prefix backend/worker/ build && \
    npm --prefix frontend/ build

ENV NODE_ENV="production"
WORKDIR /opt