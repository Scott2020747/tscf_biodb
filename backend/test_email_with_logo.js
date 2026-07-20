require('dotenv').config();
const { sendConfirmationEmail } = require('./services/emailService');

async function testEmail() {
  try {
    const testData = {
      surname: 'Test',
      given_name: 'User',
      email: 'scottbilau@gmail.com', // Replace with your email
      membership_type: 'Student Member',
      membership_number: 'STU-2026-9999'
    };
    
    console.log('📧 Sending test email with logo...');
    const result = await sendConfirmationEmail(testData);
    
    if (result.success) {
      console.log('✅ Email sent successfully!');
      console.log('📨 Message ID:', result.messageId);
    } else {
      console.error('❌ Email failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testEmail();
