import { Request, Response } from 'express';
import User from '../models/User';
import Profile from '../models/Profile';
import generateToken from '../utils/generateToken';

const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = new User({ email, password });

  await user.save();

  // Create a profile with basic details
  const profile = new Profile({ userId: user._id, email, firstName: "", lastName: "", image: "", dob: new Date, address: "",
    phoneNo: 0, nextOfKinName: "", nextOfKinPhoneNr: 0, bankDetailsBankName: "", bankDetailsBankSortCode: 0,
    bankDetailsAccountNr: 0, utrNo: 0, rate: 10, positionRole: "Member", positionStartDate: new Date });

  await profile.save();

  res.status(201).json({
    _id: user._id,
    email: user.email,
    token: generateToken(user.id.toString()),
  });
};

const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user.id.toString()),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

export { registerUser, authUser };
