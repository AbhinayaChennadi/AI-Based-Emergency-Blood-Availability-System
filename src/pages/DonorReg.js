import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  User,
  Phone,
  MapPin,
  Droplet,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Shield,
  Award,
  Users
} from "lucide-react";
import "../styles/DonorReg.css";

function DonorReg({ setDonors }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    bloodType: "",
    phone: "",
    location: "",
    age: "",
    gender: "",
    medicalHistory: "",
    availability: true
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError("Full name is required.");
      return false;
    }
    if (!formData.age || formData.age < 18 || formData.age > 65) {
      setError("Age must be between 18 and 65 years.");
      return false;
    }
    if (!formData.gender) {
      setError("Please select your gender.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.bloodType) {
      setError("Blood group is required.");
      return false;
    }
    if (!formData.phone || formData.phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }
    if (!formData.location.trim()) {
      setError("Location is required.");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setLoading(true);
    setError("");

    const donorPayload = {
      name: formData.name.trim(),
      bloodGroup: formData.bloodType,
      phone: formData.phone,
      location: formData.location.trim(),
      age: parseInt(formData.age),
      gender: formData.gender,
      medicalHistory: formData.medicalHistory || "None",
      availability: formData.availability,
      registeredAt: new Date().toISOString()
    };

    try {
      const response = await fetch("/api/donors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donorPayload),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message || "Registration failed.");
      }

      const donor = await response.json();
      setDonors((prev) => [donor, ...prev]);

      // Success animation and redirect
      setTimeout(() => {
        alert(`Thank you ${donor.name}! Your donor record is registered successfully.`);
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      setError(err.message || "Unable to register donor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const benefits = [
    {
      icon: <Heart size={24} />,
      title: "Save Lives",
      description: "Your donation can save up to 3 lives"
    },
    {
      icon: <Shield size={24} />,
      title: "Health Check",
      description: "Free health screening with every donation"
    },
    {
      icon: <Award size={24} />,
      title: "Recognition",
      description: "Get certificates and community recognition"
    },
    {
      icon: <Users size={24} />,
      title: "Community",
      description: "Join a network of life-saving heroes"
    }
  ];

  return (
    <motion.div
      className="donor-reg-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Side - Benefits */}
      <motion.div
        className="donor-reg-left"
        variants={itemVariants}
      >
        <div className="brand-section">
          <motion.div
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Heart size={40} className="logo-icon" />
            <span className="logo-text">BloodHub</span>
          </motion.div>
          <h1 className="brand-title">Become a Blood Donor</h1>
          <p className="brand-subtitle">
            Join thousands of heroes who save lives every day. Your donation matters and creates ripples of hope in our community.
          </p>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="benefit-card"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="benefit-icon">
                {benefit.icon}
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Lives Saved</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Active Donors</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Emergency Support</span>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Registration Form */}
      <motion.div
        className="donor-reg-right"
        variants={itemVariants}
      >
        <div className="form-container">
          <motion.div
            className="form-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="step-indicator">
              <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                <span className="step-number">1</span>
                <span className="step-label">Personal Info</span>
              </div>
              <div className="step-line"></div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                <span className="step-number">2</span>
                <span className="step-label">Contact & Blood</span>
              </div>
            </div>
            <h2>Donor Registration</h2>
            <p>Fill in your details to start saving lives</p>
          </motion.div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                className="form-step"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <User size={20} className="input-icon" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Age</label>
                    <div className="input-wrapper">
                      <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        min="18"
                        max="65"
                        value={formData.age}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Gender</label>
                    <div className="input-wrapper">
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Medical History (Optional)</label>
                  <div className="input-wrapper">
                    <textarea
                      name="medicalHistory"
                      placeholder="Any medical conditions, medications, or relevant health information..."
                      value={formData.medicalHistory}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Contact & Blood Information */}
            {currentStep === 2 && (
              <motion.div
                className="form-step"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <div className="form-group">
                  <label>Blood Group</label>
                  <div className="input-wrapper">
                    <Droplet size={20} className="input-icon" />
                    <select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="input-wrapper">
                    <Phone size={20} className="input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter 10-digit phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        phone: e.target.value.replace(/\D/g, "").slice(0, 10)
                      })}
                      maxLength={10}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <div className="input-wrapper">
                    <MapPin size={20} className="input-icon" />
                    <input
                      type="text"
                      name="location"
                      placeholder="City / Location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="availability-toggle">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={formData.availability}
                      onChange={(e) => setFormData({
                        ...formData,
                        availability: e.target.checked
                      })}
                    />
                    <span className="toggle-slider"></span>
                    Available for emergency donations
                  </label>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            <div className="form-actions">
              {currentStep === 2 && (
                <motion.button
                  type="button"
                  className="form-btn secondary"
                  onClick={prevStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Previous
                </motion.button>
              )}

              {currentStep === 1 ? (
                <motion.button
                  type="button"
                  className="form-btn primary"
                  onClick={nextStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                  <ArrowRight size={18} />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  className="form-btn primary"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                      Register as Donor
                      <CheckCircle size={18} />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>

          <p className="form-terms">
            By registering, you agree to our{" "}
            <a href="#" className="terms-link">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="terms-link">Privacy Policy</a>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DonorReg;
