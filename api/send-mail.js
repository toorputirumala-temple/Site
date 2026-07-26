import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subject, html, replyTo } = req.body;

  if (!subject || !html) {
    return res.status(400).json({ error: "Missing required fields: subject, html" });
  }

  const smtpPass = (process.env.SMTP_PASS || "").replace(/^["']|["']$/g, "");
  const smtpUser = process.env.SMTP_USER || "";

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: smtpUser, pass: smtpPass },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Temple Notification" <${smtpUser}>`,
      to: process.env.SMTP_TO,
      replyTo: replyTo || process.env.SMTP_USER,
      subject,
      html,
    });

    console.log(`📧 Mail sent: ${info.messageId}`);
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("❌ Failed to send mail:", error.message);
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
}
