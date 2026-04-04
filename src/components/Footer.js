import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Globe,
  Share2,
  Users,
  ExternalLink
} from "lucide-react";
import "../styles/Footer.css";

function Footer() {
  const navigate = useNavigate();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
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

  const socialLinks = [
    { icon: <Globe size={20} />, name: "BloodHub", url: "#" },
    { icon: <Share2 size={20} />, name: "Updates", url: "#" },
    { icon: <Users size={20} />, name: "Community", url: "#" }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Donate Blood", action: () => window.dispatchEvent(new CustomEvent('openDonorModal')) },
    { name: "Request Blood", path: "/request" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Find Donors", path: "/search" }
  ];

  const supportLinks = [
    { name: "Help Center", url: "#" },
    { name: "Contact Us", url: "#" },
    { name: "Privacy Policy", url: "#" },
    { name: "Terms of Service", url: "#" },
    { name: "FAQ", url: "#" }
  ];

  const handleLinkClick = (link) => {
    if (link.path) {
      navigate(link.path);
    } else if (link.action) {
      link.action();
    } else if (link.url && link.url !== "#") {
      window.open(link.url, '_blank');
    }
  };

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <motion.div
            className="footer-section footer-brand"
            variants={itemVariants}
          >
            <motion.div
              className="footer-logo"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Heart size={32} className="footer-heart-icon" />
              <h3>BloodHub</h3>
            </motion.div>

            <p className="footer-description">
              India's most advanced blood donation platform, connecting donors with
              patients through AI-powered matching and real-time alerts.
            </p>

            <div className="footer-stats">
              <div className="footer-stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Lives Saved</span>
              </div>
              <div className="footer-stat">
                <span className="stat-number">25K+</span>
                <span className="stat-label">Active Donors</span>
              </div>
              <div className="footer-stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Partner Hospitals</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="footer-section"
            variants={itemVariants}
          >
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="footer-link-button"
                  >
                    {link.name}
                    {link.url && link.url !== "#" && <ExternalLink size={14} />}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            className="footer-section"
            variants={itemVariants}
          >
            <h4>Support</h4>
            <ul className="footer-links">
              {supportLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="footer-link-button"
                  >
                    {link.name}
                    {link.url && link.url !== "#" && <ExternalLink size={14} />}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="footer-section"
            variants={itemVariants}
          >
            <h4>Contact Us</h4>
            <div className="contact-info">
              <motion.div
                className="contact-item"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Mail size={18} />
                <span>support@bloodhub.com</span>
              </motion.div>

              <motion.div
                className="contact-item"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Phone size={18} />
                <span>+91-1800-BLOOD</span>
              </motion.div>

              <motion.div
                className="contact-item"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin size={18} />
                <span>Mumbai, India</span>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="social-links">
              <h5>Follow Us</h5>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="social-link"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="footer-newsletter"
          variants={itemVariants}
        >
          <div className="newsletter-content">
            <h4>Stay Updated</h4>
            <p>Get the latest updates on blood donation camps and emergency requirements.</p>

            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <motion.button
                className="newsletter-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          variants={itemVariants}
        >
          <div className="footer-bottom-content">
            <p>&copy; 2026 BloodHub. All rights reserved.</p>
            <div className="footer-bottom-links">
              <button onClick={() => handleLinkClick({ url: "#" })}>
                Privacy Policy
              </button>
              <button onClick={() => handleLinkClick({ url: "#" })}>
                Terms of Service
              </button>
              <button onClick={() => handleLinkClick({ url: "#" })}>
                Cookie Policy
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;