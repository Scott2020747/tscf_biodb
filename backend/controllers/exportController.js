const pool = require("../config/db");
const { Parser } = require('json2csv');
const xlsx = require('xlsx');

// ================================
// EXPORT TO CSV
// ================================
const exportCSV = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM members ORDER BY created_at DESC');
    const members = result.rows;

    if (members.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No members found to export'
      });
    }

    // Define fields for CSV
    const fields = [
      'id', 'surname', 'given_name', 'email', 'mobile', 'phone',
      'institution', 'field_of_study', 'graduation_year',
      'membership_type', 'membership_number', 'application_status',
      'home_province', 'country', 'created_at'
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(members);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=members_${new Date().toISOString().split('T')[0]}.csv`);
    res.status(200).send(csv);
  } catch (error) {
    console.error('Export CSV error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export data'
    });
  }
};

// ================================
// EXPORT TO EXCEL
// ================================
const exportExcel = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM members ORDER BY created_at DESC');
    const members = result.rows;

    if (members.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No members found to export'
      });
    }

    // Create workbook
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(members);
    xlsx.utils.book_append_sheet(wb, ws, 'Members');

    // Generate buffer
    const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=members_${new Date().toISOString().split('T')[0]}.xlsx`);
    res.status(200).send(buffer);
  } catch (error) {
    console.error('Export Excel error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export data'
    });
  }
};

module.exports = {
  exportCSV,
  exportExcel
};
