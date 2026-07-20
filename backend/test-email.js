require('dotenv').config();
const { testEmailConnection } = require('./services/emailService');

async function testEmail() {
  console.log('🧪 Testing Email Configuration...');
  console.log('SMTP Host:', process.env.SMTP_HOST);
  console.log('SMTP User:', process.env.SMTP_USER);
  console.log('Mail From:', process.env.MAIL_FROM);
  console.log('Admin Email:', process.env.ADMIN_EMAIL);
  console.log('SMTP Secure:', process.env.SMTP_SECURE === 'true');
  console.log('');

  const result = await testEmailConnection();
  
  if (result.success) {
    console.log('✅ Email test completed successfully!');
  } else {
    console.error('❌ Email test failed:', result.error);
  }
}

testEmail();
