// Import pakages
import User from '../models/User.js';
// Register user
export const registerUser = async (body) => {
  try {
    const user = new User({
      name: body.name,
      email: body.email,
      role: body.role,
      password: body.password,
    });
    const newUser = new User(user);
    const createUser = await newUser.save();
    return createUser;
  } catch (err) {
    throw new Error(500);
  }
};

// Check for a user
export const checkUser = async (email) => {
  try {
    const doesExist = await User.findOne({ email });
    return doesExist;
  } catch (err) {
    throw new Error(500);
  }
};

// Get all user
export const getAllUserDetails = async (search, sort, limit, skip) => {
  try {
    const user = await User.find(search, { password: 0, __v: 0 })
      .sort(sort)
      .limit(limit)
      .skip(skip);
    return user;
  } catch (err) {
    throw new Error(500);
  }
};

// Get user by id
export const getUserDetails = async (id) => {
  try {
    const user = await User.findOne({ _id: id }, { password: 0, __v: 0 });
    return user;
  } catch (err) {
    throw new Error(500);
  }
};

// Update user
export const updateUser = async (id, updates) => {
  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    return user;
  } catch (err) {
    throw new Error(500);
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (err) {
    throw new Error(500);
  }
};
