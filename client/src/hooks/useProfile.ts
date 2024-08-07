import { useEffect } from 'react';
import { useProfileStore } from '../stores/profileStore';

export const useProfile = (userId: string) => {
  const { profile, fetchProfile } = useProfileStore((state) => ({
    profile: state.profile,
    fetchProfile: state.fetchProfile,
  }));

  useEffect(() => {
    fetchProfile();
  }, [userId, fetchProfile]);

  return { profile };
};
