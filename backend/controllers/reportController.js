const pool = require("../config/db");
const PDFDocument = require('pdfkit');

// ================================
// GENERATE MEMBERSHIP REPORT (PDF)
// ================================
const generateMembershipReport = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM members ORDER BY created_at DESC');
    const members = result.rows;

    if (members.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No members found to generate report'
      });
    }

    // Create PDF
    const doc = new PDFDocument({ margin: 50 });
    const filename = `membership_report_${new Date().toISOString().split('T')[0]}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    doc.pipe(res);

    // Header
    doc.fontSize(24).font('Helvetica-Bold')
      .text('TSCF Vision Partners', { align: 'center' });
    doc.fontSize(16).font('Helvetica')
      .text('Membership Report', { align: 'center' });
    doc.moveDown();

    // Date
    doc.fontSize(12)
      .text(`Generated: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown();

    // Summary Statistics
    const total = members.length;
    const approved = members.filter(m => m.application_status === 'Approved').length;
    const pending = members.filter(m => m.application_status === 'Pending' || !m.application_status).length;
    const rejected = members.filter(m => m.application_status === 'Rejected').length;
    const male = members.filter(m => m.sex === 'Male').length;
    const female = members.filter(m => m.sex === 'Female').length;

    doc.fontSize(14).font('Helvetica-Bold').text('Summary Statistics');
    doc.fontSize(12).font('Helvetica');
    doc.text(`Total Members: ${total}`);
    doc.text(`Approved: ${approved}`);
    doc.text(`Pending: ${pending}`);
    doc.text(`Rejected: ${rejected}`);
    doc.text(`Male: ${male}`);
    doc.text(`Female: ${female}`);
    doc.moveDown();

    // Membership Types Breakdown
    const membershipTypes = {};
    members.forEach(m => {
      const type = m.membership_type || 'Not Specified';
      membershipTypes[type] = (membershipTypes[type] || 0) + 1;
    });

    doc.fontSize(14).font('Helvetica-Bold').text('Membership Type Breakdown');
    doc.fontSize(12).font('Helvetica');
    for (const [type, count] of Object.entries(membershipTypes)) {
      doc.text(`${type}: ${count}`);
    }
    doc.moveDown();

    // Member List
    doc.fontSize(14).font('Helvetica-Bold').text('Member List');
    doc.fontSize(10).font('Helvetica');

    // Table Headers
    let y = doc.y;
    doc.text('ID', 50, y, { width: 40 });
    doc.text('Name', 90, y, { width: 120 });
    doc.text('Email', 210, y, { width: 150 });
    doc.text('Membership', 360, y, { width: 80 });
    doc.text('Status', 440, y, { width: 80 });

    y += 20;
    doc.moveTo(50, y).lineTo(550, y).stroke();

    // Table Rows
    y += 10;
    for (const member of members) {
      if (y > 700) {
        doc.addPage();
        y = 50;
      }
      doc.text(member.id, 50, y, { width: 40 });
      doc.text(`${member.given_name} ${member.surname}`, 90, y, { width: 120 });
      doc.text(member.email || 'N/A', 210, y, { width: 150 });
      doc.text(member.membership_type || 'N/A', 360, y, { width: 80 });
      doc.text(member.application_status || 'Pending', 440, y, { width: 80 });
      y += 20;
    }

    doc.end();
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate report'
    });
  }
};

module.exports = {
  generateMembershipReport
};
