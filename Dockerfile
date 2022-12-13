FROM node:17

# Working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
Copy package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 5001
EXPOSE 5001

# Run the app
CMD [ "npm", "start" ]