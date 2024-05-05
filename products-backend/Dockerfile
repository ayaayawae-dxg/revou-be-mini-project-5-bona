# Use official node latest as the base image
FROM node:latest

# Set working directory inside container
WORKDIR /app-products

# Install app dependencues
COPY package.json .

RUN npm install

# Copy content into container at /app-products
COPY . .

# Open port 5001 to outside container
EXPOSE 5001

# Command to run
CMD ["npm", "run", "start"]