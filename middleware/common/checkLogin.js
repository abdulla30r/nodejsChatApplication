const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
	let cookies =
		Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

	if (cookies) {
		try {
			token = cookies[process.env.COOKIE_NAME];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = decoded;

			if (res.locals.html) {
				res.locals.loggedInUser = decoded;
			}
			next();
		} catch (err) {
			if (res.locals.html) {
				res.redirect("/");
			} else {
				res.status(500).json({
					errors: {
						common: {
							msg: "Authentication Failure",
						},
					},
				});
			}
		}
	} else {
		if (res.locals.html) {
			res.redirect("/");
		} else {
			res.status(401).json({
				errors: {
					common: {
						msg: "Authentication Failure",
					},
				},
			});
		}
	}
};

const redirectLoggedIn = (req, res, next) => {
	let cookies =
		Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

	if (!cookies) {
		next();
	} else {
		if (res.locals.html) {
			res.redirect("inbox");
		}
	}
};

module.exports = {
	checkLogin,
	redirectLoggedIn,
};
