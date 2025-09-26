FROM node:22-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json ./

# Clean install with npm
RUN npm install --legacy-peer-deps --no-audit --no-fund

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]