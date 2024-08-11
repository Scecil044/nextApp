const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const Token  = require("./Token.model");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    business: [{ type: mongoose.Schema.Types.ObjectId, ref: "Business" }],
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    contactPerson:{
      type:Object,
      default:{
        phoneNumber:"",
        email:"",
        firstName:"",
        lastName:"",
        middleName:""
      }
    },
    email: { type: String, required: true, trim: true, unique:true,
      validate:{
        validator: (email) => validator.isEmail(email),
        message: props => `${props.value} is not a valid email address!`
      }
     },
    personal: {
      type: Object,
      default: {
        gender: "",
        age: "",
        dateOfBirth: "",
      }
    },
    address:{
      type:Object,
      default:{
        town:"",
        county:"",
        building:"",
        closestLandMark:"",
      }
    },
    password: { type: String, required: true, minLength: 6 },
    image_url: { type: String, trim: true },
    coverPhoto: { type: String, trim: true },
    firstLogin: { type: Boolean, default: true },
    status: { type: String, enum: ["active", "blacklisted", "dormant", "suspended"], default:"active" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

UserSchema.methods.comparePasswords = async function(userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

UserSchema.methods.generateAuthTokens = async function() {
  const user = this;
  const accessTokenExpiry = moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, "minutes");
  const accessTokenPaylod = {
    _id: user._id,
    roleId: user.role,
    iat: moment().unix(),
    exp: accessTokenExpiry.unix(),
    type: "Access"
  };
  // generate access token
  const accessToken = jwt.sign(accessTokenPaylod, process.env.JWT_SECRET);

  const refreshTokenExpiry = moment().add(process.env.JWT_REFRESH_EXPIRATION_MINUTES, "hours");
  const refreshTokenPayload = {
    _id: user._id,
    roleId: user.role,
    iat: moment().unix(),
    exp: refreshTokenExpiry.unix(),
    type: "Refresh"
  };
  // generate refresh token
  const refreshToken = jwt.sign(refreshTokenPayload, process.env.JWT_SECRET);

  // save token in db
  const savedRefreshToken = await Token.create({
    type:"Refresh",
    user: user._id,
    role: user.roleId,
    isBlackListed: false,
    expires: refreshTokenExpiry,
    token: refreshToken
  });

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpiry.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpiry.toDate()
    }
  };
};

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashedPass = await bcrypt.hash(this.password, 10);
    this.password = hashedPass;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
