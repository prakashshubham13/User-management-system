// Importaing package
import express from  'express';
import cors from 'cors';
import morgan from 'morgan';
import createError from 'http-errors';
import consola from "consola";
import userRouter from './api/routes/user_routes.js';
import { connectDB } from './api/connection/init_db.js';

// Importing the app constants
import { PORT } from './config/index.js';

// Initialize the application
const app = express();

//Using morgan middleware
app.use(morgan('dev'))

// Middlewares to handle cors error and parse request body
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// User Router Middleware
app.use("/api/users", userRouter);

// Error handling if route does not exist
app.use((req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

// Error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
  });

// Connecting to Database
connectDB();

// Start Listenting for the server on PORT
app.listen(PORT, () =>
  consola.success({ message: `Server started on PORT ${PORT}`, badge: true })
);