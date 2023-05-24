const express = require('express');
const authController = require('../controllers/auth.controller')
const router = express.Router();

router.get("/signup",authController.getSignup);
router.post("/signup",authController.getSignupPost);

router.get("/login",authController.getLogin);
router.post("/login",authController.getLoginPost);

router.post("/logout",authController.getLogout);

module.exports = router;