//external imports
const express = require("express");

//internal imports
const { getInbox } = require("../controllers/inboxController");
const decorateHtmlResponse = require("./../middleware/common/decorateHtmlResponse")

const router = express.Router();

//inbox page
router.get("/",decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;
