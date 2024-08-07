import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  dob?: Date;
  address?: string;
  phoneNo?: number;
  nextOfKinName?: string;
  nextOfKinPhoneNr?: string;
  bankDetailsBankName?: string;
  bankDetailsBankSortCode?: string;
  bankDetailsAccountNr?: string;
  utrNo?: number;
  rate?: number;
  positionRole?: string;
  positionStartDate?: Date;
}

const profileSchema: Schema<IProfile> = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  image: String,
  dob: Date,
  address: String,
  phoneNo: Number,
  nextOfKinName: String,
  nextOfKinPhoneNr: String,
  bankDetailsBankName: String,
  bankDetailsBankSortCode: String,
  bankDetailsAccountNr: String,
  utrNo: Number,
  rate: Number,
  positionRole: String,
  positionStartDate: Date,
});

const Profile = mongoose.model<IProfile>('Profile', profileSchema);

export default Profile;
