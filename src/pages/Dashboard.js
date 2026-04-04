import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Heart,
  Activity,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  Eye,
  Edit,
  Plus
} from "lucide-react";
import "../styles/Dashboard.css";

function Dashboard({ donors, requests, user, loading }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dashboardData, setDashboardData] = useState({
    totalDonors: 0,
    totalRequests: 0,
    myDonations: 0,
    livesSaved: 0,
    recentActivity: [],
    bloodStock: {}
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [donorsRes, requestsRes] = await Promise.all([
        fetch('/api/donors'),
        fetch('/api/requests')
      ]);

      const donorsData = donorsRes.ok ? await donorsRes.json() : [];
      const requestsData = requestsRes.ok ? await requestsRes.json() : [];

      // Calculate blood stock levels
      const bloodStock = {};
      donorsData.forEach(donor => {
        if (donor.bloodGroup) {
          bloodStock[donor.bloodGroup] = (bloodStock[donor.bloodGroup] || 0) + 1;
        }
      });

      // Mock recent activity (in real app, this would come from API)
      const recentActivity = [
        { id: 1, type: 'donation', message: 'You donated blood to City Hospital', time: '2 hours ago', status: 'completed' },
        { id: 2, type: 'request', message: 'Blood request fulfilled for Apollo Hospital', time: '1 day ago', status: 'completed' },
        { id: 3, type: 'alert', message: 'Emergency blood needed at Max Hospital', time: '3 days ago', status: 'urgent' }
      ];

      setDashboardData({
        totalDonors: donorsData.length,
        totalRequests: requestsData.length,
        myDonations: Math.floor(Math.random() * 10) + 1, // Mock data
        livesSaved: Math.floor(Math.random() * 50) + 10, // Mock data
        recentActivity,
        bloodStock
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bloodhub_user');
    navigate('/');
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

  const stats = [
    {
      icon: <User size={24} />,
      title: "Total Donors",
      value: dashboardData.totalDonors,
      color: "#2196F3",
      change: "+12%"
    },
    {
      icon: <Heart size={24} />,
      title: "Blood Requests",
      value: dashboardData.totalRequests,
      color: "#E91E63",
      change: "+8%"
    },
    {
      icon: <Award size={24} />,
      title: "My Donations",
      value: dashboardData.myDonations,
      color: "#4CAF50",
      change: "+2"
    },
    {
      icon: <Activity size={24} />,
      title: "Lives Saved",
      value: dashboardData.livesSaved,
      color: "#FF9800",
      change: "+5"
    }
  ];

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'all' || donor.bloodGroup === filterType;

    return matchesSearch && matchesFilter;
  });

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'all' || request.bloodGroup === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div
      className="dashboard"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div
        className="dashboard-header"
        variants={itemVariants}
      >
        <div className="header-content">
          <div className="header-left">
            <h1>Dashboard</h1>
            <p>Welcome back{user?.name ? `, ${user.name}` : user?.phone ? `, ${user.phone}` : ""}!</p>
          </div>
          <div className="header-right">
            <motion.button
              className="header-btn notification"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </motion.button>
            <motion.button
              className="header-btn settings"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings size={20} />
            </motion.button>
            <motion.button
              className="header-btn logout"
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="stats-grid"
        variants={containerVariants}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              <span className="stat-change">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <motion.div
          className="dashboard-sidebar"
          variants={itemVariants}
        >
          <div className="sidebar-tabs">
            <button
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Activity size={18} />
              Overview
            </button>
            <button
              className={`tab-btn ${activeTab === 'donors' ? 'active' : ''}`}
              onClick={() => setActiveTab('donors')}
            >
              <User size={18} />
              Donors
            </button>
            <button
              className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
              onClick={() => setActiveTab('requests')}
            >
              <Heart size={18} />
              Requests
            </button>
            <button
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <Settings size={18} />
              Profile
            </button>
          </div>
        </motion.div>

        {/* Main Panel */}
        <motion.div
          className="dashboard-main"
          variants={itemVariants}
        >
          {activeTab === 'overview' && (
            <div className="overview-content">
              {/* Recent Activity */}
              <motion.div
                className="activity-section"
                variants={itemVariants}
              >
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  {dashboardData.recentActivity.map((activity) => (
                    <motion.div
                      key={activity.id}
                      className={`activity-item ${activity.status}`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="activity-icon">
                        {activity.type === 'donation' && <Heart size={20} />}
                        {activity.type === 'request' && <User size={20} />}
                        {activity.type === 'alert' && <Bell size={20} />}
                      </div>
                      <div className="activity-content">
                        <p>{activity.message}</p>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                      <div className={`activity-status ${activity.status}`}>
                        {activity.status}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Blood Stock Levels */}
              <motion.div
                className="stock-section"
                variants={itemVariants}
              >
                <h2>Blood Stock Levels</h2>
                <div className="stock-grid">
                  {Object.entries(dashboardData.bloodStock).map(([type, count]) => (
                    <motion.div
                      key={type}
                      className="stock-item"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="stock-type">{type}</div>
                      <div className="stock-count">{count}</div>
                      <div className="stock-bar">
                        <div
                          className="stock-fill"
                          style={{
                            width: `${Math.min((count / 10) * 100, 100)}%`,
                            backgroundColor: count < 3 ? '#f44336' : count < 5 ? '#ff9800' : '#4caf50'
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'donors' && (
            <div className="donors-content">
              <div className="content-header">
                <h2>Donor Directory</h2>
                <div className="content-actions">
                  <div className="search-bar">
                    <Search size={18} />
                    <input
                      type="text"
                      placeholder="Search donors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Blood Types</option>
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

              <div className="donors-grid">
                {filteredDonors.map((donor) => (
                  <motion.div
                    key={donor._id || donor.id}
                    className="donor-card"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="donor-header">
                      <div className="donor-avatar">
                        <User size={24} />
                      </div>
                      <div className="donor-info">
                        <h3>{donor.name}</h3>
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
                    <div className="donor-actions">
                      <motion.button
                        className="action-btn contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Phone size={16} />
                        Contact
                      </motion.button>
                      <motion.button
                        className="action-btn view"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye size={16} />
                        View Profile
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="requests-content">
              <div className="content-header">
                <h2>Blood Requests</h2>
                <motion.button
                  className="add-request-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/request')}
                >
                  <Plus size={18} />
                  New Request
                </motion.button>
              </div>

              <div className="requests-list">
                {filteredRequests.map((request) => (
                  <motion.div
                    key={request._id || request.id}
                    className="request-card"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="request-header">
                      <div className="request-info">
                        <h3>{request.patientName}</h3>
                        <span className="blood-type">{request.bloodGroup}</span>
                        <span className={`urgency ${request.urgency?.toLowerCase()}`}>
                          {request.urgency}
                        </span>
                      </div>
                      <div className="request-time">
                        <Calendar size={16} />
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
                    </div>
                    <div className="request-actions">
                      <motion.button
                        className="action-btn donate"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart size={16} />
                        Donate Blood
                      </motion.button>
                      <motion.button
                        className="action-btn contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Phone size={16} />
                        Contact
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile-content">
              <motion.div
                className="profile-card"
                variants={itemVariants}
              >
                <div className="profile-header">
                  <div className="profile-avatar">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="Profile" />
                    ) : (
                      <User size={48} />
                    )}
                  </div>
                  <div className="profile-info">
                    <h2>{user?.name || user?.phone || 'User'}</h2>
                    <p>{user?.email || 'No email provided'}</p>
                  </div>
                </div>

                <div className="profile-details">
                  <div className="detail-row">
                    <Mail size={18} />
                    <span>{user?.email || 'Not provided'}</span>
                  </div>
                  <div className="detail-row">
                    <Phone size={18} />
                    <span>{user?.phone || 'Not provided'}</span>
                  </div>
                  <div className="detail-row">
                    <Calendar size={18} />
                    <span>Member since {new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="profile-actions">
                  <motion.button
                    className="profile-btn edit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit size={18} />
                    Edit Profile
                  </motion.button>
                  <motion.button
                    className="profile-btn settings"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Settings size={18} />
                    Account Settings
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
