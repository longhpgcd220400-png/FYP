import mongoose, { Schema, Document, models } from "mongoose";

export interface INote extends Document {
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Note = models.Note || mongoose.model<INote>("Note", NoteSchema);

export default Note;
