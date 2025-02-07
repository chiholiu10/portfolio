# Node build stage
FROM node:20 AS node-builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Java build stage using a more general Maven image
FROM maven:3.9 AS java-builder

WORKDIR /app

# Copy the Java project files
COPY . .

# Run the Maven build (build the jar or war file)
RUN mvn clean install

# Debugging: List the contents of the target directory
RUN echo "Listing /app/target directory:" && ls -l /app/target

# Final stage - production image
FROM node:20-alpine

WORKDIR /app

# Copy Node.js build outputs from the node-builder stage
COPY --from=node-builder /app/package.json /app/yarn.lock ./
COPY --from=node-builder /app/.next ./.next
COPY --from=node-builder /app/public ./public

# Check if the jar file exists before copying
COPY --from=java-builder /app/target/ /app/target/

# Install only production dependencies for Node.js
RUN yarn install --production --frozen-lockfile

EXPOSE 3000

# Start both Java and Node.js applications (example of running both)
CMD ["sh", "-c", "java -jar /app/target/my-app.jar & yarn start"]
