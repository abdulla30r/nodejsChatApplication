//external import
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

//internal import
const User = require("../../models/People");

//login
const doLoginValidators = [
	check("username")
		.isLength({
			min: 1,
		})
		.withMessage("Username is required"),
	check("password")
		.isLength({
			min: 1,
		})
		.withMessage("Password is required"),
];

const doLoginValidationHandler = function (req, res, next) {
	const error = validationResult(req);
	const mappedErrors = error.mapped();

	if (Object.keys(mappedErrors).length === 0) {
		next();
	} else {
		res.render("index", {
			data: {
				usrname: req.body.usrname,
			},
			errors: mappedErrors,
		});
	}
};

module.exports = {
	doLoginValidators,
	doLoginValidationHandler,
};
