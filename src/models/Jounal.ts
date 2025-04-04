// models/Journal.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IJournal extends Document {
  title: string;
  content: string;
  date: Date;
}

const JournalSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Journal: Model<IJournal> =
  mongoose.models.Journal || mongoose.model<IJournal>("Journal", JournalSchema);

export default Journal;
