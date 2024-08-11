const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    roleName: { type: String, required: true, trim: true, enum: ["admin", "trader", "customer"] },
    roleId: { type: Number, unique: true, enum: [1, 2, 3] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

RoleSchema.pre("save", async function(next) {
  if (this.isModified("roleName") || this.isNew) {
    switch (this.roleName) {
      case "admin":
        this.roleId = 1;
        break;
      case "trader":
        this.roleId = 2;
        break;
      case "customer":
        this.roleId = 3;
        break;
      default:
        throw new Error("Invalid  role name");
    }
  }
  next();
});
const Role = mongoose.model("Role", RoleSchema);
module.exports = Role;
