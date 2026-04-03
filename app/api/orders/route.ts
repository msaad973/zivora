import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { sendOrderNotification } from "@/lib/mailer";

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (err: any) {
    console.error("[GET /api/orders]", err.message);
    return NextResponse.json({ error: "Database connection failed. Check MONGODB_URI in .env.local" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const order = await Order.create(body);
    try { await sendOrderNotification(order); } catch (e) { console.error("Email failed:", e); }
    return NextResponse.json(order, { status: 201 });
  } catch (err: any) {
    console.error("[POST /api/orders]", err.message);
    return NextResponse.json({ error: "Database connection failed. Check MONGODB_URI in .env.local" }, { status: 500 });
  }
}
