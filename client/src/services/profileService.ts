import { authService } from "./authService";

const API_URL = 'http://localhost:5000/api';

interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  image: string;
  dob: Date;
  address: string;
  phoneNo: number;
  nextOfKinName: string;
  nextOfKinPhoneNr: string;
  bankDetailsBankName: string;
  bankDetailsBankSortCode: string;
  bankDetailsAccountNr: string;
  utrNo: number;
  rate: number;
  positionRole: string;
  positionStartDate: Date;
}

const getAuthHeaders = () => {
  const token = authService.getToken();
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const profileService = {
  getProfile: async (): Promise<Profile> => {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    return response.json();
  },
  updateProfile: async (profile: Profile): Promise<Profile> => {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profile),
    });
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
    return response.json();
  },
};
