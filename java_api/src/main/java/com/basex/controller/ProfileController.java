package com.basex.controller;

import com.basex.model.Profile;
import com.basex.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    // Retrieve the profile for the authenticated user
    @GetMapping
    public ResponseEntity<Profile> getProfile(@RequestHeader("Authorization") String authorizationHeader) {
        // Extract the token from the "Bearer <token>" format
        String token = authorizationHeader.replace("Bearer ", "");

        return profileService.getProfileByToken(token)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update the profile for the authenticated user
    @PutMapping
    public ResponseEntity<Profile> updateProfile(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody Profile profileDetails) {
        // Extract the token and then the userId from the token
        String token = authorizationHeader.replace("Bearer ", "");

        // Update profile for the userId retrieved from the token
        Profile updatedProfile = profileService.updateProfile(token, profileDetails);
        return ResponseEntity.ok(updatedProfile);
    }

}
