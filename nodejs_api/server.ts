import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';

dotenv.config();
connectDB();

const app: Application = express();

// Create a Winston logger instance
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'DD/MMM/YYYY:HH:mm' }),
    format.printf(({ timestamp, message }) => {
      return `${timestamp} ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: './utils/logs.log' }),
  ],
});

// Morgan middleware to log HTTP requests using Winston
app.use(morgan(':date[clf] ":method :url HTTP/:http-version" :status', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Error logging middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send('Server Error');
});
