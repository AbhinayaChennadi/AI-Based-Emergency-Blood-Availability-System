import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar({ user }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav style={navStyle}>

      {/* LEFT - LOGO */}
      <div style={left}>
        <Link to="/" style={logo}>
          BloodHub
        </Link>
      </div>

      {/* CENTER - PILL */}
      <div style={center}>
        <div style={pill}>
          <Link to="/" style={isActive("/") ? activeLink : link}>
            Home
          </Link>

          <button
            style={isActive("/donate") ? activeLink : link}
            onClick={() => window.dispatchEvent(new Event("openDonorModal"))}
          >
            Donate
          </button>

          <Link to="/request" style={isActive("/request") ? activeLink : link}>
            Request
          </Link>

          <Link to="/dashboard" style={isActive("/dashboard") ? activeLink : link}>
            Dashboard
          </Link>
        </div>
      </div>

      {/* RIGHT - USER INFO OR LOGIN */}
      <div style={right}>
        {user ? (
          <div style={userInfo}>
            <span style={userName}>Hi, {user.name || user.email?.split('@')[0] || 'User'}</span>
            <button onClick={handleLogout} style={logoutBtn}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" style={login}>
            Login / Signup
          </Link>
        )}
      </div>

    </nav>
  );
}
const navStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  boxSizing: "border-box",   
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "15px 40px",
  background: "#1e2a47",
  zIndex: 1000
};

const left = {
  flex: 1
};

const center = {
  flex: 2,
  display: "flex",
  justifyContent: "center"
};

const right = {
  flex: 1,
  display: "flex",
  justifyContent: "flex-end"
};

const logo = {
  color: "#fff",
  fontSize: "22px",
  fontWeight: "bold",
  textDecoration: "none"
};

const pill = {
  display: "flex",
  gap: "10px",
  background: "#f1f1f1",
  padding: "8px",
  borderRadius: "40px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
};

const link = {
  padding: "10px 18px",
  borderRadius: "25px",
  textDecoration: "none",
  color: "#333",
  fontWeight: "500",
  border: "none",
  background: "transparent",
  cursor: "pointer"
};

const activeLink = {
  ...link,
  background: "#e53935",
  color: "#fff",
  boxShadow: "0 5px 15px rgba(229,57,53,0.4)"
};

const login = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500"
};

const userInfo = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const userName = {
  color: "#fff",
  fontSize: "14px",
  fontWeight: "500"
};

const logoutBtn = {
  background: "#e53935",
  color: "#fff",
  border: "none",
  padding: "5px 12px",
  borderRadius: "15px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "500"
};

export default Navbar;