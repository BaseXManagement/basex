# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-slim

# Install Maven
RUN apt-get update && apt-get install -y maven

# Set the working directory
WORKDIR /java_api

# Copy the current directory contents into the container at /java_api
COPY . /java_api

# Compile and package the application
RUN mvn clean install

# Run the application
CMD ["java", "-jar", "target/backend-1.0-SNAPSHOT.jar"]
