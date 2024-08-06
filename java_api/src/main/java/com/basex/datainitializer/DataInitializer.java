package com.basex.datainitializer;

import com.basex.model.Role;
import com.basex.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final RoleRepository roleRepository;

    @PostConstruct
    public void init() {
        try {
            logger.info("Initializing roles...");
            initializeRoles();
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

}