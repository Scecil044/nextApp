const { userService } = require(".");
const { Business } = require("../models");

const getBusinessById = async businessId => {
  return await Business.findOne({ isDeleted: false, _id: businessId }).populate({
    path: "owner",
    select: "firstName lastName"
  });
};

const getBusinesses = async reqQuery => {
  const page = reqQuery.page ? Number(reqQuery.page) : 1;
  const sort = reqQuery.sort ? Number(reqQuery.sort) : -1;
  const limit = reqQuery.limit ? Number(reqQuery.limit) : 10;
  const skip = (page - 1) * limit;
  const sortBy = reqQuery.sortBy || "createdAt";

  const result = await Business.find({ isDeleted: false })
    .populate("owner", "firstName lastName email image_url")
    .limit(limit)
    .skip(skip)
    .sort({ [sortBy]: sort });
  return result;
};

const createNewBusiness = async (reqBody, userId) => {
  // check if owner is a valid user
  const isUser = await userService.getUserById(reqBody.owner);
  if (!isUser) throw new Error(`The provided owner id: ${reqBody.owner} must be a valid user id!`);
  const newBusiness = await Business.create({ ...reqBody });

  newBusiness.createdBy = userId;

  await newBusiness.save();

  return newBusiness.populate("owner", "firstName lastName email image_url");
};

const updateBusiness = async (reqBody, businessId, userId) => {
  const isBusiness = await getBusinessById(businessId);
  if (!isBusiness) throw new Error(`${businessId} is not a valid business id`);

  const updateableFields = ["name", "logo", "location", "metaData"];

  updateableFields.forEach(key => {
    if (reqBody[key]) {
      if (key === "location" || key === "metaData") {
        isBusiness[key] = { ...isBusiness[key], ...reqBody[key] };
      } else {
        isBusiness[key] = reqBody[key];
      }
    }
  });

  // Handle contact_persons separately
  if (reqBody.contact_persons) {
    const existingContacts = isBusiness.contact_persons.map(contact => contact.email);
    const contactsToAdd = reqBody.contact_persons.filter(contact => !existingContacts.includes(contact.email));

    if (contactsToAdd.length > 0) {
      isBusiness.contact_persons = isBusiness.contact_persons.concat(contactsToAdd);
    }
  }

  isBusiness.updatedBy = userId;
  await isBusiness.save();
  return isBusiness.populate("owner", "firstName lastName email image_url");
};

const deleteBusiness = async (businessId, userId, role) => {
  try {
    const isBusiness = await getBusinessById(businessId);

    if (!isBusiness) throw new Error(`Invalid id: ${businessId}. Not record matches this entry`);
    console.log(role, "the actual role");
    if (role.roleName !== "admin") throw new Error(`You do not have rights to complete this action!`);

    isBusiness.isDeleted = true;
    await isBusiness.save();
    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const removecontact = async (businessId, contactEmail) => {
  const isBusiness = await getBusinessById(businessId);
  if (!isBusiness) throw new Error(`Could not find business!`);

  const contactEmails = isBusiness.contact_persons.map(person => person.email);

  if (!contactEmails.includes(contactEmail)) {
    throw new Error(`Contact with email ${contactEmail} not found!`);
  }

  isBusiness.contact_persons = isBusiness.contact_persons.filter(person => person.email !== contactEmail);

  await isBusiness.save();

  return isBusiness.populate("owner", "firstName lastName email image_url");
};

module.exports = {
  createNewBusiness,
  updateBusiness,
  deleteBusiness,
  getBusinessById,
  getBusinesses,
  removecontact
};
