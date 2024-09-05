import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: String,
  avatarPublicId: String,
});

// Remove password when getting back User data
// (toJSON is a custom method that can have any name.)
UserSchema.methods.toJSON = function () {
  let obj = this.toObject(); // this = user instance
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);

// User = Collection name (Table)
// Named 'users' is MongoDB automatically
