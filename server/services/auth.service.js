
const  tokenService  = require("./token.service");
const { tokenTypes } = require("../config/tokenTypes");
const { User, Token } = require("../models");
const userService  = require("./user.service");
const roleService  = require("./role.service");
const bcrypt = require("bcryptjs")

/**
 * This is the login service
 */
const validateLogin = async reqBody => {
  const { email, password } = reqBody;
  const isUser = await User.findOne({ email });

  // return an error if user not found
  if(!isUser) throw new Error(`Invalid credentials!`);
  // check for password match 
  const isMatch = await isUser.comparePasswords(password);
  // return an error if  passwords do not match
  if(!isMatch) throw new Error(`Invalid credentials!!`);

  // Generate auth tokens
  const authTokens = await isUser.generateAuthTokens();

  // remove password from user object
  const userObject = isUser.toObject();
  delete userObject.password;

  return {userObject, authTokens}

};

/**
 * this is the create user service
 */
const createUser = async reqBody => {
  const search = new RegExp(reqBody.role, "i");

  const isRole = await roleService.getRoleByName(search);
  if(!isRole) throw new Error(`Invalid role name ${reqBody.role}}`)
    reqBody = {...reqBody, role:isRole._id };
  
    const newUser = await User.create({ ...reqBody });

    return {...newUser._doc, password:null};
};

const refreshToken = async(refreshToken)=>{
  console.log(tokenTypes.REFRESH, "print for token type");
  const tokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
  console.log(tokenDoc, "the token doc")
  console.log(tokenDoc.user, "the user id")
  const isUser = await User.findOne({isDeleted:false, _id:tokenDoc.user});
  console.log(isUser,"the user object")
  if(!isUser) throw new Error(`invalid token!`);

  if(new Date() > tokenDoc.exp){
    tokenDoc.remove();
  }
  return await isUser.generateAuthTokens();
}


const resetPassword = async(token, newPassword)=>{
  const verifiedToken = await tokenService.verifyToken(token, tokenTypes.RESET);
  const isUser = await userService.getUserById(verifiedToken.user);
  if(!user) throw new Error(`Invalid token signature!`);
  // update password
  const hashedPass = await bcrypt.hash(newPassword, 7);
  await User.findByIdAndUpdate(isUser._id, {$set:{password: hashedPass}},{new:true});
  await Token.deleteMany({type:tokenTypes.RESET, user:isUser._id, })
}

module.exports = {
  validateLogin,
  createUser,
  resetPassword,
  refreshToken
};
