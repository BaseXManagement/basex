import { Request, Response } from 'express';
import Profile from '../models/Profile';
import { AuthRequest } from '../middlewares/authMiddleware';

const getProfile = async (req: AuthRequest, res: Response) => {
  const profile = await Profile.findOne({ userId: req.user?._id });

  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ message: 'Profile not found' });
  }
};

const updateProfile = async (req: AuthRequest, res: Response) => {
  const profile = await Profile.findOne({ userId: req.user?._id });

  if (profile) {
    Object.assign(profile, req.body);
    await profile.save();
    res.json(profile);
  } else {
    res.status(404).json({ message: 'Profile not found' });
  }
};

export { getProfile, updateProfile };
