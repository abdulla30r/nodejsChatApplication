function decorateHtmlResponse(page_tile) {
	return function (req, res, next) {
		res.locals.html = true;
		res.locals.title = `${page_tile} - ${process.env.APP_NAME}`;
		res.locals.loggedInUser = {};
		res.locals.data = {};
		res.locals.errors = {};
		next();
	};
}

module.exports = decorateHtmlResponse;
