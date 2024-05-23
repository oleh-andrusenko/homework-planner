import mongoose, { Schema } from "mongoose"

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true, default: "user.png" },
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User
