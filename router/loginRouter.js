//external imports
const express = require("express");

//internal imports
const { getLogin, login, logout } = require("./../controllers/loginController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const {
	doLoginValidators,
	loginValidationHandler,
	doLoginValidationHandler,
} = require("../middleware/login/loginValidators");
const { redirectLoggedIn } = require("../middleware/common/checkLogin");

const router = express.Router();

//set page title
const page_title = "Login";

//login page
router.get("/", decorateHtmlResponse(page_title),redirectLoggedIn, getLogin);

router.post(
	"/",
	decorateHtmlResponse(page_title),
	doLoginValidators,
	doLoginValidationHandler,
	login
);

router.delete("/", logout);

module.exports = router;
