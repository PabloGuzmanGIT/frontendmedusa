FROM node:22-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json ./

# Clean install with npm
RUN npm install --legacy-peer-deps --no-audit --no-fund

# Copy source code
COPY . .

# Set build-time environment variable
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY



# Expose port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]