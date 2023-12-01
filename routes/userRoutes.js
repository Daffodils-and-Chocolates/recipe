const express = require('express');

const { registerUser, loginUser, userProfile, updateProfile , updateProfilePicture } = require('../controllers/userController.js');
const {authGuard} = require('../middleware/authMiddleware.js')

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile",authGuard , userProfile);
router.put("/updateProfile", authGuard, updateProfile);
router.put("/updateProfilePicture", authGuard, updateProfilePicture);

module.exports = router;