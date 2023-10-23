import mongoose from "mongoose";

const { Schema } = mongoose;

const archrecordSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    tags: [String],
  },
  { timestamps: true },
);

//If the Archrecord collection does not exist create a new one.
export default mongoose.models.Archrecord || mongoose.model("Archrecord", archrecordSchema);
