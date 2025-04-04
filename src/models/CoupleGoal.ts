// models/CoupleGoal.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICoupleGoal extends Document {
  goal: string;
  deadline: Date;
  creator: string;       // Add this
  lovedOne: string;      // Add this
  progress: Map<string, number>;
  updates: {
    user: string;
    option: string;
    comment: string;
    date: Date;
  }[];
}

const CoupleGoalSchema: Schema = new Schema({
  goal: { type: String, required: true },
  deadline: { type: Date, required: true },
  creator: { type: String, required: true },       // Add this
  lovedOne: { type: String, required: true },      // Add this
  progress: {
    type: Map,
    of: Number,
    default: {},
  },
  updates: {
    type: [
      {
        user: { type: String, required: true },
        option: { type: String, required: true },
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
});


const CoupleGoal: Model<ICoupleGoal> =
  mongoose.models.CoupleGoal || mongoose.model<ICoupleGoal>("CoupleGoal", CoupleGoalSchema);

export default CoupleGoal;
