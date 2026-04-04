import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Brain, Zap, Heart, Shield, Users, TrendingUp } from "lucide-react";
import "../styles/Info.css";

function InfoSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: <Brain size={32} />,
      title: "AI-Powered Matching",
      description: "Advanced algorithms instantly match donors with patients based on blood type, location, and urgency level."
    },
    {
      icon: <Zap size={32} />,
      title: "Real-Time Alerts",
      description: "Instant notifications via SMS, email, and WhatsApp when blood is needed in your area."
    },
    {
      icon: <Shield size={32} />,
      title: "Verified & Secure",
      description: "All donors and requests are verified through our secure platform with end-to-end encryption."
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Smart Analytics",
      description: "Predictive analytics help hospitals anticipate blood demand and optimize inventory management."
    },
    {
      icon: <Users size={32} />,
      title: "Community Driven",
      description: "Connect with a network of verified donors and healthcare facilities across the country."
    },
    {
      icon: <Heart size={32} />,
      title: "Life-Saving Impact",
      description: "Every donation through our platform directly contributes to saving lives in emergency situations."
    }
  ];

  return (
    <motion.section
      className="info-section"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div
        className="info-header"
        variants={itemVariants}
      >
        <motion.div
          className="info-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Brain size={16} />
          <span>Powered by AI</span>
        </motion.div>

        <motion.h1
          className="info-title"
          variants={itemVariants}
        >
          BloodHub: Revolutionizing
          <br />
          <motion.span
            className="highlight"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Blood Donation
          </motion.span>
          Through Technology
        </motion.h1>

        <motion.p
          className="info-description"
          variants={itemVariants}
        >
          Join India's most advanced blood donation network. Our AI-powered platform
          connects donors with patients in real-time, ensuring no life is lost due to
          blood shortages. Every drop counts, and every second matters.
        </motion.p>

        <motion.div
          className="info-stats"
          variants={itemVariants}
        >
          <div className="stat-item">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Lives Saved</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">25K+</div>
            <div className="stat-label">Active Donors</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Partner Hospitals</div>
          </div>
        </motion.div>
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
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="feature-icon"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.8 + index * 0.1,
                type: "spring",
                stiffness: 200
              }}
            >
              {feature.icon}
            </motion.div>

            <motion.h3
              className="feature-title"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
            >
              {feature.title}
            </motion.h3>

            <motion.p
              className="feature-description"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
            >
              {feature.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="info-cta"
        variants={itemVariants}
      >
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <h2>Ready to Make a Difference?</h2>
          <p>Join thousands of donors who are saving lives every day</p>

          <motion.div
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 2.0 }}
          >
            <motion.button
              className="cta-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.dispatchEvent(new CustomEvent('openDonorModal'))}
            >
              Become a Donor
              <Heart size={18} />
            </motion.button>

            <motion.button
              className="cta-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/request'}
            >
              Find Blood
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default InfoSection;