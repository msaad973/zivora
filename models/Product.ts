import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, enum: ["Lawn", "Pret", "Luxury", "Bridal"], required: true },
    images: [{ type: String }],
    sizes: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: true },
    stock: { type: Number, default: 10 },
  },
  { timestamps: true }
);

export default models.Product || model("Product", ProductSchema);
