//external imports
const express = require("express");

//internal imports
const { getLogin, getUsers } = require("./../controllers/userController");
const decorateHtmlResponse = require("./../middleware/common/decorateHtmlResponse")

const router = express.Router();

//users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

module.exports = router;
