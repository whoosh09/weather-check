FROM node:22-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install


# Copy app source
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]