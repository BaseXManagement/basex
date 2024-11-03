package com.basex.service;

import com.basex.model.Profile;

import java.util.Optional;
import java.util.UUID;

public interface ProfileService {
    Profile saveProfile(Profile profile);
    Profile updateProfile(String token, Profile profileDetails);
    Optional<Profile> getProfileByToken(String token);
    Optional<Profile> getProfileById(UUID userId);
}
