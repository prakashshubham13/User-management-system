// Importing packages
import Router from 'express';
import * as userController from '../controller/user_controller.js';
import * as authToken from '../middlewares/auth_token.js';

const userRouter=Router();

// User Registration Route
userRouter.post("/register-user",userController.registerUser);

// User Login Route
userRouter.post("/login-user",userController.loginUser);

// Get All User Details Route
userRouter.get("/user-details",authToken.verifyAccessToken,authToken.adminVerification,userController.getAllUserDetails);

// Get Single User Details Route
userRouter.get("/user-details/:userId",authToken.verifyAccessToken,authToken.userVerification,userController.getUserDetails);

//Update User Details Route
userRouter.patch("/user-update/:userId", authToken.verifyAccessToken,authToken.userVerification,userController.updateUser);

//Delete User Route
userRouter.delete("/user-delete/:userId", authToken.verifyAccessToken,authToken.userVerification,userController.deleteUser);

export default userRouter;