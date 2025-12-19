import type { Route } from "./+types/api.subscribe";
import { Resend } from "resend";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const honeypot = formData.get("website");

  // Honeypot spam prevention - if filled, it's likely a bot
  if (honeypot) {
    return { success: false, error: "Spam detected" };
  }

  if (!email || typeof email !== "string") {
    return { success: false, error: "Invalid email address" };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Add email to audience
    await resend.contacts.create({
      email: email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    // Send notification email to both directors
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: ["johanne@boiler19.com", "kristian@boiler19.com"],
      subject: "New Newsletter Subscription",
      html: `
        <h2>New Newsletter Subscription</h2>
        <p>A new subscriber has signed up for the newsletter:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    return { success: true, message: "Thank you for subscribing!" };
  } catch (error) {
    console.error("Resend error:", error);
    return { success: false, error: "Failed to subscribe. Please try again." };
  }
}
