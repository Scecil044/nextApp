
const { jwtDecode } = require("jwt-decode");
const jwt = require("jsonwebtoken")
const errorHandler = require("./errorHandler");
const { User, Role } = require("../models");

const verifyToken = async (req, res, next) => {
  const headers = req.headers.authorization;

  if (!headers) {
    return next(errorHandler(403, `No Token, Not Authorized!`));
  }

  const token = headers.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // check for token expiry
    if(Date.now() >= decoded.exp * 1000){
        return next(errorHandler(403, "Token expired!"));
    }
    const isRole = await Role.findById(decoded.roleId).select("roleName").exec();
    if(!isRole) return next(errorHandler(400, `Invalid role. Failed to Authenticate: ${decoded.roleId}`))
    const isUser = await User.findById(decoded._id).select("firstName lastName email").exec();
    if(!isUser) return next(errorHandler(400, `Invalid user id. Failed to Authenticate: ${decoded._id}`))

    // assign these varriables to request
    req.user = isUser
    req.role = isRole
    next();
  } catch (error) {
    next(error)
  }
};

module.exports = verifyToken;
