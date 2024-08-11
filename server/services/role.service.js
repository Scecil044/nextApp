const { Role } = require("../models");

const getRoleById = async roleId => {
  try {
    return await Role.findOne({ isDeleted: false, _id: roleId });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRoleByName = async roleName => {
  try {
    const searchRegex = new RegExp(roleName, "i");
    const filter = {
      isDeleted: false,
      roleName: searchRegex
    };
    const options = {
      projection: { _id: 1, roleName: 1 }
    };
    return await Role.findOne(filter, options);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRoles = async reqQuery => {
  try {
    const limit = reqQuery.limit ? parseInt(reqQuery.limit) : 30;
    const page = reqQuery.page ? parseInt(reqQuery.page) : 1;
    const sortOrder = reqQuery.sortOrder ? parseInt(reqQuery.sort) : -1;
    const sortBy = reqQuery.sortBy || "createdAt";
    const skip = (page - 1) * limit;

    const filter = {
      isDeleted: false
    };

    return await Role.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });
  } catch (error) {
    throw new Error(error);
  }
};

const createRole = async reqBody => {
  try {
    const parsedName = reqBody.roleName.toLowerCase();
    const newRole = await Role.create({
      roleName: parsedName
    });

    return newRole;
  } catch (error) {
    throw new Error(error);
  }
};

const updateRole = async (roleId, reqBody) => {
    const isRole = await Role.findOne({ _id: roleId, isDeleted: false });
    if (!isRole) throw new Error(`Could not find role with provided id ${roleId}`);

    Object.keys(reqBody).forEach((key)=>{
        isRole[key] = reqBody[key]
    })
    await isRole.save()
    return isRole
};

const deleteRole = async roleId => {
  const isRole = await Role.findOne({ _id: roleId, isDeleted: false });
  if (!isRole) throw new Error(`Could not find role with provided id ${roleId}`);

  
  return await Role.findByIdAndDelete(isRole._id);
};

module.exports = {
  createRole,
  deleteRole,
  getRoleById,
  updateRole,
  getRoleByName,
  getRoles
};
