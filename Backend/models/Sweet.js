import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: Number,
  quantity: Number,
  imageUrl: { type: String, required: true } // new field
});

export default mongoose.model("Sweet", sweetSchema);
