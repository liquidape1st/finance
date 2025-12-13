# ---------- Build stage ----------
FROM maven:3.8.4-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# ---------- Run stage ----------
FROM amazoncorretto:17-alpine
WORKDIR /app

# (Tuỳ app, nếu cần curl thì cài)
RUN apk add --no-cache curl

COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]