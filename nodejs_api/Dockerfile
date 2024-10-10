# Use an official Node.js runtime as a parent image
FROM node:18-alpine  
# or node:18 if alpine is not necessary

# Set the working directory inside the container
WORKDIR /nodejs_api

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Define the command to start the app
CMD [ "npm", "run", "dev"]
