FROM openjdk:17-jdk-slim

# Copy the source code to the container
COPY java_api /app

# Set the working directory
WORKDIR /app

# Check if the target folder is missing the JAR and run Maven install if necessary
RUN if [ ! -f target/backend-1.0-SNAPSHOT.jar ]; then \
    apt-get update && \
    apt-get install -y maven && \
    mvn clean install; \
    fi

# Copy the JAR file to the final location
RUN cp target/backend-1.0-SNAPSHOT.jar /app/app.jar

# Set the entry point to run the application
ENTRYPOINT ["java","-jar","/app/app.jar"]

