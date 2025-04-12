FROM node:22-alpine

# Set the working directory
WORKDIR /usr/src/app

# Use a non-root user to avoid permission issues
RUN addgroup -S app && adduser -S app -G app
USER app

# Copy root package.json and workspaces
COPY package.json ./
COPY turbo.json ./
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

# Install dependencies
RUN npm install

# Build the app
RUN npm run build --workspace=api

EXPOSE 3000

# Use the start script that's defined in the api package.json
CMD ["npm", "run", "start", "--workspace=api"]