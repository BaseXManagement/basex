package com.basex.service;

import com.basex.model.Profile;
import com.basex.repository.ProfileRepository;
import com.basex.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ProfileServiceImpl implements ProfileService {
    private final ProfileRepository profileRepository;
    private final JwtService jwtUtil;  // Utility to parse JWT

    @Autowired
    public ProfileServiceImpl(ProfileRepository profileRepository, JwtService jwtUtil) {
        this.profileRepository = profileRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Profile saveProfile(Profile profile) {
        return profileRepository.save(profile);
    }
    @Override
    public Profile updateProfile(String token, Profile profileDetails) {
        UUID userId = jwtUtil.extractUserId(token);
        Optional<Profile> optionalProfile = profileRepository.findByUserId(userId);

        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();
            profile.setFirstName(profileDetails.getFirstName());
            profile.setLastName(profileDetails.getLastName());
            profile.setImage(profileDetails.getImage());
            profile.setAddress(profileDetails.getAddress());
            profile.setDob(profileDetails.getDob());
            profile.setPhoneNo(profileDetails.getPhoneNo());
            profile.setNextOfKinName(profileDetails.getNextOfKinName());
            profile.setNextOfKinPhoneNr(profileDetails.getNextOfKinPhoneNr());
            profile.setBankDetailsBankName(profileDetails.getBankDetailsBankName());
            profile.setBankDetailsBankSortCode(profileDetails.getBankDetailsBankSortCode());
            profile.setBankDetailsAccountNr(profileDetails.getBankDetailsAccountNr());
            profile.setUtrNo(profileDetails.getUtrNo());
            profile.setRate(profileDetails.getRate());
            profile.setPositionRole(profileDetails.getPositionRole());
            profile.setPositionStartDate(profileDetails.getPositionStartDate());

            return profileRepository.save(profile);
        } else {
            throw new RuntimeException("Profile not found for user ID: " + userId);
        }
    }

    @Override
    public Optional<Profile> getProfileByToken(String token) {
        // Extract user ID from token
        UUID userId = jwtUtil.extractUserId(token);
        // Retrieve and return the profile by user ID
        return profileRepository.findByUserId(userId);
    }

    @Override
    public Optional<Profile> getProfileById(UUID userId) {
        return profileRepository.findById(userId);
    }

}

