import mongoose from "mongoose";

const ReleaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  additionalInfo: String,
  steps: {
    type: [Boolean],
    default: [false,false,false,false,false,false,false]
  }
},{timestamps:true});

export default mongoose.model("Release", ReleaseSchema);