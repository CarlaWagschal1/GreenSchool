# Use the official image as a parent image
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json file and the package-lock.json file into the working directory
COPY backend/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port 5000
EXPOSE 5000

# Run the command to start the application
CMD ["node", "backend/index.js"]



