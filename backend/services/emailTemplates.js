// ================================
// EMAIL TEMPLATES
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
      <title>Welcome to TSCF Vision Partners</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1a2c3e; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f7fa; }
        .container { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #0050b5, #00125c); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 8px 0 0; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .member-detail { background: #f0f4ff; padding: 20px; border-radius: 12px; border-left: 4px solid #0050b5; margin: 20px 0; }
        .member-detail p { margin: 6px 0; }
        .badge { display: inline-block; background: #0050b5; color: white; padding: 4px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; }
        .verse { font-style: italic; color: #334155; text-align: center; padding: 16px; background: #f1f5f9; border-radius: 12px; margin: 20px 0; }
        .footer { background: #f8fafc; padding: 30px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .footer a { color: #0050b5; text-decoration: none; }
        .btn { display: inline-block; background: #0050b5; color: white; padding: 12px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 16px; }
        .btn:hover { background: #003d8a; }
        .features { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0; }
        .feature { background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌟 Welcome to TSCF Vision Partners!</h1>
          <p>Salt & Light • National Transformation</p>
        </div>
        <div class="content">
          <h2>Dear ${fullName},</h2>
          <p>Thank you for registering as a <strong>${membership_type}</strong> with the Tertiary Students Christian Fellowship Vision Partners program.</p>
          <div class="member-detail">
            <p><strong>Membership Number:</strong> <span style="font-family: monospace; font-size: 18px; font-weight: 700; color: #0050b5;">${membership_number}</span></p>
            <p><strong>Membership Type:</strong> <span class="badge">${membership_type}</span></p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          <p>We are excited to have you join our movement of graduates transforming nations for Christ.</p>
          <div class="features">
            <div class="feature">🌍 Impact the Marketplace</div>
            <div class="feature">📢 Promote Kingdom Mindset</div>
            <div class="feature">🤝 Build Strategic Alliances</div>
            <div class="feature">🙏 Raise Gatekeepers</div>
          </div>
          <div style="text-align: center;">
            <a href="https://tscfvp.com" class="btn">Visit Our Website</a>
          </div>
          <div class="verse">
            "You are the light of the world. A city set on a hill cannot be hidden."<br>
            <strong>— Matthew 5:14</strong>
          </div>
        </div>
        <div class="footer">
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

const getAdminNotificationHTML = (memberData) => {
  const { surname, given_name, email, membership_type, membership_number, institution, field_of_study } = memberData;
  const fullName = `${given_name} ${surname}`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1a2c3e; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f7fa; }
        .container { background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .header { border-bottom: 3px solid #0050b5; padding-bottom: 16px; margin-bottom: 20px; }
        .header h1 { color: #00125c; margin: 0; font-size: 24px; }
        .badge-new { display: inline-block; background: #10b981; color: white; padding: 2px 12px; border-radius: 12px; font-size: 12px; margin-left: 8px; }
        .detail { background: #f8fafc; padding: 16px; border-radius: 12px; border-left: 4px solid #0050b5; margin: 16px 0; }
        .detail p { margin: 6px 0; }
        .label { font-weight: 600; color: #334155; }
        .badge { display: inline-block; background: #0050b5; color: white; padding: 2px 12px; border-radius: 12px; font-size: 12px; }
        .btn { display: inline-block; background: #0050b5; color: white; padding: 10px 24px; text-decoration: none; border-radius: 8px; margin-top: 12px; font-weight: 600; }
        .btn:hover { background: #003d8a; }
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
        <p>🔍 Please review this new registration in the admin dashboard.</p>
        <div style="text-align: center;">
          <a href="https://tscfvp.com/dashboard" class="btn">📊 View in Admin Panel</a>
        </div>
        <div class="footer">
          <p>This is an automated notification from the TSCF Vision Partners system.</p>
          <p style="margin-top: 4px; font-size: 11px; color: #94a3b8;">${new Date().getFullYear()} TSCF Vision Partners</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const getStatusUpdateEmailHTML = (memberData, oldStatus, newStatus) => {
  const { surname, given_name, membership_number } = memberData;
  const fullName = `${given_name} ${surname}`;

  const statusColors = {
    'Approved': '#10b981',
    'Rejected': '#ef4444',
    'Pending': '#f59e0b'
  };

  const statusEmojis = {
    'Approved': '✅',
    'Rejected': '❌',
    'Pending': '⏳'
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1a2c3e; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f7fa; }
        .container { background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .header { border-bottom: 3px solid ${statusColors[newStatus]}; padding-bottom: 16px; margin-bottom: 20px; }
        .header h1 { color: #00125c; margin: 0; font-size: 24px; }
        .status-badge { display: inline-block; background: ${statusColors[newStatus]}; color: white; padding: 4px 16px; border-radius: 20px; font-size: 16px; font-weight: 600; }
        .detail { background: #f8fafc; padding: 16px; border-radius: 12px; margin: 16px 0; }
        .footer { margin-top: 20px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${statusEmojis[newStatus]} Application Status Update</h1>
        </div>
        <p>Dear <strong>${fullName}</strong>,</p>
        <p>Your TSCF Vision Partners application status has been updated.</p>
        <div class="detail">
          <p><strong>Membership Number:</strong> ${membership_number}</p>
          <p><strong>Previous Status:</strong> ${oldStatus}</p>
          <p><strong>New Status:</strong> <span class="status-badge">${newStatus}</span></p>
        </div>
        ${newStatus === 'Approved' ? `
          <p>🎉 Congratulations! Your application has been approved. You are now officially a TSCF Vision Partner.</p>
          <p>You will receive further information about upcoming events, training programs, and partnership opportunities.</p>
        ` : newStatus === 'Rejected' ? `
          <p>We regret to inform you that your application was not approved at this time.</p>
          <p>Please contact us if you have any questions or would like to discuss your application further.</p>
        ` : `
          <p>Your application is currently under review. We will notify you when a decision is made.</p>
        `}
        <div style="text-align: center;">
          <a href="https://tscfvp.com" class="btn" style="display: inline-block; background: #0050b5; color: white; padding: 10px 24px; text-decoration: none; border-radius: 8px; margin-top: 16px; font-weight: 600;">Visit Our Website</a>
        </div>
        <div class="footer">
          <p>This is an automated notification from the TSCF Vision Partners system.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = {
  getConfirmationEmailHTML,
  getAdminNotificationHTML,
  getStatusUpdateEmailHTML
};
