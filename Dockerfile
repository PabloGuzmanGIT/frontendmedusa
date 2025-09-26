FROM node:22-alpine

WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment variables for build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application and verify .next directory exists
RUN npm run build

# Expose port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]