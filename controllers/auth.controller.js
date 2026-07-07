//we will merge auth routes  with auth controller to handle the logic of signing up, signing in, and signing out a user, before merging the auth routes handled the logic on their own but when the logic has multiple lines of info, it get messier and harder to read, so we will move the logic to a controller and keep the routes clean and simple.
// i.e.  we define handlers in the controller.

// We get info of the user through the req body in the... a req.body is an object containing data from the client(specifically when we have a POST request)

import mongoose from "mongoose";
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
  //Implement the logic to sign up a user
  const session = await mongoose.startSession(); // this session is for atomic operations of database, one of the ACID properties
  session.startTransaction();

  try {
    //logic to create a new user
    const { name, email, password }= req.body ;

    //check if a user already exists 
    const existingUser = await User.findOne({ email });

    if(existingUser)
    {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    //Hashing the password for the new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ 
      success: true,
      message: 'User created Successfully',
      data:{
        token,
        user:newUsers[0],
      }
     });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  //Implement the logic to sign in a user

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error('Invalid Password');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const signOut = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'User signed out successfully',
    });
  } catch (error) {
    next(error);
  }
};
