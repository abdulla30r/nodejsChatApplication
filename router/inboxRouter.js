//external imports
const express = require("express");

//internal imports
const { getInbox } = require("../controllers/inboxController");
const decorateHtmlResponse = require("./../middleware/common/decorateHtmlResponse");
const { checkLogin } = require("../middleware/common/checkLogin");

const router = express.Router();

//inbox page
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

module.exports = router;
