FROM openjdk:17-jdk-slim
COPY java_api/target/backend-1.0-SNAPSHOT.jar app/app.jar

ENTRYPOINT ["java","-jar","/app/app.jar"]
