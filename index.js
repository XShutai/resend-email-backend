import express from "express";
import { Resend } from "resend";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Send Email Route
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await resend.emails.send({
      from: process.env.SMTP_FROM_EMAIL || "info@moneyacumenadvisory.com",
      to,
      subject,
      text,
    });

    res.status(200).json({ message: "Email sent ✅", data: response });
  } catch (error) {
    console.error("Send error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Health Check
app.get("/", (req, res) => {
  res.send("✅ Email backend is running!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
