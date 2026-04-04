const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
    name:String,
    bloodGroup:String,
    location:String,
    phone:String,
    availability:Boolean
});

module.exports = mongoose.model("Donor", donorSchema);