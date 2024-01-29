FROM node:16.17-slim

# Set timezone
ENV TZ Africa/Cairo

# Create app Directory & change location to it
WORKDIR /usr/src/app

# Update package lists
RUN apt-get update

# Install dos2unix
RUN apt-get install -y dos2unix

# Install ffmpeg with no recommended packages
RUN apt-get install -y --no-install-recommends

# Copy package.json and package-lock.json if exists
COPY package*.json ./

# Install all dependencies from package.json
RUN npm install

# Copy app source from the current directory to /usr/src/app inside the container
COPY . .

# Run entry point
RUN dos2unix entrypoint.sh && chmod +x entrypoint.sh
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
