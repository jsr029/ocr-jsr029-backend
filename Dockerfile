# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Create the assets directory if it doesn't exist
RUN mkdir -p assets

# Expose the port the app runs on
#EXPOSE 5000

# Define the command to run the app
CMD [ "npm", "start" ]
