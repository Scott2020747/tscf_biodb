import React, { useState } from "react";
import logo from "./assets/tscf-logo.png";
import ProgressBar from "./components/ProgressBar";
import StepCard from "./components/StepCard";

export default function Register() {
  const TOTAL_STEPS = 5;
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // STEP 1 - Personal Information
    surname: "",
    given_name: "",
    institution: "",
    dob: "",
    sex: "",
    marital_status: "",
    province: "",
    country: "Papua New Guinea",
    denomination: "",
    address: "",
    phone: "",
    mobile: "",
    email: "",

    // STEP 2 - Educational Information
    college_university: "",
    campus_location: "",
    student_id: "",
    field_of_study: "",
    graduation_year: "",
    membership_role: "",
    leadership_role: "",
    years_in_tscf: "",

    // STEP 3 - Graduate Programs
    graduate_programs: [],

    // STEP 4 - Contribution & Membership
    fortnightly_amount: "",
    monthly_amount: "",
    yearly_amount: "",
    donation_amount: "",
    membership_type: "",

    // STEP 5 - Review & Submit
    declaration: false
  });

  // ================================
  // VALIDATION FUNCTIONS
  // ================================

  const validateStep1 = () => {
    const requiredFields = [
      "surname",
      "given_name",
      "institution",
      "dob",
      "sex",
      "marital_status",
      "province",
      "country",
      "address",
      "mobile",
      "email"
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please complete ${field.replace(/_/g, " ").toUpperCase()}`);
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    const required = [
      "college_university",
      "campus_location",
      "field_of_study",
      "graduation_year",
      "membership_role",
      "years_in_tscf"
    ];

    for (const field of required) {
      if (!formData[field]) {
        alert(`Please complete ${field.replace(/_/g, " ")}`);
        return false;
      }
    }

    return true;
  };

  // ================================
  // NAVIGATION FUNCTIONS
  // ================================

  const nextStep = () => {
    if (step === 1) {
      if (!validateStep1()) return;
    }

    if (step === 2) {
      if (!validateStep2()) return;
    }

    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // ================================
  // RENDER
  // ================================

  return (
    <div className="wizard-wrapper">
      {/* HEADER */}
      <div className="wizard-header">
        <img src={logo} alt="TSCF" className="wizard-logo" />
        <h1>Vision Partners Registration</h1>
        <p>Salt & Light • National Transformation</p>
      </div>

      {/* PROGRESS BAR */}
      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />

      {/* ============================================================
          STEP 1: GENERAL INFORMATION
          ============================================================ */}
      {step === 1 && (
        <StepCard title="General Information">
          <h3 className="wizard-section-title">Personal Information</h3>

          <div className="wizard-grid">
            <div>
              <label>Surname *</label>
              <input
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Surname"
              />
            </div>

            <div>
              <label>Given Name *</label>
              <input
                name="given_name"
                value={formData.given_name}
                onChange={handleChange}
                placeholder="Given Name"
              />
            </div>

            <div>
              <label>Institution *</label>
              <input
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="Institution"
              />
            </div>

            <div>
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Sex *</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label>Marital Status *</label>
              <select
                name="marital_status"
                value={formData.marital_status}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <h3 className="wizard-section-title">Address Information</h3>

          <div className="wizard-grid">
            <div>
              <label>Province *</label>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
              >
                <option value="">Select Province</option>
                <option>Central</option>
                <option>Chimbu</option>
                <option>Eastern Highlands</option>
                <option>East New Britain</option>
                <option>East Sepik</option>
                <option>Enga</option>
                <option>Gulf</option>
                <option>Hela</option>
                <option>Jiwaka</option>
                <option>Madang</option>
                <option>Manus</option>
                <option>Milne Bay</option>
                <option>Morobe</option>
                <option>New Ireland</option>
                <option>Oro</option>
                <option>Sandaun</option>
                <option>Southern Highlands</option>
                <option>Western Highlands</option>
                <option>Western</option>
                <option>West New Britain</option>
                <option>National Capital District</option>
                <option>Autonomous Region of Bougainville</option>
              </select>
            </div>

            <div>
              <label>Country *</label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </div>

            <div>
              <label>Denomination</label>
              <select
                name="denomination"
                value={formData.denomination}
                onChange={handleChange}
              >
                <option value="">Select Denomination</option>
                <option>Anglican</option>
                <option>Baptist</option>
                <option>Catholic</option>
                <option>Christian Revival Crusade</option>
                <option>Evangelical Brotherhood</option>
                <option>Four Square</option>
                <option>Lutheran</option>
                <option>Nazarene</option>
                <option>Pentecostal</option>
                <option>Salvation Army</option>
                <option>Seventh Day Adventist</option>
                <option>United Church</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Residential Address *</label>
            <textarea
              rows="4"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full residential address"
            />
          </div>

          <h3 className="wizard-section-title">Contact Information</h3>

          <div className="wizard-grid">
            <div>
              <label>Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </div>

            <div>
              <label>Mobile *</label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile"
              />
            </div>

            <div>
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
          </div>
        </StepCard>
      )}

      {/* ============================================================
          STEP 2: EDUCATIONAL INFORMATION
          ============================================================ */}
      {step === 2 && (
        <StepCard title="Educational Information">
          <div className="wizard-intro">
            Please provide your academic background and your involvement with TSCF during your studies.
          </div>

          <h3 className="wizard-section-title">Academic History</h3>

          <div className="wizard-grid">
            <div>
              <label>College / University *</label>
              <input
                name="college_university"
                value={formData.college_university}
                onChange={handleChange}
                placeholder="University of Papua New Guinea"
              />
            </div>

            <div>
              <label>Campus Location *</label>
              <input
                name="campus_location"
                value={formData.campus_location}
                onChange={handleChange}
                placeholder="Waigani Campus"
              />
            </div>

            <div>
              <label>Student ID (optional)</label>
              <input
                name="student_id"
                value={formData.student_id}
                onChange={handleChange}
                placeholder="Student ID"
              />
            </div>

            <div>
              <label>Field of Study *</label>
              <input
                name="field_of_study"
                value={formData.field_of_study}
                onChange={handleChange}
                placeholder="Bachelor of Information Technology"
              />
            </div>

            <div>
              <label>Year Graduated *</label>
              <select
                name="graduation_year"
                value={formData.graduation_year}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                {Array.from({ length: 35 }, (_, i) => 2026 - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h3 className="wizard-section-title">TSCF Membership</h3>

          <div className="wizard-grid">
            <div>
              <label>Membership Role *</label>
              <select
                name="membership_role"
                value={formData.membership_role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option>General Member</option>
                <option>Bible Study Leader</option>
                <option>Committee Member</option>
                <option>Campus President</option>
                <option>Secretary</option>
                <option>Treasurer</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label>Leadership Position</label>
              <input
                name="leadership_role"
                value={formData.leadership_role}
                onChange={handleChange}
                placeholder="President"
              />
            </div>

            <div>
              <label>Years in TSCF *</label>
              <select
                name="years_in_tscf"
                value={formData.years_in_tscf}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Less than 1 year</option>
                <option>1 Year</option>
                <option>2 Years</option>
                <option>3 Years</option>
                <option>4 Years</option>
                <option>5+ Years</option>
              </select>
            </div>
          </div>
        </StepCard>
      )}

      {/* ============================================================
          STEP 3: GRADUATE PROGRAMS
          ============================================================ */}
      {step === 3 && (
        <StepCard title="Graduate Programs">
          <div className="wizard-intro">
            Select the graduate programs you have completed or are currently pursuing.
          </div>

          <div className="wizard-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {[
              'Moore Bible College',
              'Queensland Theological Seminary',
              'Ministry Apprentice (MA)',
              'SAIACS - India',
              'Corporate Training',
              'Ministry Training Program',
              'Seminars',
              'Conferences',
              'Empowerment Training'
            ].map((program) => (
              <label key={program} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  name="graduate_programs"
                  value={program}
                  checked={formData.graduate_programs.includes(program)}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    setFormData(prev => ({
                      ...prev,
                      graduate_programs: checked
                        ? [...prev.graduate_programs, value]
                        : prev.graduate_programs.filter(p => p !== value)
                    }));
                  }}
                />
                <span>{program}</span>
              </label>
            ))}
          </div>
          <small style={{ display: "block", marginTop: "10px", color: "rgba(255,255,255,0.7)" }}>
            Select all that apply
          </small>
        </StepCard>
      )}

      {/* ============================================================
          STEP 4: CONTRIBUTION & MEMBERSHIP
          ============================================================ */}
      {step === 4 && (
        <StepCard title="Contribution & Membership">
          <div className="wizard-intro">
            Your partnership helps advance the vision of raising gatekeepers for national transformation.
          </div>

          <h3 className="wizard-section-title">Financial Partnership (Kina)</h3>

          <div className="wizard-grid">
            <div>
              <label>Fortnightly Amount (K)</label>
              <input
                type="number"
                step="0.01"
                name="fortnightly_amount"
                value={formData.fortnightly_amount}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            <div>
              <label>Monthly Amount (K)</label>
              <input
                type="number"
                step="0.01"
                name="monthly_amount"
                value={formData.monthly_amount}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            <div>
              <label>Yearly Amount (K)</label>
              <input
                type="number"
                step="0.01"
                name="yearly_amount"
                value={formData.yearly_amount}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            <div>
              <label>One-time Donation (K)</label>
              <input
                type="number"
                step="0.01"
                name="donation_amount"
                value={formData.donation_amount}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>
          </div>

          <h3 className="wizard-section-title">Membership Type</h3>

          <div className="wizard-grid">
            <div>
              <label>Select Membership Type *</label>
              <select
                name="membership_type"
                value={formData.membership_type}
                onChange={handleChange}
              >
                <option value="">Select Membership</option>
                <option value="Student Member">Student Member - K20/year</option>
                <option value="Graduate Member">Graduate Member - K200/year</option>
                <option value="Life Member">Life Member - K2500 (one-off)</option>
                <option value="Partner">Partner - Open amount</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: "20px", background: "rgba(255,255,255,0.1)", padding: "20px", borderRadius: "12px" }}>
            <h4 style={{ color: "white", marginBottom: "10px" }}>🏦 TSCF Banking Details</h4>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", fontFamily: "monospace" }}>
              Tertiary Students Christian Fellowship
              <br />
              Account: 1000435676 | Bank South Pacific, Boroko Banking Centre
              <br />
              BSB NO: 088-943 | SWIFT CODE: BOSPPGPM
            </p>
          </div>
        </StepCard>
      )}

      {/* ============================================================
          STEP 5: REVIEW & SUBMIT
          ============================================================ */}
      {step === 5 && (
        <StepCard title="Review & Submit">
          <div className="wizard-intro">
            Please review your information before submitting. Once submitted, you will receive a confirmation email.
          </div>

          <div style={{ background: "rgba(255,255,255,0.1)", padding: "16px", borderRadius: "10px", marginBottom: "16px" }}>
            <h4 style={{ color: "white", marginBottom: "10px" }}>📋 Personal Information</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>
              <div><strong>Name:</strong> {formData.surname}, {formData.given_name}</div>
              <div><strong>Institution:</strong> {formData.institution}</div>
              <div><strong>Email:</strong> {formData.email}</div>
              <div><strong>Mobile:</strong> {formData.mobile}</div>
              <div><strong>Province:</strong> {formData.province}</div>
              <div><strong>Country:</strong> {formData.country}</div>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.1)", padding: "16px", borderRadius: "10px", marginBottom: "16px" }}>
            <h4 style={{ color: "white", marginBottom: "10px" }}>🎓 Educational Information</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>
              <div><strong>University:</strong> {formData.college_university}</div>
              <div><strong>Campus:</strong> {formData.campus_location}</div>
              <div><strong>Field of Study:</strong> {formData.field_of_study}</div>
              <div><strong>Year Graduated:</strong> {formData.graduation_year}</div>
              <div><strong>Membership Role:</strong> {formData.membership_role}</div>
              <div><strong>Years in TSCF:</strong> {formData.years_in_tscf}</div>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.1)", padding: "16px", borderRadius: "10px", marginBottom: "16px" }}>
            <h4 style={{ color: "white", marginBottom: "10px" }}>🤝 Membership & Contribution</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>
              <div><strong>Membership Type:</strong> {formData.membership_type || "Not selected"}</div>
              <div><strong>Fortnightly:</strong> K{formData.fortnightly_amount || "0.00"}</div>
              <div><strong>Monthly:</strong> K{formData.monthly_amount || "0.00"}</div>
              <div><strong>Yearly:</strong> K{formData.yearly_amount || "0.00"}</div>
              <div><strong>One-time Donation:</strong> K{formData.donation_amount || "0.00"}</div>
            </div>
          </div>

          <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
            <input
              type="checkbox"
              name="declaration"
              checked={formData.declaration}
              onChange={handleChange}
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
            />
            <label style={{ color: "white", fontSize: "15px", cursor: "pointer" }}>
              I declare that the information provided is true and accurate to the best of my knowledge.
            </label>
          </div>
        </StepCard>
      )}

      {/* ============================================================
          NAVIGATION BUTTONS
          ============================================================ */}
      <div className="wizard-buttons">
        {step > 1 && (
          <button className="secondary-btn" onClick={previousStep}>
            ← Previous
          </button>
        )}

        {step < TOTAL_STEPS && (
          <button className="primary-btn" onClick={nextStep}>
            Next →
          </button>
        )}

        {step === TOTAL_STEPS && (
          <button
            className="primary-btn"
            onClick={() => {
              if (!formData.declaration) {
                alert("Please confirm the declaration before submitting.");
                return;
              }
              alert("🎉 Application submitted successfully! You will receive a confirmation email.");
              console.log("Form submitted:", formData);
            }}
          >
            ✅ Submit Application
          </button>
        )}
      </div>
    </div>
  );
}
