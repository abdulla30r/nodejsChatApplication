function decorateHtmlResponse(page_tile) {
	return function (req, res, next) {
		res.locals.html = true;
		res.locals.title = `${page_tile} - ${process.env.APP_NAME}`;
		next();
	};
}

module.exports = decorateHtmlResponse;
