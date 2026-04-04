import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Search,
  Bell,
  BarChart3,
  Shield,
  Users,
  Heart,
  Clock,
  MapPin,
  Smartphone,
  Award
} from "lucide-react";
import "../styles/Features.css";

function Features() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: <Search size={32} />,
      title: "Smart Blood Matching",
      description: "AI algorithms instantly match blood types with compatible donors in your area.",
      color: "#2196F3"
    },
    {
      icon: <Bell size={32} />,
      title: "Instant Notifications",
      description: "Get real-time alerts when blood is needed. Never miss a chance to save a life.",
      color: "#FF9800"
    },
    {
      icon: <MapPin size={32} />,
      title: "Location-Based Search",
      description: "Find donors and blood banks within your city or emergency radius.",
      color: "#4CAF50"
    },
    {
      icon: <Clock size={32} />,
      title: "24/7 Emergency Response",
      description: "Round-the-clock support for critical blood requirements and emergencies.",
      color: "#E91E63"
    },
    {
      icon: <Shield size={32} />,
      title: "Verified & Secure",
      description: "All donors are medically verified with secure data encryption.",
      color: "#9C27B0"
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Analytics Dashboard",
      description: "Track donation impact, hospital needs, and community health trends.",
      color: "#607D8B"
    },
    {
      icon: <Smartphone size={32} />,
      title: "Mobile App Access",
      description: "Manage donations, requests, and notifications from your smartphone.",
      color: "#00BCD4"
    },
    {
      icon: <Award size={32} />,
      title: "Donor Recognition",
      description: "Earn badges and certificates for your life-saving contributions.",
      color: "#FF5722"
    },
    {
      icon: <Users size={32} />,
      title: "Community Network",
      description: "Connect with fellow donors and healthcare professionals nationwide.",
      color: "#795548"
    },
    {
      icon: <Heart size={32} />,
      title: "Impact Tracking",
      description: "See how your donations directly contribute to saving lives.",
      color: "#F44336"
    }
  ];

  return (
    <motion.section
      className="features-section"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div
        className="features-header"
        variants={itemVariants}
      >
        <motion.div
          className="section-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Award size={16} />
          <span>Advanced Features</span>
        </motion.div>

        <motion.h2
          className="section-title"
          variants={itemVariants}
        >
          Why Choose
          <motion.span
            className="highlight"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            BloodHub
          </motion.span>
          ?
        </motion.h2>

        <motion.p
          className="section-description"
          variants={itemVariants}
        >
          Experience the future of blood donation with our comprehensive platform
          designed to maximize efficiency and life-saving impact.
        </motion.p>
      </motion.div>

      <motion.div
        className="features-grid"
        variants={containerVariants}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              y: -10,
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="feature-icon-wrapper"
              style={{ backgroundColor: `${feature.color}15` }}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="feature-icon"
                style={{ color: feature.color }}
              >
                {feature.icon}
              </div>
            </motion.div>

            <motion.h3
              className="feature-title"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.05 }}
            >
              {feature.title}
            </motion.h3>

            <motion.p
              className="feature-description"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.0 + index * 0.05 }}
            >
              {feature.description}
            </motion.p>

            <motion.div
              className="feature-hover-effect"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="features-stats"
        variants={itemVariants}
      >
        <motion.div
          className="stat-box"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="stat-number">99.9%</div>
          <div className="stat-label">Uptime</div>
        </motion.div>

        <motion.div
          className="stat-box"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="stat-number">&lt;30s</div>
          <div className="stat-label">Response Time</div>
        </motion.div>

        <motion.div
          className="stat-box"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="stat-number">256-bit</div>
          <div className="stat-label">Encryption</div>
        </motion.div>

        <motion.div
          className="stat-box"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="stat-number">ISO 27001</div>
          <div className="stat-label">Certified</div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Features;