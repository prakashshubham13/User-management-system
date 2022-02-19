// Importaing package
import createError from 'http-errors';
import * as userDbHelper from '../helper/user_db_helper.js';
import { validateRegistrationSchema,validateLoginSchema } from '../validation/validate_schema.js';
import { signAccessToken } from '../authentication/auth.js';

// Register user
export const registerUser = async (body) => {
    try {
        const result = await validateRegistrationSchema.validateAsync(body);
        const doesExist = await userDbHelper.checkUser(result.email);
        if(doesExist)
        throw createError.Conflict(`${result.email} is already been registered`);
        const createUser = await userDbHelper.registerUser(result);
        const accessToken = await signAccessToken(createUser);
        return accessToken;
    } catch (error) {
        if (error.isJoi === true) 
            throw createError.UnprocessableEntity();
        throw error;
    }
}

// Login user
export const loginUser = async (body) => {
    try {
        const result = await validateLoginSchema.validateAsync(body);
        const user = await userDbHelper.checkUser(result.email);
        if(!user)
        throw createError.NotFound('User not registered');
        const isMatch = await user.isValidPassword(result.password)
      if (!isMatch)
        throw createError.Unauthorized('Username/password not valid')
        const accessToken = await signAccessToken(user);
        return accessToken;
    } catch (error) {
        if (error.isJoi === true) 
            throw createError.BadRequest('Invalid Username/Password');
        throw error;
    }
}

// Get all user Details
export const getAllUserDetails = async (body) => {
    try {
        let {page,size,sortby,order,searchby,value}=body;
        page=!page?1:page;
        size=!size?5:size;
        sortby=!sortby?'_id':sortby;
        order=!order?1:parseInt(order);
        searchby=!searchby?"":searchby;
        value=!value?"":value;
        const limit = parseInt(size);
        const skip = (page-1) * size;
        const sort ={[sortby]:order};
        const search ={[searchby]:value};
        const user = await userDbHelper.getAllUserDetails(search,sort,limit,skip);
        if(!user)
        throw createError.NotFound('User not registered');
        return user;
    } catch (error) {
        throw error;
    }
}

// Get single user Details
export const getUserDetails = async (id) => {
    try {
        const user = await userDbHelper.getUserDetails(id);
        if(!user)
        throw createError.NotFound('User not registered');
        return user;
    } catch (error) {
        throw error;
    }
}

// Update user
export const updateUser = async (id,body) => {
    try {
        const result = await validateLoginSchema.validateAsync(body);
        const user = await userDbHelper.updateUser(id,body);
        if(!user)
        throw createError.NotFound('User not registered');
        return user;
    } catch (error) {
        if (error.isJoi === true) 
        throw createError.UnprocessableEntity();
        throw error;
    }
}

// Delete user
export const deleteUser = async (id) => {
    try {
        const user = await userDbHelper.deleteUser(id);
        if(!user)
        throw createError.NotFound('User not registered');
        return user;
    } catch (error) {
        throw error;
    }
}