import create from 'zustand';
import { profileService } from '../services/profileService';

interface ProfileState {
  profile: any;
  fetchProfile: (userId: string) => void;
  updateProfile: (profile: any) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  fetchProfile: async (userId) => {
    const profile = await profileService.getProfile(userId);
    set({ profile });
  },
  updateProfile: async (profile) => {
    const updatedProfile = await profileService.updateProfile(profile);
    set({ profile: updatedProfile });
  },
}));
