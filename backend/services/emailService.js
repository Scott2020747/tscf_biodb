const nodemailer = require('nodemailer');
require('dotenv').config();

// ================================
// EMAIL TRANSPORTER SETUP
// ================================

let transporter = null;

const createTransporter = () => {
  if (transporter) return transporter;

  try {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtppro.zoho.com',
      port: parseInt(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log('✅ Email transporter created successfully');
    return transporter;
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error.message);
    return null;
  }
};

// ================================
// USER CONFIRMATION EMAIL
// ================================
const getConfirmationEmailHTML = (memberData) => {
  const { surname, given_name, email, membership_type, membership_number } = memberData;
  const fullName = `${given_name} ${surname}`;
  const currentYear = new Date().getFullYear();

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TSCF Vision Partners Confirmation</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a2c3e; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f7fa; }
        .email-container { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0050b5, #00125c); color: white; padding: 40px 30px; text-align: center; }
        .header img { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(255,255,255,0.3); margin-bottom: 15px; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 8px 0 0; opacity: 0.9; font-size: 16px; }
        .content { padding: 40px 30px; }
        .member-detail { background: #f0f4ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0050b5; margin: 20px 0; }
        .member-detail p { margin: 5px 0; }
        .membership-badge { display: inline-block; background: #0050b5; color: white; padding: 4px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; }
        .verse { font-style: italic; color: #334155; text-align: center; padding: 16px; background: #f1f5f9; border-radius: 8px; margin: 20px 0; }
        .footer { background: #f8fafc; padding: 30px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .footer img { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-bottom: 10px; }
        .footer a { color: #0050b5; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <img src="https://tscfvp.com/static/media/tscf-logo.840825f1fa4e571d811d.png" alt="TSCF Logo" />
          <h1>Welcome to TSCF Vision Partners!</h1>
          <p>Salt & Light • National Transformation</p>
        </div>
        <div class="content">
          <h2>Dear ${fullName},</h2>
          <p>Thank you for registering as a <strong>${membership_type}</strong> with the Tertiary Students Christian Fellowship Vision Partners program.</p>
          <div class="member-detail">
            <p><strong>Membership Number:</strong> <span style="font-family: monospace; font-size: 18px; font-weight: 700; color: #0050b5;">${membership_number}</span></p>
            <p><strong>Membership Type:</strong> <span class="membership-badge">${membership_type}</span></p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          <p>We are excited to have you join our movement of graduates transforming nations for Christ. You will receive further information about upcoming events, training programs, and partnership opportunities soon.</p>
          <div class="verse">"You are the light of the world. A city set on a hill cannot be hidden."<br><strong>— Matthew 5:14</strong></div>
        </div>
        <div class="footer">
          <img src="https://tscfvp.com/static/media/tscf-logo.840825f1fa4e571d811d.png" alt="TSCF Logo" />
          <p><strong>Tertiary Students Christian Fellowship</strong></p>
          <p>P. O. Box 6329 Port Boroko, National Capital District</p>
          <p>📱 Mobile: 73277901 | 📧 Email: info@tscfvp.com</p>
          <p style="margin-top: 12px; font-size: 12px; color: #94a3b8;">&copy; ${currentYear} TSCF. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// ================================
// ADMIN NOTIFICATION
// ================================

const getAdminNotificationHTML = (memberData) => {
  const { surname, given_name, email, membership_type, membership_number, institution, field_of_study } = memberData;
  const fullName = `${given_name} ${surname}`;
  const currentYear = new Date().getFullYear();

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Registration - TSCF</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a2c3e; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f7fa; }
        .container { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .header { border-bottom: 3px solid #0050b5; padding-bottom: 16px; margin-bottom: 20px; }
        .header h1 { color: #00125c; margin: 0; font-size: 24px; }
        .badge-new { display: inline-block; background: #10b981; color: white; padding: 2px 12px; border-radius: 12px; font-size: 12px; margin-left: 8px; }
        .detail { background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #0050b5; margin: 16px 0; }
        .detail p { margin: 6px 0; }
        .label { font-weight: 600; color: #334155; }
        .badge { display: inline-block; background: #0050b5; color: white; padding: 2px 12px; border-radius: 12px; font-size: 12px; }
        .action-btn { display: inline-block; background: #0050b5; color: white; padding: 10px 24px; text-decoration: none; border-radius: 8px; margin-top: 12px; font-weight: 600; }
        .action-btn:hover { background: #003d8a; }
        .footer { margin-top: 20px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 New Vision Partners Registration <span class="badge-new">NEW</span></h1>
        </div>
        <p><strong>${fullName}</strong> has just registered as a Vision Partner.</p>
        <div class="detail">
          <p><span class="label">📝 Name:</span> ${fullName}</p>
          <p><span class="label">📧 Email:</span> <a href="mailto:${email}">${email}</a></p>
          <p><span class="label">🏷️ Membership Type:</span> <span class="badge">${membership_type}</span></p>
          <p><span class="label">🔢 Membership Number:</span> <strong style="color: #0050b5;">${membership_number}</strong></p>
          ${institution ? `<p><span class="label">🏫 Institution:</span> ${institution}</p>` : ''}
          ${field_of_study ? `<p><span class="label">📚 Field of Study:</span> ${field_of_study}</p>` : ''}
        </div>
        <p style="margin-top: 16px;">🔍 Please review this new registration in the admin dashboard.</p>
        <div style="text-align: center;">
          <a href="https://tscfvp.com/admin/members" class="action-btn">📊 View in Admin Panel</a>
        </div>
        <div class="footer">
          <p>This is an automated notification from the TSCF Vision Partners system.</p>
          <p style="margin-top: 4px; font-size: 11px; color: #94a3b8;">${currentYear} TSCF Vision Partners</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// ================================
// STATUS UPDATE EMAIL
// ================================

const getStatusUpdateEmailHTML = (memberData, oldStatus, newStatus) => {
  const { surname, given_name, membership_number } = memberData;
  const fullName = `${given_name} ${surname}`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0050b5; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; }
        .approved { background: #10b981; color: white; }
        .rejected { background: #ef4444; color: white; }
        .pending { background: #f59e0b; color: white; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📋 Application Status Update</h1>
      </div>
      <div class="content">
        <p>Dear <strong>${fullName}</strong>,</p>
        <p>Your TSCF Vision Partners application status has been updated.</p>
        <p><strong>Membership Number:</strong> ${membership_number}</p>
        <p><strong>Previous Status:</strong> ${oldStatus}</p>
        <p><strong>New Status:</strong> <span class="status-badge ${newStatus.toLowerCase()}">${newStatus}</span></p>
        ${newStatus === 'Approved' ? `
          <p>🎉 Congratulations! Your application has been approved. You are now officially a TSCF Vision Partner.</p>
        ` : newStatus === 'Rejected' ? `
          <p>We regret to inform you that your application was not approved at this time.</p>
          <p>Please contact us if you have any questions.</p>
        ` : `
          <p>Your application is currently under review. We will notify you when a decision is made.</p>
        `}
        <p style="margin-top: 20px;">Thank you for your partnership.</p>
      </div>
      <div class="footer">
        <p>Tertiary Students Christian Fellowship</p>
        <p>&copy; ${new Date().getFullYear()} TSCF Vision Partners</p>
      </div>
    </body>
    </html>
  `;
};

// ================================
// SEND EMAILS
// ================================

const sendConfirmationEmail = async (memberData) => {
  console.log('📧 Sending confirmation email to member:', memberData.email);

  try {
    const transporter = createTransporter();
    if (!transporter) {
      throw new Error('Email transporter not available');
    }

    const mailOptions = {
      from: process.env.MAIL_FROM || '"TSCF Vision Partners" <noreply@tscfvp.com>',
      to: memberData.email,
      subject: '🎉 Welcome to TSCF Vision Partners!',
      html: getConfirmationEmailHTML(memberData),
      text: `Welcome to TSCF Vision Partners! Your membership number is: ${memberData.membership_number}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent to member:', memberData.email);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Confirmation email failed:', error.message);
    return { success: false, error: error.message };
  }
};

const sendAdminNotification = async (memberData) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@tscfvp.com';
  console.log('📧 Sending admin notification to:', adminEmail);

  try {
    const transporter = createTransporter();
    if (!transporter) {
      throw new Error('Email transporter not available');
    }

    const mailOptions = {
      from: process.env.MAIL_FROM || '"TSCF Vision Partners" <noreply@tscfvp.com>',
      to: adminEmail,
      subject: '📋 New Vision Partners Registration',
      html: getAdminNotificationHTML(memberData),
      text: `New registration from ${memberData.given_name} ${memberData.surname} (${memberData.email})`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification sent to:', adminEmail);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Admin notification failed:', error.message);
    return { success: false, error: error.message };
  }
};

const sendStatusUpdateEmail = async (memberData, oldStatus, newStatus) => {
  console.log(`📧 Sending status update email to: ${memberData.email}`);
  console.log(`📝 Status changed from ${oldStatus} to ${newStatus}`);
  
  try {
    const transporter = createTransporter();
    if (!transporter) {
      throw new Error('Email transporter not available');
    }

    const mailOptions = {
      from: process.env.MAIL_FROM || '"TSCF Vision Partners" <noreply@tscfvp.com>',
      to: memberData.email,
      subject: `📋 Application Status Update: ${newStatus}`,
      html: getStatusUpdateEmailHTML(memberData, oldStatus, newStatus),
      text: `Your application status has been updated from ${oldStatus} to ${newStatus}.\nMembership Number: ${memberData.membership_number}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Status update email sent to:', memberData.email);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Status update email failed:', error.message);
    return { success: false, error: error.message };
  }
};

// ================================
// EXPORTS
// ================================

module.exports = {
  sendConfirmationEmail,
  sendAdminNotification,
  sendStatusUpdateEmail,
  createTransporter
};
