const invalidPathHandler = (req, res, next) => {
	let error = new Error("Invalid Path");
	error.statusCode = 404;
	next(error);
};

module.exports = invalidPathHandler;