require("dotenv").config({ path: __dirname + '/.env' });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

console.log("Loading .env from:", __dirname + '/.env');
console.log("JWT_SECRET is set:", !!process.env.JWT_SECRET);

const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);

app.get("/", (req, res) => {
  res.send("BloodHub Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Authentication middleware enabled for protected routes");
});
