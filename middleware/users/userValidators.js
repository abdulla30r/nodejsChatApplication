//external import
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const fs = require("fs");
const path = require("path");

//internal import
const User = require("../../models/People");

//add user
const addUserValidators = [
	check("name")
		.isLength({ min: 1 })
		.withMessage("Name is Required")
		.isAlpha("en-US", { ignore: " -" })
		.withMessage("Name must not contain anything other than alphabet")
		.trim(),
	check("email")
		.isEmail()
		.withMessage("Invalid email address")
		.trim()
		.custom(async value => {
			try {
				const user = await User.findOne({ email: value });
				if (user) {
					throw createError("Email is already in use!");
				}
			} catch (err) {
				throw createError(err.message);
			}
		}),
	check("mobile")
		.isMobilePhone("bn-BD", { strictMode: true })
		.withMessage("Mobile number must be valid Bangladeshi number")
		.trim()
		.custom(async value => {
			try {
				const user = await User.findOne({ mobile: value });
				if (user) {
					throw createError("Mobile is already in use!");
				}
			} catch (err) {
				throw createError(err.message);
			}
		}),
	check("password")
		.isStrongPassword()
		.withMessage(
			"Password must be 8 character long & should contain at least 1 lowercase,1 uppercase,1 digit,1 symbol"
		),
];

const addUserValidationHandler = function (req, res, next) {
	const error = validationResult(req);
	const mappedErrors = error.mapped();

	if (Object.keys(mappedErrors).length === 0) {
		next();
	} else {
		//remove uploaded file
		if (req.files.length > 0) {
			fs.unlink(req.files[0].path, err => {
				if (err) {
					console.log(err);
				}
			});
		}

		//response the errors
		res.status(500).json({
			errors: mappedErrors,
		});
	}
};

module.exports = {
	addUserValidators,
	addUserValidationHandler,
};
