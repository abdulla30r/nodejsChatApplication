//external imports
const express = require("express");

//internal imports
const {
	getUsers,
	addUser,
	removeUSer,
} = require("./../controllers/userController");
const decorateHtmlResponse = require("./../middleware/common/decorateHtmlResponse");
const avatarUpload = require("../middleware/users/avatarUpload");
const {
	addUserValidators,
	addUserValidationHandler,
} = require("../middleware/users/userValidators");

const router = express.Router();

//users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

//add user
router.post(
	"/",
	avatarUpload,
	addUserValidators,
	addUserValidationHandler,
	addUser
);

//delete user
router.delete("/:id", removeUSer);

module.exports = router;
