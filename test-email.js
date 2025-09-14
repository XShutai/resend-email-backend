// test-email.js
import fetch from "node-fetch"; // run: npm install node-fetch

const API_URL = "https://resend-email-backend-sepia.vercel.app/send-email";

async function sendTestEmail() {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "alexanderhrmuchimba@gmail.com", // <-- put your email here
        subject: "Test Email from Resend Server",
        text: "Hello! This is a test email sent from your deployed server 🎉",
      }),
    });

    const data = await response.json();
    console.log("✅ Response:", data);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

sendTestEmail();
