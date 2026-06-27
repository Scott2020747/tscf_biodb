const validateMember = (req, res, next) => {
  const {
    surname,
    given_name,
    email,
    membership_type
  } = req.body;

  let errors = [];

  // ================================
  // REQUIRED FIELDS CHECK
  // ================================
  if (!surname) errors.push("Surname is required");
  if (!given_name) errors.push("Given name is required");
  if (!email) errors.push("Email is required");
  if (!membership_type) errors.push("Membership type is required");

  // ================================
  // EMAIL VALIDATION
  // ================================
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  // ================================
  // MEMBERSHIP TYPE VALIDATION
  // ================================
  const validTypes = [
    "Student Member",
    "Graduate Member",
    "Life Member",
    "Partner"
  ];

  if (membership_type && !validTypes.includes(membership_type)) {
    errors.push("Invalid membership type");
  }

  // ================================
  // RETURN ERRORS
  // ================================
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors
    });
  }

  next();
};

module.exports = {
  validateMember
};
