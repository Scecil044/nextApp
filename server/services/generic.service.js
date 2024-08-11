const { User, Role, Business } = require("../models");


  const genericFilter = async (reqQuery, reqBody) => {
    try {
      let pipeline = [
        {
          $match: {
            isDeleted: false
          }
        }
      ];
  
      // Add lookups based on the module
      switch (reqBody.module) {
        case "users":
          pipeline = pipeline.concat([
            {
              $lookup: {
                from: "roles",
                foreignField: "_id",
                localField: "role",
                as: "roleDetails"
              }
            },
            { $unwind: { path: "$roleDetails", preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: "businesses",
                foreignField: "_id",
                localField: "business",
                as: "businessDetails"
              }
            },
          ]);
          break;
        case "roles":
          pipeline = pipeline.concat([
            {
              $lookup: {
                from: "users",
                foreignField: "_id",
                localField: "user",
                as: "userDetails"
              }
            },
            { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },
          ]);
          break;
        case "businesses":
          pipeline = pipeline.concat([
            {
              $lookup: {
                from: "users",
                foreignField: "_id",
                localField: "owner",
                as: "ownerDetails"
              }
            },
            { $unwind: { path: "$ownerDetails", preserveNullAndEmptyArrays: true } },
          ]);
          break;
        default:
          throw new Error("Invalid module specified");
      }
  
      // Add search condition if provided
      if (reqQuery.search) {
        const searchRegex = new RegExp(reqQuery.search, "i");
        pipeline.push({
          $match: {
            $or: [
              { "firstName": searchRegex },
              { "lastName": searchRegex },
              { "email": searchRegex },
              { "name": searchRegex },
              { "location.street": searchRegex },
              { "location.town": searchRegex },
              { "location.country": searchRegex },
              { "location.building": searchRegex },
              { "metaData.category": searchRegex },
              { "metaData.email": searchRegex },
              { "roleName": searchRegex },
            ]
          }
        });
      }
  
      // Handle fields projection if provided
      if (reqQuery.fields) {
        const fieldsArray = reqQuery.fields.split(",");
        const projection = {};
        fieldsArray.forEach((field) => {
          if (field !== 'password') {  // Ensure password is not included even if specified
            projection[field] = 1;
          }
        });
        // Exclude password in a separate $project stage
        pipeline.push({ $project: projection });
        pipeline.push({ $project: { password: 0 } });
      } else {
        // If no fields are provided, make sure to exclude password by default
        pipeline.push({ $project: { password: 0 } });
      }
  
      // Execute the aggregation on the appropriate model
      let Model;
      switch (reqBody.module) {
        case "users":
          Model = User;
          break;
        case "roles":
          Model = Role;
          break;
        case "businesses":
          Model = Business;
          break;
        default:
          throw new Error("Invalid module specified");
      }
  
      const response = await Model.aggregate(pipeline);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error.message || "An error occurred during the filtering process.");
    }
  };
  
module.exports = {
  genericFilter
};
