import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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
        </div>
      </div>

      {/* RIGHT - LOGIN */}
      <div style={right}>
        <Link to="/login" style={login}>
          Login / Signup
        </Link>
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

export default Navbar;