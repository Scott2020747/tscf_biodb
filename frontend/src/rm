import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { 
  FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaGraduationCap, 
  FaMapMarkerAlt, FaDollarSign, FaUsers, FaShieldAlt,
  FaEye, FaEyeSlash, FaTrash, FaHeart, FaLightbulb, FaHandsHelping,
  FaCross, FaUniversity, FaMobileAlt, FaCheckCircle,
  FaTimesCircle, FaClock, FaArrowRight, FaBuilding, FaBookOpen,
  FaPrayingHands
} from 'react-icons/fa';
import { GiHolyGrail } from 'react-icons/gi';

function App() {
  const [formData, setFormData] = useState({
    surname: '', given_name: '', institution: '', dob: '', sex: '', marital_status: '',
    home_province: '', country: 'Papua New Guinea', denomination: '', address: '', 
    phone: '', mobile: '', email: '',
    college_university: '', member_role: '', leader_position: '', year_of_graduation: '', field_of_study: '',
    graduate_program: '', fortnightly_amount: '', monthly_amount: '', yearly_amount: '',
    donation_amount: '', membership_type: '', membership_amount: '', 
    membership_new_renewal: 'New', membership_number: ''
  });
  
  const [members, setMembers] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Premium Color Palette
  const colors = {
    primary: '#0A2540',
    primaryLight: '#1A3A5C',
    secondary: '#2D6A4F',
    accent: '#F4A261',
    accentDark: '#E76F51',
    gold: '#D4AF37',
    white: '#FFFFFF',
    grayLight: '#F8F9FA',
    gray: '#6C757D',
    dark: '#212529',
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('/api/members');
      setMembers(response.data);
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('Failed to fetch members. Check if backend is running.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('/api/members', formData);
      toast.success('Application submitted successfully!');
      setFormData({
        surname: '', given_name: '', institution: '', dob: '', sex: '', marital_status: '',
        home_province: '', country: 'Papua New Guinea', denomination: '', address: '', 
        phone: '', mobile: '', email: '',
        college_university: '', member_role: '', leader_position: '', year_of_graduation: '', field_of_study: '',
        graduate_program: '', fortnightly_amount: '', monthly_amount: '', yearly_amount: '',
        donation_amount: '', membership_type: '', membership_amount: '', 
        membership_new_renewal: 'New', membership_number: ''
      });
      fetchMembers();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Error submitting application. Email may already exist.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/members/${id}/status`, { application_status: status });
      toast.success(`Application ${status}`);
      fetchMembers();
    } catch (err) {
      console.error('Status update error:', err);
      toast.error('Failed to update status');
    }
  };

  const deleteMember = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await axios.delete(`/api/members/${id}`);
        toast.success('Application deleted');
        fetchMembers();
      } catch (err) {
        console.error('Delete error:', err);
        toast.error('Failed to delete');
      }
    }
  };

  const graduatePrograms = [
    'Moore Bible College', 'Queensland Theological Seminary', 'Ministry Apprentice (MA)',
    'SAIACS - India', 'Corporate Training', 'Ministry Training Program', 
    'Seminars', 'Conferences', 'Empowerment Training'
  ];

  const membershipTypes = [
    { type: 'Student Member', amount: 20, icon: FaGraduationCap, color: '#3498db' },
    { type: 'Graduate Member', amount: 200, icon: FaUser, color: '#9b59b6' },
    { type: 'Life Member', amount: 2500, icon: FaHeart, color: '#e74c3c' },
    { type: 'Partner', amount: 0, icon: FaHandsHelping, color: '#f39c12' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return '#10b981';
      case 'rejected': return '#ef4444';
      default: return '#f59e0b';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return <FaCheckCircle />;
      case 'rejected': return <FaTimesCircle />;
      default: return <FaClock />;
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <Toaster position="top-right" />
      
      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
      
      {/* Modern Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 0 60px'
      }}>
        {/* Animated background circles */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, background: 'rgba(255,255,255,0.1)', borderRadius: '50%', animation: 'pulse 3s infinite' }}></div>
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 250, height: 250, background: 'rgba(255,255,255,0.1)', borderRadius: '50%', animation: 'pulse 4s infinite' }}></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-6">
            <div style={{ 
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50px',
              padding: '12px 24px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <FaCross style={{ color: colors.gold }} />
              <span style={{ color: 'white', fontWeight: '500' }}>The Voice of Truth</span>
            </div>
          </div>
          
          <h1 style={{ 
            fontSize: '72px',
            fontWeight: '800',
            color: 'white',
            marginBottom: '16px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            letterSpacing: '-0.02em'
          }}>
            SALT & LIGHT
          </h1>
          
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', marginBottom: '40px' }}>
            Raising gatekeepers for national transformation
          </p>
          
          {/* Vision/Mission/Values Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
            <div style={{ 
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '30px 20px',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <FaLightbulb style={{ color: colors.gold, fontSize: '48px', marginBottom: '20px' }} />
              <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Our Vision</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: '1.6' }}>
                Mobilizing graduates to impact the marketplace and nation towards salvation and transformation
              </p>
            </div>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '30px 20px',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <FaUsers style={{ color: colors.gold, fontSize: '48px', marginBottom: '20px' }} />
              <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Our Mission</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: '1.6' }}>
                Promoting kingdom mindset through divine alignment, strategic alliance, partnership and fellowship
              </p>
            </div>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '30px 20px',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <FaShieldAlt style={{ color: colors.gold, fontSize: '48px', marginBottom: '20px' }} />
              <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Core Values</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: '1.6' }}>
                Truth, Servant Leadership, Integrity, Teamwork, Empowerment, Partnership, Advocacy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ background: 'white', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-2 py-4">
            {['personal', 'education', 'programs', 'membership'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                style={{
                  padding: '12px 28px',
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s',
                  background: activeSection === section ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: activeSection === section ? 'white' : colors.primary,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="container mx-auto px-6 py-12">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: 'white', marginBottom: '16px' }}>
            TSCF VISION PARTNERS FORM 2026
          </h2>
          <div style={{ width: '100px', height: '4px', background: colors.gold, margin: '0 auto', borderRadius: '2px' }}></div>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '16px' }}>Join the movement of graduates transforming nations</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Personal Information */}
          <div id="personal" style={{ 
            background: 'white', 
            borderRadius: '24px', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            marginBottom: '32px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '24px 32px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  background: 'rgba(255,255,255,0.2)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FaUser style={{ color: 'white', fontSize: '28px' }} />
                </div>
                <div>
                  <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>Personal Information</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)' }}>Tell us about yourself</p>
                </div>
              </div>
            </div>
            
            <div style={{ padding: '32px' }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Surname *</label>
                  <input 
                    name="surname" 
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', transition: 'all 0.3s' }}
                    onFocus={(e) => e.target.style.borderColor = colors.accent}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    value={formData.surname} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Given Name *</label>
                  <input 
                    name="given_name" 
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }}
                    value={formData.given_name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Institution</label>
                  <input name="institution" style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }} value={formData.institution} onChange={handleChange} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Date of Birth</label>
                  <input type="date" name="dob" style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }} value={formData.dob} onChange={handleChange} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Sex (Tick)</label>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="radio" name="sex" value="Male" checked={formData.sex === 'Male'} onChange={handleChange} /> Male
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="radio" name="sex" value="Female" checked={formData.sex === 'Female'} onChange={handleChange} /> Female
                    </label>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Marital Status</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><input type="radio" name="marital_status" value="Married" checked={formData.marital_status === 'Married'} onChange={handleChange} /> Married</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><input type="radio" name="marital_status" value="Single" checked={formData.marital_status === 'Single'} onChange={handleChange} /> Single</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><input type="radio" name="marital_status" value="Divorced" checked={formData.marital_status === 'Divorced'} onChange={handleChange} /> Divorced</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><input type="radio" name="marital_status" value="Other" checked={formData.marital_status === 'Other'} onChange={handleChange} /> Other</label>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Home Province</label>
                  <input name="home_province" style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }} value={formData.home_province} onChange={handleChange} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Country</label>
                  <input name="country" style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }} value={formData.country} onChange={handleChange} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Denomination</label>
                  <input name="denomination" style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }} value={formData.denomination} onChange={handleChange} />
                </div>
                <div className="md:col-span-2">
                  <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Address</label>
                  <textarea name="address" rows="2" style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }} value={formData.address} onChange={handleChange}></textarea>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Phone</label>
                  <input name="phone" style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }} value={formData.phone} onChange={handleChange} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Mobile</label>
                  <input name="mobile" style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }} value={formData.mobile} onChange={handleChange} />
                </div>
                <div className="md:col-span-2">
                  <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Email *</label>
                  <input type="email" name="email" style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }} value={formData.email} onChange={handleChange} required />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Educational Information */}
          <div id="education" style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginBottom: '32px', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '24px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FaGraduationCap style={{ color: 'white', fontSize: '28px' }} />
                </div>
                <div>
                  <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>Educational Information</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)' }}>Your academic background</p>
                </div>
              </div>
            </div>
            <div style={{ padding: '32px' }}>
              <div className="space-y-6">
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>College/University attended</label>
                  <input name="college_university" style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }} value={formData.college_university} onChange={handleChange} />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>As a member</label>
                    <input name="member_role" placeholder="Member / Leader" style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }} value={formData.member_role} onChange={handleChange} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>As Leader</label>
                    <input name="leader_position" placeholder="Position held" style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }} value={formData.leader_position} onChange={handleChange} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Year of Graduation</label>
                    <input type="number" name="year_of_graduation" style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }} value={formData.year_of_graduation} onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Field of Study</label>
                  <input name="field_of_study" style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }} value={formData.field_of_study} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Partners Programs */}
          <div id="programs" style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginBottom: '32px', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', padding: '24px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FaPrayingHands style={{ color: 'white', fontSize: '28px' }} />
                </div>
                <div>
                  <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>Partners Programs</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)' }}>Select your ministry track</p>
                </div>
              </div>
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '16px' }}>Graduate Programs (Select one)</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {graduatePrograms.map(program => (
                    <label key={program} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', cursor: 'pointer', background: formData.graduate_program === program ? '#e0e7ff' : 'transparent' }}>
                      <input type="radio" name="graduate_program" value={program} checked={formData.graduate_program === program} onChange={handleChange} />
                      <span>{program}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ background: '#fefce8', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '16px' }}>Financial Partnership (Kina)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><label style={{ fontSize: '12px', color: '#666' }}>Fortnightly</label><input type="number" step="0.01" name="fortnightly_amount" style={{ width: '100%', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '12px' }} placeholder="0.00" value={formData.fortnightly_amount} onChange={handleChange} /></div>
                  <div><label style={{ fontSize: '12px', color: '#666' }}>Monthly</label><input type="number" step="0.01" name="monthly_amount" style={{ width: '100%', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '12px' }} placeholder="0.00" value={formData.monthly_amount} onChange={handleChange} /></div>
                  <div><label style={{ fontSize: '12px', color: '#666' }}>Yearly</label><input type="number" step="0.01" name="yearly_amount" style={{ width: '100%', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '12px' }} placeholder="0.00" value={formData.yearly_amount} onChange={handleChange} /></div>
                  <div><label style={{ fontSize: '12px', color: '#666' }}>One-time Donation</label><input type="number" step="0.01" name="donation_amount" style={{ width: '100%', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '12px' }} placeholder="0.00" value={formData.donation_amount} onChange={handleChange} /></div>
                </div>
              </div>

              <div style={{ background: '#ecfdf5', borderRadius: '16px', padding: '24px', borderLeft: `4px solid ${colors.gold}` }}>
                <p style={{ fontWeight: 'bold', color: colors.primary, marginBottom: '8px' }}>🏦 TSCF Banking Details</p>
                <p style={{ fontSize: '14px', fontFamily: 'monospace' }}>Tertiary Students Christian Fellowship</p>
                <p style={{ fontSize: '14px', fontFamily: 'monospace' }}>Account: 1000435676 | Bank South Pacific, Boroko Banking Centre</p>
                <p style={{ fontSize: '14px', fontFamily: 'monospace' }}>BSB NO: 088-943 | SWIFT CODE: BOSPPGPM</p>
              </div>
            </div>
          </div>

          {/* Section 4: Membership */}
          <div id="membership" style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginBottom: '32px', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', padding: '24px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FaHeart style={{ color: 'white', fontSize: '28px' }} />
                </div>
                <div>
                  <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>Membership Type</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)' }}>Choose your partnership level</p>
                </div>
              </div>
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '32px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="radio" name="membership_new_renewal" value="New" checked={formData.membership_new_renewal === 'New'} onChange={handleChange} /> <span style={{ fontWeight: '600' }}>New Application</span></label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="radio" name="membership_new_renewal" value="Renewal" checked={formData.membership_new_renewal === 'Renewal'} onChange={handleChange} /> <span style={{ fontWeight: '600' }}>Renewal</span></label>
                {formData.membership_new_renewal === 'Renewal' && (
                  <input name="membership_number" placeholder="Membership No." style={{ padding: '8px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', width: '200px' }} value={formData.membership_number} onChange={handleChange} />
                )}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {membershipTypes.map((mt, idx) => (
                  <div
                    key={idx}
                    onClick={() => setFormData({ ...formData, membership_type: mt.type })}
                    style={{
                      cursor: 'pointer',
                      border: formData.membership_type === mt.type ? `2px solid ${colors.gold}` : '2px solid #e5e7eb',
                      borderRadius: '16px',
                      padding: '24px',
                      textAlign: 'center',
                      transition: 'all 0.3s',
                      background: formData.membership_type === mt.type ? 'linear-gradient(135deg, #667eea10, #764ba210)' : 'white',
                      transform: hoveredCard === idx ? 'translateY(-8px)' : 'translateY(0)'
                    }}
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <mt.icon style={{ color: mt.color, fontSize: '48px', marginBottom: '16px' }} />
                    <h4 style={{ fontWeight: 'bold', color: colors.primary, marginBottom: '8px' }}>{mt.type}</h4>
                    {mt.amount > 0 && <p style={{ fontSize: '28px', fontWeight: 'bold', color: colors.gold, marginBottom: '8px' }}>K{mt.amount}</p>}
                    <input type="radio" name="membership_type" value={mt.type} checked={formData.membership_type === mt.type} onChange={handleChange} style={{ marginTop: '12px' }} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', color: colors.primary, marginBottom: '8px' }}>Custom Amount (Kina)</label>
                <input type="number" step="0.01" name="membership_amount" style={{ width: '250px', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '12px' }} placeholder="Enter custom amount" value={formData.membership_amount} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 'bold',
                padding: '16px 48px',
                borderRadius: '50px',
                fontSize: '18px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'} <FaArrowRight style={{ display: 'inline', marginLeft: '8px' }} />
            </button>
          </div>
        </form>

        {/* Admin Panel */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {showAdmin ? <><FaEyeSlash style={{ display: 'inline', marginRight: '8px' }} />Hide Admin Panel</> : <><FaEye style={{ display: 'inline', marginRight: '8px' }} />Show Admin Panel</>}
          </button>
        </div>

        {showAdmin && (
          <div style={{ background: 'white', borderRadius: '24px', padding: '32px', marginTop: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: colors.primary }}>Admin Dashboard</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>ID</th><th style={{ padding: '12px', textAlign: 'left' }}>Name</th><th style={{ padding: '12px', textAlign: 'left' }}>Email</th><th style={{ padding: '12px', textAlign: 'left' }}>Membership</th><th style={{ padding: '12px', textAlign: 'left' }}>Status</th><th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(member => (
                    <tr key={member.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px' }}>{member.id}</td>
                      <td style={{ padding: '12px' }}>{member.surname}, {member.given_name}</td>
                      <td style={{ padding: '12px' }}>{member.email}</td>
                      <td style={{ padding: '12px' }}>{member.membership_type || 'N/A'}</td>
                      <td style={{ padding: '12px' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: `${getStatusColor(member.application_status)}20`, color: getStatusColor(member.application_status), padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>{getStatusIcon(member.application_status)} {member.application_status}</span></td>
                      <td style={{ padding: '12px' }}>
                        <select onChange={(e) => updateStatus(member.id, e.target.value)} value={member.application_status} style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #ddd', marginRight: '8px' }}>
                          <option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option>
                        </select>
                        <button onClick={() => deleteMember(member.id)} style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ background: '#0A2540', color: 'white', marginTop: '64px', padding: '48px 0 24px' }}>
        <div className="container mx-auto px-6 text-center">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
            <FaCross style={{ color: colors.gold }} />
            <span style={{ fontWeight: '600' }}>Tertiary Students Christian Fellowship</span>
          </div>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>P. O. Box 6329 Port Boroko, National Capital District</p>
          <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '16px' }}>Mobile: 73277901</p>
          <p style={{ fontSize: '14px' }}>TSCF Vision Partners Application Form 2026</p>
          <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '16px' }}>&copy; Tertiary Students Christian Fellowship 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
