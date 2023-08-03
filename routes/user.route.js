const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/signup.controller");
const {
	signupvalidate,
	isRequestValidated,
} = require("../validation/signup.validation");
const { signinvalidate } = require("../validation/signin.validation");
const { loginUser } = require("../controllers/signin.controller");
const { checkToken, dashboard } = require("../controllers/home.controller");

router.post("/register", signupvalidate, isRequestValidated, registerUser);
router.post("/login", signinvalidate, isRequestValidated, loginUser);
router.get("/home", checkToken, dashboard);

module.exports = router;
