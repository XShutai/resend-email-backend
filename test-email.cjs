// emailTest.js

// If you want to load from a .env file instead of CLI, uncomment:
// require('dotenv').config();

const fetch = require('node-fetch'); // or global fetch in Node 18+

// Constants
const TEST_RECIPIENT = 'delivered@resend.dev';
const DEFAULT_REAL   = 'revealedwordcampusministries@gmail.com';

// Determine recipient based on environment
const ENV = process.env.NODE_ENV || 'development';
const REAL_RECIPIENT = process.env.REAL_RECIPIENT || DEFAULT_REAL;
const TO_ADDRESS = ENV === 'development' ? TEST_RECIPIENT : REAL_RECIPIENT;

async function testEmailBackend() {
  try {
    console.log(`Environment: ${ENV}`);
    console.log(`Sending test email to: ${TO_ADDRESS}`);

    const response = await fetch(
      'https://resend-email-backend-production.up.railway.app/send-email',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to:   TO_ADDRESS,
          subject: 'Test Email - Backend Verification',
          text: `
Hello,

This is a test email to verify the booking system's email backend functionality.

Time sent: ${new Date().toLocaleString()}

If you received this email, the backend email system is working correctly.

Best regards,
System Test`
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log('📨 Test email sent successfully!');
      console.log('Response:', data);
    } else {
      console.error('❌ Failed to send test email');
      console.error('Error:', data);
    }
  } catch (error) {
    console.error('🚨 Error sending test email:', error);
  }
}

// Run it
testEmailBackend();
