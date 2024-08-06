package com.basex.datainitializer;

import com.basex.model.Role;
import com.basex.repository.RoleRepository;
import com.basex.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init1() {
        try {
            logger.info("Initializing roles...");
            initializeRoles();
//            logger.info("Initializing dummy users...");
//            addDummyUsers();
        } catch (Exception e) {
            logger.error("Error initializing data", e);
            throw e;
        }
    }

    private void initializeRoles() {
        try {
            if (roleRepository.findByName("USER").isEmpty()) {
                Role userRole = new Role();
                userRole.setId(UUID.randomUUID());
                userRole.setName("USER");
                roleRepository.save(userRole);
                logger.info("Role USER created");
            } else {
                logger.info("Role USER already exists");
            }

            if (roleRepository.findByName("ADMIN").isEmpty()) {
                Role adminRole = new Role();
                adminRole.setId(UUID.randomUUID());
                adminRole.setName("ADMIN");
                roleRepository.save(adminRole);
                logger.info("Role ADMIN created");
            } else {
                logger.info("Role ADMIN already exists");
            }
        } catch (Exception e) {
            logger.error("Error initializing roles", e);
            throw e;
        }
    }

//    private void addDummyUsers() {
//        try {
//            logger.info("Checking for existing dummy users...");
//
//            if (userRepository.findByEmail("user@example.com").isEmpty()) {
//                Role userRole = roleRepository.findByName("USER")
//                        .orElseThrow(() -> new RuntimeException("Role USER not found"));
//                User user = User.builder()
//                        .firstname("Demo")
//                        .lastname("User")
//                        .email("user@example.com")
//                        .password(passwordEncoder.encode("password"))  // Password should be encoded
//                        .roles(Collections.singletonList(userRole))
//                        .build();
//                userRepository.save(user);
//                logger.info("Dummy user created: user@example.com");
//            } else {
//                logger.info("Dummy user already exists: user@example.com");
//            }
//
//            if (userRepository.findByEmail("admin@example.com").isEmpty()) {
//                Role adminRole = roleRepository.findByName("ADMIN")
//                        .orElseThrow(() -> new RuntimeException("Role ADMIN not found"));
//                User admin = User.builder()
//                        .firstname("Admin")
//                        .lastname("User")
//                        .email("admin@example.com")
//                        .password(passwordEncoder.encode("adminpassword"))  // Password should be encoded
//                        .roles(Collections.singletonList(adminRole))
//                        .build();
//                userRepository.save(admin);
//                logger.info("Dummy admin created: admin@example.com");
//            } else {
//                logger.info("Dummy admin already exists: admin@example.com");
//            }
//        } catch (Exception e) {
//            logger.error("Error adding dummy users", e);
//            throw e;
//        }
//    }
}