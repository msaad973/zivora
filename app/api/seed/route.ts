import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { DEMO_PRODUCTS } from "@/lib/demoProducts";

export async function POST() {
  await connectDB();
  // Only seed if no products exist
  const count = await Product.countDocuments();
  if (count > 0) {
    return NextResponse.json({ message: `Already have ${count} products. Skipped.` });
  }
  await Product.insertMany(DEMO_PRODUCTS);
  return NextResponse.json({ message: `Seeded ${DEMO_PRODUCTS.length} demo products.` });
}

export async function DELETE() {
  await connectDB();
  await Product.deleteMany({});
  return NextResponse.json({ message: "All products deleted." });
}
