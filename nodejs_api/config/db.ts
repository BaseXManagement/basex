import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_LOCAL!);
    console.log('MongoDB connected!');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      process.exit(1);
    } else {
      console.error('An unknown error occurred!');
      process.exit(1);
    }
  }
};

export default connectDB;
