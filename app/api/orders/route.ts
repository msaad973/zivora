import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { sendOrderNotification } from "@/lib/mailer";

export async function GET() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const order = await Order.create(body);
  try {
    await sendOrderNotification(order);
  } catch (e) {
    console.error("Email notification failed:", e);
  }
  return NextResponse.json(order, { status: 201 });
}
