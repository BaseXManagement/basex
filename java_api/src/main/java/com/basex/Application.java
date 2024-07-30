package com.basex;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        // TODO: This is for testing purpose as users are in memory - remove after
        // Code to drop the table at the start of the program
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/basex", "root", "password")) {
            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate("DROP TABLE IF EXISTS authorities");
                stmt.executeUpdate("DROP TABLE IF EXISTS users");
                System.out.println("Table dropped successfully.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("Starting application...");
        // Rest of your program logic

        SpringApplication.run(Application.class, args);
    }
}