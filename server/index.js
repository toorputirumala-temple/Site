import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Resolve root .env regardless of where `node` is invoked from
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Strip surrounding quotes if dotenv included them (e.g. SMTP_PASS="qqrb voad ...")
const smtpPass = (process.env.SMTP_PASS || "").replace(/^["']|["']$/g, "");
const smtpUser = process.env.SMTP_USER || "";

// ── Nodemailer transporter using Gmail SMTP ────────────────────────────────
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

// Verify SMTP connection on startup
transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP connection failed:", error.message);
    console.error("   SMTP_USER:", smtpUser);
    console.error("   SMTP_PASS length:", smtpPass.length);
  } else {
    console.log(`✅ SMTP server ready — connected as ${smtpUser}`);
  }
});

// ── POST /api/send-mail ────────────────────────────────────────────────────
app.post("/api/send-mail", async (req, res) => {
  const { subject, html, replyTo } = req.body;

  if (!subject || !html) {
    return res.status(400).json({ error: "Missing required fields: subject, html" });
  }

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
});

app.listen(PORT, () => {
  console.log(`🚀 Mail server running at http://localhost:${PORT}`);
});
