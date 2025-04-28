import express from "express";
import { Resend } from "resend";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Allow frontend apps to access
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const response = await resend.emails.send({
      from: "System Test <noreply@josephphiri.com>",  // Resend default sandbox domain
      to,
      subject,
      text,
    });

    res.status(200).json({ message: "Email sent", data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
