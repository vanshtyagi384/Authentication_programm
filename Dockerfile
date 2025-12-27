# Use official Node.js runtime as base image
FROM node:20-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
# Use npm ci for faster, reliable, reproducible builds
RUN npm ci --only=production

# Copy application source code
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership of app directory
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose the port the app runs on
EXPOSE 4000

# Set NODE_ENV to production
ENV NODE_ENV=production

# Install curl for health checks
USER root
RUN apk add --no-cache curl
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4000/ || exit 1

# Start the application
CMD ["node", "index.js"]

