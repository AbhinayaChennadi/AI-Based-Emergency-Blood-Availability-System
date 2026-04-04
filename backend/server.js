const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const donorRoutes = require("./routes/donorRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", donorRoutes);

app.get("/", (req,res)=>{
    res.send("BloodHub Backend Running");
});

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});