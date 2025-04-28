// Simple test script to verify email backend connection
async function testEmailBackend() {
  try {
    console.log('Sending test email...');
    
    const response = await fetch('https://resend-email-backend-production.up.railway.app/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'info@josephphiri.com>',
        to: 'revealedwordcampusministries@gmail.com',
        subject: 'Test Email - Backend Verification',
        text: `
Hello,

This is a test email to verify the booking system's email backend functionality.

Time sent: ${new Date().toLocaleString()}

If you received this email, the backend email system is working correctly.

Best regards,
System Test`
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('Test email sent successfully!');
      console.log('Response:', data);
    } else {
      console.error('Failed to send test email');
      console.error('Error:', data);
    }
  } catch (error) {
    console.error('Error sending test email:', error);
  }
}

// Execute the test
testEmailBackend();