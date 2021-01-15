module.exports = {
	port: process.env.PORT || 8080,
	db: process.env.DB || '',
	url: process.env.URL || 'localhost',
	urlFront: process.env.URL_FRONT || 'localhost',
	portFront: process.env.PORT_FRONT || 3000,
	secret_key: process.env.SECRET_KEY || "712386210123",
	pathRootStaticFiles: process.env.PATH_ROOT_STATIC_FILES || "public"
}