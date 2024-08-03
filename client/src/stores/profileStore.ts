import {create} from 'zustand';
import { profileService } from '../services/profileService';

interface ProfileState {
  profile: any;
  fetchProfile: () => void;
  updateProfile: (profile: any) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  fetchProfile: async () => {
    const profile = await profileService.getProfile();
    set({ profile });
  },
  updateProfile: async (profile) => {
    const updatedProfile = await profileService.updateProfile(profile);
    set({ profile: updatedProfile });
  },
}));
