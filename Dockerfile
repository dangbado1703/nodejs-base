# Base image for building the application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Build the application (if needed, for example with React or TypeScript)
# Uncomment the line below if you have a build step
# RUN npm run build

# Base image for running the application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependencies and built application from the build stage
COPY --from=build /app /app

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
