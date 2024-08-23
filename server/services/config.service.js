const { Config } = require("../models");

const getConfigurationById = async (configId) => {
  return await Config.findOne({ isDeleted: false, _id: configId });
};

const getSystemConfigs = async reqQuery => {
  const { page = 1, limit = 30, sortBy = "createdAt", sort = -1 } = reqQuery;
  const ststemConfigs = await Config.find({ isDeleted: false }).sort({ [sortBy]: sort }).limit(limit).skip((page - 1) * limit);;
  return ststemConfigs;
};

const createNewConfig = async (reqBody, userId) => {
  const updatedBody = { ...reqBody, createdBy: userId };
  const newConfig = await Config.create({ ...updatedBody });
  return newConfig;
};

const updateConfiguration = async (configId, reqBody, userId) => {
  const config = await getConfigurationById(configId);
  if (!config) {
    throw new Error(`Could not find config with provided id ${configId}`);
  }

  const updateBody = { ...reqBody, updatedBy: userId };

  Object.keys(updateBody).forEach(key => {
    if (Array.isArray(config[key]) && Array.isArray(updateBody[key])) {
      const existingItems = config[key];
      console.log(updateBody[key], "help");
      updateBody[key].forEach(newItem => {
        const index = existingItems.findIndex(item => item.toLowerCase() === newItem.toLowerCase());

        if (index !== -1) {
          // Replace the existing item
          existingItems[index] = newItem;
        } else {
          // Add the new item if it doesn't exist
          existingItems.push(newItem);
        }
      });

      config[key] = existingItems;
    } else {
      config[key] = updateBody[key];
    }
  });

  await config.save();
  return config;
};

const deleteConfigByConfigId = async (configId, userId) => {
  const isConfig = await Config.findOne({ isDeleted: false, _id: configId });
  if (!isConfig) throw new Error(`Could not find config with the provided id ${configId}`);
  isConfig.isDeleted = true;

  await isConfig.save();
  return true;
};

module.exports = {
  createNewConfig,
  updateConfiguration,
  deleteConfigByConfigId,
  getSystemConfigs
};
