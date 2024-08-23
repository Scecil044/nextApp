// function to check system roles
const checkRole = roles => (req, res, next) => {
  if (!roles.includes(req.role.roleName)) throw new Error("Access denied! You do not have rights to access this route. This action will be reported to the administrators");
  next();
};

module.exports = checkRole;
