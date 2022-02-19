import mongoose from 'mongoose';
import consola from 'consola';
const { success, error } = consola;

//Requiring the app constants
import { DB } from '../../config/index.js';
const startApp = async () => {
  try {
    // Connection With DB
    await mongoose.connect(DB, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true,
    });
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true,
    });
  }
};
export const connectDB = () => {
  startApp();
  mongoose.connection.on('connected', () => console.log('Database connected'));
  mongoose.connection.on('error', () => console.log('Database error'));
  mongoose.connection.on('disconnected', () =>
    console.log('Database disconnected')
  );
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination.....'
      );
    });
    process.exit(0);
  });
};
