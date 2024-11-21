package com.basex.service;

import com.basex.dto.auth.AuthenticationRequest;
import com.basex.dto.auth.AuthenticationResponse;
import com.basex.dto.auth.RegisterRequest;
import com.basex.exception.UserAlreadyExistsException;
import com.basex.model.Profile;
import com.basex.repository.ProfileRepository;
import com.basex.repository.RoleRepository;
import com.basex.security.JwtService;
import com.basex.model.Role;
import com.basex.model.User;
import com.basex.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) throws UserAlreadyExistsException {

        // Check if the user already exists by email
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User already exists");
        }

        // Fetch the existing "USER" role from the database
        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Role USER not found"));

        // Create a new user with the "USER" role and encode the password
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Collections.singletonList(userRole))
                .isEnabled(true)
                .build();

        // Save the user to the database
        User savedUser = userRepository.save(user);

        // Create a basic Profile for the new User
        Profile profile = new Profile();
        profile.setEmail(request.getEmail()); // Only email is set, other fields are left blank
        profile.setUser(savedUser);
        profileRepository.save(profile);

        // Prepare additional claims for the JWT token
        List<String> roles = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("roles", roles);
        extraClaims.put("user_id", user.getId());

        // Generate the JWT token with claims
        var jwtToken = jwtService.generateToken(extraClaims, user);

        // Return the AuthenticationResponse with the token
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // Authenticate the user using email and password
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()));

        // Fetch the user from the database
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        // Prepare additional claims for the JWT token
        List<String> roles = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("roles", roles);
        extraClaims.put("user_id", user.getId());

        // Generate the JWT token with claims
        var jwtToken = jwtService.generateToken(extraClaims, user);

        // Return the AuthenticationResponse with the token
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
