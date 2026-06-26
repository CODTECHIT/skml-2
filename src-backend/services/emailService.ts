import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export const sendOrderConfirmation = async (email: string, orderId: string, total: number) => {
  try {
    await resend.emails.send({
      from: "orders@skmlmobiles.com",
      to: email,
      subject: `Order Confirmation - ${orderId}`,
      html: `<p>Thank you for your order! Your order ID is <strong>${orderId}</strong> for a total of ₹${total}.</p>`,
    });
  } catch (error) {
    console.error("Failed to send order confirmation email", error);
  }
};

export const sendPaymentSuccess = async (email: string, orderId: string) => {
  try {
    await resend.emails.send({
      from: "payments@skmlmobiles.com",
      to: email,
      subject: `Payment Successful - ${orderId}`,
      html: `<p>We have successfully received the payment for your order <strong>${orderId}</strong>.</p>`,
    });
  } catch (error) {
    console.error("Failed to send payment success email", error);
  }
};

export const sendShippingUpdate = async (email: string, orderId: string, trackingUrl: string) => {
  try {
    await resend.emails.send({
      from: "shipping@skmlmobiles.com",
      to: email,
      subject: `Your order ${orderId} has been shipped!`,
      html: `<p>Your order is on the way. Track it here: <a href="${trackingUrl}">${trackingUrl}</a></p>`,
    });
  } catch (error) {
    console.error("Failed to send shipping update email", error);
  }
};

export const sendDeliveryUpdate = async (email: string, orderId: string) => {
  try {
    await resend.emails.send({
      from: "orders@skmlmobiles.com",
      to: email,
      subject: `Your order ${orderId} has been delivered!`,
      html: `<p>Your order has been successfully delivered. Thank you for shopping with us!</p>`,
    });
  } catch (error) {
    console.error("Failed to send delivery update email", error);
  }
};
