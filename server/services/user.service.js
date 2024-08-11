const { User } = require("../models");

const getUserById = async userId => {
  return await User.findOne({ isDeleted: false, _id: userId });
};

const getUserByEmail = async email => {
  const filter = {
    isDeleted: false,
    email: email
  };
  const options = {};
  return await User.findOne(filter, options);
};

const updateUser = async (body, userId) => {
  const isUser = await getUserById(userId);
  if (!isUser) throw new Error(`Could not find user by the provided id: ${userId}`);

  Object.keys(body).forEach(key => {
    if (key === "personal" || key === "address" || key === "contactPerson") {
        // Update nested fields
        isUser[key] = { ...isUser[key], ...body[key] };
    } else {
        // Update other fields
        isUser[key] = body[key];
    }
});

  // Object.keys(body).forEach(key => {
  //   if (key === "personal" || key === "address" || key === "contactPerson") {
  //     // Handle updates for 'personal', 'address', and 'contactPerson'
  //     Object.keys(isUser[key]).forEach(subKey => {
  //       if (!(subKey in body[key])) {
  //         delete isUser[key][subKey];
  //       }
  //     });
  //     isUser[key] = { ...isUser[key], ...body[key] };
  //   } else {
  //     // Handle updates for other keys
  //     isUser[key] = body[key];
  //   }
  // });

  await isUser.save();
  return { ...isUser._doc, password: null };
};

const getUsers = async reqQuery => {
  const limit = reqQuery.limit ? parseInt(reqQuery.limit) : 30;
  const page = reqQuery.page ? parseInt(reqQuery.page) : 1;
  const sort = reqQuery.sort ? parseInt(reqQuery.sort) : -1;
  const sortBy = reqQuery.sortBy || "createdAt";
  const skip = (page - 1) * limit;

  return await User.find({ isDeleted: false })
    .select("-password")
    .limit(limit)
    .skip(skip)
    .sort({ [sortBy]: sort });
};

const deleteUser = async userId => {
  const isUser = await getUserById(userId);
  if (!isUser) throw new Error(`Could not find user by the provided id: ${userId}`);
  isUser.isDeleted = !isUser.isDeleted;
  await isUser.save();
  return isUser;
};

module.exports = {
  updateUser,
  getUsers,
  getUserById,
  getUserByEmail,
  deleteUser
};
