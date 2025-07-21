FROM node:22

WORKDIR /app

# Copy package.json and lock file from the root
COPY package*.json ./

# Install deps
RUN npm install

# Copy the backend code
COPY backend/. ./

CMD ["npm", "run", "dev"]
