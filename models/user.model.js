import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      unique: true,
      minLength: 5,
      maxLength: 255,
      lowercase: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "User password is required"],

      minLength: 6,
      maxLength: 1024,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
