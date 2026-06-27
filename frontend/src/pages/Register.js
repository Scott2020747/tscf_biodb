import React, { useState } from "react";
import axios from "axios";

export default function Register() {

  const [formData, setFormData] = useState({
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

    college_university: "",
    membership_role: "",
    leadership_role: "",
    year_graduated: "",
    field_of_study: "",

    graduate_programs: [],

    fortnightly_amount: "",
    monthly_amount: "",
    yearly_amount: "",
    donation_amount: "",

    membership_type: "",

    declaration: false
  });

  const programs = [
    "Moore Bible College",
    "Queensland Theological Seminary",
    "Ministry Apprentice",
    "SAIACS India",
    "Corporate Training",
    "Ministry Training Program",
    "Seminars",
    "Conferences",
    "Empowerment Training"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleProgramChange = (program) => {

    const exists =
      formData.graduate_programs.includes(program);

    if (exists) {
      setFormData({
        ...formData,
        graduate_programs:
          formData.graduate_programs.filter(
            (p) => p !== program
          )
      });
    } else {
      setFormData({
        ...formData,
        graduate_programs: [
          ...formData.graduate_programs,
          program
        ]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/members",
        formData
      );

      alert(
        "Application submitted successfully."
      );

      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Failed to submit application.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">

      <div className="glass rounded-3xl p-10 shadow-2xl">

        <h1 className="text-5xl font-bold text-center text-white mb-2">
          TSCF Vision Partners
        </h1>

        <p className="text-center text-white mb-10">
          Register as a Vision Partner
        </p>

        <form onSubmit={handleSubmit}>

          {/* GENERAL INFORMATION */}

          <div className="mb-10">

            <h2 className="text-2xl font-bold text-white mb-6">
              General Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              />

              <input
                type="text"
                name="given_name"
                placeholder="Given Name"
                value={formData.given_name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              />

              <input
                type="text"
                name="institution"
                placeholder="Institution"
                value={formData.institution}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              />

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              />

              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              >
                <option value="">Sex</option>
                <option>Male</option>
                <option>Female</option>
              </select>

              <select
                name="marital_status"
                value={formData.marital_status}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              >
                <option value="">Marital Status</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
                <option>Other</option>
              </select>

              <input
                type="text"
                name="province"
                placeholder="Home Province"
                value={formData.province}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              />

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              />

              <input
                type="text"
                name="denomination"
                placeholder="Denomination"
                value={formData.denomination}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              />

              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              />

            </div>

            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 rounded-lg mt-4"
            />

          </div>

          {/* EDUCATION */}

          <div className="mb-10">

            <h2 className="text-2xl font-bold text-white mb-6">
              Educational Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                name="college_university"
                placeholder="College / University"
                value={formData.college_university}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              />

              <input
                type="text"
                name="membership_role"
                placeholder="Membership Role"
                value={formData.membership_role}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              />

              <input
                type="text"
                name="leadership_role"
                placeholder="Leadership Role"
                value={formData.leadership_role}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              />

              <input
                type="number"
                name="year_graduated"
                placeholder="Year Graduated"
                value={formData.year_graduated}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              />

              <input
                type="text"
                name="field_of_study"
                placeholder="Field Of Study"
                value={formData.field_of_study}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              />

            </div>

          </div>

          {/* PROGRAMS */}

          <div className="mb-10">

            <h2 className="text-2xl font-bold text-white mb-6">
              Graduate Programs
            </h2>

            <div className="grid md:grid-cols-3 gap-3">

              {programs.map((program) => (
                <label
                  key={program}
                  className="text-white flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={formData.graduate_programs.includes(program)}
                    onChange={() =>
                      handleProgramChange(program)
                    }
                  />
                  {program}
                </label>
              ))}

            </div>

          </div>

          {/* CONTRIBUTIONS */}

          <div className="mb-10">

            <h2 className="text-2xl font-bold text-white mb-6">
              Partner Contributions
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input type="number" name="fortnightly_amount" placeholder="Fortnightly Amount" onChange={handleChange} className="w-full p-3 rounded-lg"/>

              <input type="number" name="monthly_amount" placeholder="Monthly Amount" onChange={handleChange} className="w-full p-3 rounded-lg"/>

              <input type="number" name="yearly_amount" placeholder="Yearly Amount" onChange={handleChange} className="w-full p-3 rounded-lg"/>

              <input type="number" name="donation_amount" placeholder="Donation Amount" onChange={handleChange} className="w-full p-3 rounded-lg"/>

            </div>

          </div>

          {/* MEMBERSHIP */}

          <div className="mb-10">

            <h2 className="text-2xl font-bold text-white mb-6">
              Membership Type
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-white">

              <label><input type="radio" name="membership_type" value="Student Member" onChange={handleChange}/> Student Member (K20)</label>

              <label><input type="radio" name="membership_type" value="Graduate Member" onChange={handleChange}/> Graduate Member (K200)</label>

              <label><input type="radio" name="membership_type" value="Life Member" onChange={handleChange}/> Life Member (K2500)</label>

              <label><input type="radio" name="membership_type" value="Partner" onChange={handleChange}/> Partner</label>

            </div>

          </div>

          {/* DECLARATION */}

          <div className="mb-8">

            <label className="text-white flex gap-2">

              <input
                type="checkbox"
                name="declaration"
                checked={formData.declaration}
                onChange={handleChange}
              />

              I confirm the information provided is accurate.

            </label>

          </div>

          <button
            type="submit"
            className="
              bg-white
              text-blue-700
              font-bold
              px-10
              py-4
              rounded-full
              shadow-lg
              hover:scale-105
              transition
            "
          >
            Submit Application
          </button>

        </form>

      </div>

    </div>
  );
}
