// models/Todo.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITodo extends Document {
  task: string;
  completed: boolean;
}

const TodoSchema: Schema = new Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Todo: Model<ITodo> =
  mongoose.models.Todo || mongoose.model<ITodo>("Todo", TodoSchema);

export default Todo;
