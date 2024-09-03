# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

EXPOSE 3000

# Build the Next.js application
CMD [ "npm","run","dev" ]


