import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export async function sendOrderNotification(order: any) {
  await transporter.sendMail({
    from: `"Zivora" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Order #${order._id}`,
    html: `
      <h2 style="color:#b8960c">New Order Received</h2>
      <p><strong>Customer:</strong> ${order.customerName}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Address:</strong> ${order.address}, ${order.city}</p>
      <p><strong>Total:</strong> PKR ${order.total}</p>
      <p><strong>Items:</strong> ${order.items.map((i: any) => `${i.title} x${i.quantity}`).join(", ")}</p>
    `,
  });
}
