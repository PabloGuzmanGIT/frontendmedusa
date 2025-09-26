FROM node:22-alpine

WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment variables for build
# Add build arguments
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL

# Set environment variables from build args
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application and verify .next directory exists
RUN npm run build

# Expose port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]