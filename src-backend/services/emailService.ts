import { Resend } from "resend";
import nodemailer from "nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

const getTransporter = () => {
  if (process.env.EMAIL_SERVICE === "resend") {
    return null;
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const from = process.env.EMAIL_FROM || "no-reply@skmlmobiles.com";

  if (process.env.EMAIL_SERVICE === "resend" && process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from,
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error("Failed to send email via Resend", error);
    }
  } else {
    const transporter = getTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from,
          to,
          subject,
          html,
        });
      } catch (error) {
        console.error("Failed to send email via SMTP", error);
      }
    }
  }
};

export const sendPasswordReset = async (email: string, resetUrl: string) => {
  const subject = "Password Reset Request";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <p><a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
      <p>This link will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    </div>
  `;
  await sendEmail({ to: email, subject, html });
};

export const sendOrderConfirmation = async (email: string, orderId: string, total: number) => {
  const subject = `Order Confirmation - ${orderId}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Thank You for Your Order!</h2>
      <p>Your order has been placed successfully.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Total Amount:</strong> ₹${total}</p>
      <p>We'll send you another email when your order ships.</p>
    </div>
  `;
  await sendEmail({ to: email, subject, html });
};

export const sendInvoice = async (email: string, orderDetails: any) => {
  const subject = `Invoice - Order #${orderDetails._id}`;
  const itemsList = orderDetails.items.map((item: any) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.product.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price * item.quantity}</td>
    </tr>
  `).join("");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Invoice</h2>
      <p><strong>Order ID:</strong> ${orderDetails._id}</p>
      <p><strong>Date:</strong> ${new Date(orderDetails.createdAt).toLocaleDateString()}</p>
      <p><strong>Status:</strong> ${orderDetails.status}</p>
      
      <h3 style="margin-top: 30px;">Order Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="padding: 10px; text-align: left;">Product</th>
            <th style="padding: 10px; text-align: center;">Qty</th>
            <th style="padding: 10px; text-align: right;">Price</th>
            <th style="padding: 10px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsList}
        </tbody>
        <tfoot>
          <tr style="font-weight: bold;">
            <td colspan="3" style="padding: 10px; text-align: right;">Total:</td>
            <td style="padding: 10px; text-align: right;">₹${orderDetails.totalAmount}</td>
          </tr>
        </tfoot>
      </table>
      
      <h3 style="margin-top: 30px;">Shipping Address</h3>
      <p>
        ${orderDetails.shippingAddress.name}<br>
        ${orderDetails.shippingAddress.address}<br>
        ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} - ${orderDetails.shippingAddress.pinCode}<br>
        Phone: ${orderDetails.shippingAddress.phone}
      </p>
    </div>
  `;
  await sendEmail({ to: email, subject, html });
};

export const sendPaymentSuccess = async (email: string, orderId: string) => {
  const subject = `Payment Successful - ${orderId}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Payment Successful!</h2>
      <p>We have successfully received payment for your order <strong>${orderId}</strong>.</p>
      <p>Your order will be processed and shipped soon.</p>
    </div>
  `;
  await sendEmail({ to: email, subject, html });
};

export const sendShippingUpdate = async (email: string, orderId: string, trackingUrl: string) => {
  const subject = `Your order ${orderId} has been shipped!`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Order Shipped!</h2>
      <p>Your order <strong>${orderId}</strong> is on the way.</p>
      <p><a href="${trackingUrl}" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">Track Your Order</a></p>
    </div>
  `;
  await sendEmail({ to: email, subject, html });
};

export const sendDeliveryUpdate = async (email: string, orderId: string) => {
  const subject = `Your order ${orderId} has been delivered!`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Order Delivered!</h2>
      <p>Your order <strong>${orderId}</strong> has been successfully delivered.</p>
      <p>Thank you for shopping with SKML Mobiles!</p>
    </div>
  `;
  await sendEmail({ to: email, subject, html });
};
