FROM node:22

WORKDIR /app

# Copy package.json and package-lock.json from backend directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the backend code
COPY . .

# Expose backend port if needed (optional)
EXPOSE 8001

# Default command can be overridden by docker-compose.yml
CMD ["npm", "run", "dev"]
