// models/User.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email?: string;
  lovedOne: string;
  relationshipYears: number;
  age: number;
  gender: string;
  comingOnlineTime: string;
  nextDatePlan: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String }, // ✅ Email added here (NO unique index)
  lovedOne: { type: String },
  relationshipYears: { type: Number },
  age: { type: Number },
  gender: { type: String },
  comingOnlineTime: { type: String },
  nextDatePlan: { type: String }
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
