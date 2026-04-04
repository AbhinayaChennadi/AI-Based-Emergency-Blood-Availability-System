/*const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");

router.post("/register-donor", async(req,res)=>{
    const donor = new Donor(req.body);
    await donor.save();
    res.json(donor);
});

router.get("/donors", async(req,res)=>{
    const donors = await Donor.find();
    res.json(donors);
});

module.exports = router;
*/









const express = require("express");
const router = express.Router();

/* TEST ROUTE */
router.get("/donors", (req, res) => {
    res.json([
        {
            name: "Test Donor",
            bloodGroup: "O+",
            location: "Hyderabad"
        }
    ]);
});

module.exports = router;