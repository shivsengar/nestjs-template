# ---- ARGUMENTS ----
# Build gateway
#docker build -t shivkumar1911/gateway:latest --build-arg APP_NAME=gateway .

# Build microservice-template
#docker build -t shivkumar1911/microservice-template:latest --build-arg APP_NAME=microservice-template .

# ---- ARGUMENTS ----
# ---- ARGUMENTS ----
ARG APP_NAME

# ---- STAGE 1: Build ----
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Debug: Print APP_NAME
RUN echo "Building app: $APP_NAME"

# Build only the specified app
RUN npm run build && \
    rm -rf /tmp/app-dist && \
    cp -r dist/$APP_NAME /tmp/app-dist && \
    rm -rf dist/app && \
    mv /tmp/app-dist dist/app

# ---- STAGE 2: Runtime ----
FROM node:20-alpine

# Re-declare the same ARG in this stage
ARG APP_NAME

WORKDIR /usr/src/app

# Copy built app from builder stage
COPY --from=builder /usr/src/app/dist/app dist/app

# Copy the correct package.json into dist/app
COPY ./package.json ./dist/app/package.json

# Install production dependencies using install (no lockfile needed)
RUN cd dist/app && npm install --production

# Expose port based on service type
EXPOSE 3000
EXPOSE 3001

# Start the app
CMD ["node", "dist/app/src/main"]