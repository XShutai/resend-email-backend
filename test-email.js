import fetch from "node-fetch"; // npm install node-fetch

const API_URL = "https://resend-email-git-7a96e9-alexanderhrmuchimba-gmailcoms-projects.vercel.app/send-email";

async function sendTestEmail() {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "alexanderhrmuchimba@gmail.com",
        subject: "Test Email from Resend Server",
        text: "Hello! This is a test email sent from your deployed Resend backend 🎉",
      }),
    });

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log("✅ Response:", data);
    } else {
      const text = await response.text();
      console.log("⚠️ Response is not JSON. Here's the raw response:\n", text);
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

sendTestEmail();
