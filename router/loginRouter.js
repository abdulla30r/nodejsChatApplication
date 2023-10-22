//external imports
const express = require("express");

//internal imports
const { getLogin } = require("./../controllers/loginController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");

const router = express.Router();

//login page
router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;
