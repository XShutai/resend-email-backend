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
  const { to, subject, text, html, attachments } = req.body;

  if (!to || !subject || !(text || html)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Log incoming request size
    const requestSize = JSON.stringify(req.body).length;
    console.log(`Request size: ${Math.ceil(requestSize / 1024)}KB`);
    
    // Log attachment details if present
    if (attachments?.length) {
      attachments.forEach(attachment => {
        const size = Math.ceil((attachment.content.length * 0.75) / 1024); // base64 to binary size
        console.log(`Attachment ${attachment.filename}: ${size}KB`);
      });
    }

    const emailData = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      text,
      html
    };

    // Handle attachments according to Resend's format
    if (attachments?.length) {
      emailData.attachments = attachments.map(attachment => ({
        filename: attachment.filename,
        content: attachment.content // Base64 content
      }));
    }

    const response = await resend.emails.send(emailData);
    res.status(200).json({
      message: "Email sent ✅",
      data: response,
      requestSize: `${Math.ceil(requestSize / 1024)}KB`
    });
  } catch (error) {
    console.error("Send error:", {
      status: error.statusCode,
      message: error.message,
      details: error.response
    });
    
    // Handle specific error cases
    if (error.statusCode === 413) {
      return res.status(413).json({
        error: "Attachment too large",
        message: "Please reduce the size of your attachments or send them in smaller chunks",
        details: error.response
      });
    }
    
    res.status(error.statusCode || 500).json({
      error: error.message || "Failed to send email",
      details: error.response || {}
    });
  }
});

// Health Check
app.get("/", (req, res) => {
  res.send("✅ Email backend is running!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
