import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Heart,
  MapPin,
  Phone,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Droplet,
  Send,
  Filter,
  Plus
} from "lucide-react";
import "../styles/BloodRequest.css";

function BloodRequest({ donors, requests, setRequests }) {
  const [activeTab, setActiveTab] = useState('search');
  const [searchData, setSearchData] = useState({ bloodGroup: "", location: "" });
  const [requestData, setRequestData] = useState({
    patientName: "",
    bloodGroup: "",
    phone: "",
    location: "",
    urgency: "Normal",
    hospital: "",
    additionalNotes: ""
  });
  const [matched, setMatched] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleRequestChange = (e) => {
    setRequestData({ ...requestData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!searchData.bloodGroup) {
      setMessage("Please select a blood group before searching.");
      setMatched([]);
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append("bloodGroup", searchData.bloodGroup);
      if (searchData.location) {
        params.append("location", searchData.location);
      }

      const response = await fetch(`/api/donors/search/match?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to search donors");
      }

      const result = await response.json();
      setMatched(result);
      setMessage(result.length > 0
        ? `Found ${result.length} donor(s) available for ${searchData.bloodGroup}${searchData.location ? ` in ${searchData.location}` : ''}!`
        : `No donors found for ${searchData.bloodGroup}${searchData.location ? ` in ${searchData.location}` : ''}. Consider submitting a request.`
      );
    } catch (error) {
      setMessage("Error searching for donors. Please try again.");
      setMatched([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!requestData.patientName || !requestData.bloodGroup || !requestData.phone || !requestData.location) {
      setMessage("Please fill all required fields before sending your request.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message || "Unable to submit request.");
      }

      const savedRequest = await response.json();
      setRequests((prev) => [savedRequest, ...prev]);
      setMessage("Blood request submitted successfully! Our AI system is now matching you with available donors.");
      setRequestData({
        patientName: "",
        bloodGroup: "",
        phone: "",
        location: "",
        urgency: "Normal",
        hospital: "",
        additionalNotes: ""
      });
    } catch (error) {
      setMessage(error.message);
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

  const urgencyColors = {
    Normal: { bg: 'rgba(76, 175, 80, 0.1)', color: '#4caf50', icon: Clock },
    Urgent: { bg: 'rgba(255, 152, 0, 0.1)', color: '#ff9800', icon: AlertTriangle },
    Critical: { bg: 'rgba(244, 67, 54, 0.1)', color: '#f44336', icon: AlertTriangle }
  };

  return (
    <motion.div
      className="blood-request-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div
        className="request-header"
        variants={itemVariants}
      >
        <div className="header-content">
          <Heart size={40} className="header-icon" />
          <div>
            <h1>Blood Request Center</h1>
            <p>Find available donors or submit a blood request</p>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="request-tabs"
        variants={itemVariants}
      >
        <button
          className={`tab-btn ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          <Search size={18} />
          Find Donors
        </button>
        <button
          className={`tab-btn ${activeTab === 'request' ? 'active' : ''}`}
          onClick={() => setActiveTab('request')}
        >
          <Plus size={18} />
          New Request
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <Clock size={18} />
          Recent Requests
        </button>
      </motion.div>

      {/* Search Tab */}
      {activeTab === 'search' && (
        <motion.div
          className="tab-content"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <div className="search-section">
            <h2>Find Available Donors</h2>
            <p>Search for blood donors in your area</p>

            <form onSubmit={handleSearch} className="search-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Blood Group</label>
                  <div className="input-wrapper">
                    <Droplet size={20} className="input-icon" />
                    <select
                      name="bloodGroup"
                      value={searchData.bloodGroup}
                      onChange={handleSearchChange}
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
                  <label>Location (Optional)</label>
                  <div className="input-wrapper">
                    <MapPin size={20} className="input-icon" />
                    <input
                      type="text"
                      name="location"
                      placeholder="Enter city or area"
                      value={searchData.location}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                className="search-btn"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <>
                    <Search size={18} />
                    Search Donors
                  </>
                )}
              </motion.button>
            </form>

            {message && (
              <motion.div
                className={`message ${matched.length > 0 ? 'success' : 'info'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {matched.length > 0 ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                {message}
              </motion.div>
            )}

            {matched.length > 0 && (
              <div className="matched-donors">
                <h3>Available Donors ({matched.length})</h3>
                <div className="donors-grid">
                  {matched.map((donor) => (
                    <motion.div
                      key={donor._id || donor.id}
                      className="donor-card"
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="donor-header">
                        <div className="donor-avatar">
                          <Users size={24} />
                        </div>
                        <div className="donor-info">
                          <h4>{donor.name}</h4>
                          <span className="blood-type">{donor.bloodGroup}</span>
                        </div>
                      </div>
                      <div className="donor-details">
                        <div className="detail-item">
                          <MapPin size={16} />
                          <span>{donor.location}</span>
                        </div>
                        <div className="detail-item">
                          <Phone size={16} />
                          <span>{donor.phone}</span>
                        </div>
                      </div>
                      <motion.button
                        className="contact-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Phone size={16} />
                        Contact Donor
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Request Tab */}
      {activeTab === 'request' && (
        <motion.div
          className="tab-content"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <div className="request-section">
            <h2>Submit Blood Request</h2>
            <p>Fill in the details to create a new blood request</p>

            <form onSubmit={handleRequestSubmit} className="request-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Patient Name *</label>
                  <div className="input-wrapper">
                    <Users size={20} className="input-icon" />
                    <input
                      type="text"
                      name="patientName"
                      placeholder="Enter patient name"
                      value={requestData.patientName}
                      onChange={handleRequestChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Required Blood Group *</label>
                  <div className="input-wrapper">
                    <Droplet size={20} className="input-icon" />
                    <select
                      name="bloodGroup"
                      value={requestData.bloodGroup}
                      onChange={handleRequestChange}
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
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Contact Phone *</label>
                  <div className="input-wrapper">
                    <Phone size={20} className="input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter 10-digit phone number"
                      value={requestData.phone}
                      onChange={(e) => setRequestData({
                        ...requestData,
                        phone: e.target.value.replace(/\D/g, "").slice(0, 10)
                      })}
                      maxLength={10}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Urgency Level</label>
                  <div className="input-wrapper">
                    <select
                      name="urgency"
                      value={requestData.urgency}
                      onChange={handleRequestChange}
                    >
                      <option value="Normal">Normal</option>
                      <option value="Urgent">Urgent</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Patient Location *</label>
                <div className="input-wrapper">
                  <MapPin size={20} className="input-icon" />
                  <input
                    type="text"
                    name="location"
                    placeholder="Hospital or patient location"
                    value={requestData.location}
                    onChange={handleRequestChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Hospital Name (Optional)</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="hospital"
                    placeholder="Enter hospital name"
                    value={requestData.hospital}
                    onChange={handleRequestChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Additional Notes (Optional)</label>
                <div className="input-wrapper">
                  <textarea
                    name="additionalNotes"
                    placeholder="Any additional information about the patient or request..."
                    value={requestData.additionalNotes}
                    onChange={handleRequestChange}
                    rows={3}
                  />
                </div>
              </div>

              {message && (
                <motion.div
                  className={`message ${message.includes('successfully') ? 'success' : 'error'}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.includes('successfully') ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                  {message}
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="submit-btn"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Blood Request
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <motion.div
          className="tab-content"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <div className="history-section">
            <h2>Recent Blood Requests</h2>
            <p>Track the status of recent blood requests</p>

            {requests.length === 0 ? (
              <div className="empty-state">
                <Heart size={48} className="empty-icon" />
                <h3>No requests yet</h3>
                <p>Submit your first blood request to get started</p>
              </div>
            ) : (
              <div className="requests-list">
                {requests.slice(0, 10).map((request) => {
                  const UrgencyIcon = urgencyColors[request.urgency]?.icon || Clock;
                  const urgencyStyle = urgencyColors[request.urgency] || urgencyColors.Normal;

                  return (
                    <motion.div
                      key={request._id || request.id}
                      className="request-card"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="request-header">
                        <div className="request-info">
                          <h4>{request.patientName}</h4>
                          <span className="blood-type">{request.bloodGroup}</span>
                          <span
                            className="urgency-badge"
                            style={{
                              backgroundColor: urgencyStyle.bg,
                              color: urgencyStyle.color
                            }}
                          >
                            <UrgencyIcon size={14} />
                            {request.urgency}
                          </span>
                        </div>
                        <div className="request-time">
                          <Clock size={16} />
                          <span>{new Date(request.createdAt || Date.now()).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="request-details">
                        <div className="detail-item">
                          <MapPin size={16} />
                          <span>{request.location}</span>
                        </div>
                        <div className="detail-item">
                          <Phone size={16} />
                          <span>{request.phone}</span>
                        </div>
                        {request.hospital && (
                          <div className="detail-item">
                            <span>🏥 {request.hospital}</span>
                          </div>
                        )}
                      </div>

                      <div className="request-status">
                        <span className={`status-badge ${request.status?.toLowerCase() || 'pending'}`}>
                          {request.status || 'Pending'}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default BloodRequest;
