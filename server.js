import express from "express";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Setup SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Route to handle sending email
app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const msg = {
    to,
    from: process.env.FROM_EMAIL, // Your verified SendGrid email
    subject,
    text: message,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: "Email sent!" });
  } catch (error) {
    console.error("SendGrid error:", error.response.body);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
