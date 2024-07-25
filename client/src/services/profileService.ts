import { v4 as uuidv4 } from 'uuid';

const mockProfile = {
  id: uuidv4(),
  userId: uuidv4(),
  firstName: 'John',
  lastName: 'Doe',
  image: '',
  dob: '1990-01-01',
  address: '123 Main St',
  phoneNo: 1234567890,
  nextOfKinName: 'Jane Doe',
  nextOfKinPhoneNr: '0987654321',
  bankDetailsBankName: 'Bank Name',
  bankDetailsBankSortCode: '00-00-00',
  bankDetailsAccountNr: '12345678',
  utrNo: 1234567890,
  rate: 20.5,
  positionRole: 'Developer',
  positionStartDate: '2021-01-01',
};

let profile = { ...mockProfile };

export const profileService = {
  getProfile: async (userId: string) => {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 500));
    return profile;
  },
  updateProfile: async (updatedProfile: typeof mockProfile) => {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 500));
    profile = { ...updatedProfile };
    return profile;
  },
};
