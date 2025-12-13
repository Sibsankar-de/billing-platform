import mongoose, { Schema, models } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    authBy: {
      type: String,
      enum: ["email", "google"],
      default: "email",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "USER",
      enum: ["USER", "ADMIN"],
    },
    refreshToken: {
        type: String,
    }
  },
  { timestamps: true }
);

// hash the password before storing
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// method to check the password
userSchema.methods.checkPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// get the password reset token
userSchema.methods.generatePasswordResetToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.PASSWORD_RESET_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

// generate accesstoken
userSchema.methods.getAccessToken = async function (deviceId: string) {
  return await jwt.sign(
    {
      _id: this._id,
      email: this.email,
      deviceId: deviceId || "",
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// generate refreshtoken
userSchema.methods.getRefreshToken = async function (deviceId: string) {
  return await jwt.sign(
    {
      _id: this._id,
      email: this.email,
      deviceId: deviceId || "",
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// generate logout token
userSchema.methods.getLogoutToken = async function (deviceId: string) {
  return await jwt.sign(
    {
      _id: this._id,
      email: this.email,
      deviceId: deviceId || "",
    },
    process.env.LOGOUT_TOKEN_SECRET,
    {
      expiresIn: process.env.LOGOUT_TOKEN_EXPIRY,
    }
  );
};

// setting devmode
if (process.env.NODE_ENV === "development" && models.User) {
  delete models.User;
}

export const User = models.User || mongoose.model("User", userSchema);
