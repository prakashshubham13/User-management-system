// Importing packages
import * as userUtils from '../utils/user_utils.js';

// Register user
export const registerUser = async (req, res, next) => {
  try {
    const result = await userUtils.registerUser(req.body);
    return res.status(201).json({ mssg: 'User Registered', data: result });
  } catch (error) {
    next(error);
  }
};

// Login user
export const loginUser = async (req, res, next) => {
  try {
    const result = await userUtils.loginUser(req.body);
    return res.status(201).json({ mssg: 'User Logged In', data: result });
  } catch (error) {
    next(error);
  }
};

// Get all user details
export const getAllUserDetails = async (req, res, next) => {
  try {
    const body = req.query;
    const result = await userUtils.getAllUserDetails(body);
    return res.status(201).json({ mssg: 'All User Details', data: result });
  } catch (error) {
    next(error);
  }
};

// Get single user details
export const getUserDetails = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const result = await userUtils.getUserDetails(id);
    return res.status(201).json({ mssg: 'User Detail By Id', data: result });
  } catch (error) {
    next(error);
  }
};

// Update User
export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const result = await userUtils.updateUser(id, req.body);
    return res.status(201).json({ mssg: 'User Updated', data: result });
  } catch (error) {
    next(error);
  }
};

// Delete User
export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const result = await userUtils.deleteUser(id);
    return res.status(201).json({ mssg: 'User Deleted' });
  } catch (error) {
    next(error);
  }
};
