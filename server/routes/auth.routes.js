const express = require("express");
const router = express.Router();

const { login, updateProfile } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/login", login);
router.put("/profile", protect, updateProfile);

module.exports = router;
