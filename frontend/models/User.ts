import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email?: string;
  password?: string;
  provider?: string;
  createdAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: false, unique: false },
    password: { type: String, required: false },
    provider: { type: String, default: "credentials" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ✅ Tránh lỗi "OverwriteModelError" khi reload trong dev mode
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
