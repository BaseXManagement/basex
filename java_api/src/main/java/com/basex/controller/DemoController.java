package com.basex.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo-controller")
public class DemoController {

    // General endpoint accessible to authenticated users
    @GetMapping()
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello from secured endpoint");
    }

    // Endpoint accessible only by users with USER authority
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    @GetMapping("/user")
    public ResponseEntity<String> userAccess() {
        return ResponseEntity.ok("USER: Hello from secured endpoint");
    }

    // Endpoint accessible only by users with ADMIN authority
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<String> adminAccess() {
        return ResponseEntity.ok("ADMIN: Hello from secured endpoint");
    }
}
