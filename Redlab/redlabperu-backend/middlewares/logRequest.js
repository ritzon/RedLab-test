module.exports = (req, res, next) => {
    const {log} = console
    log('>>>>>>>>>>>>>>>LOGREQUEST>>>>>>>>>>>>>>>>>>>>>')
    log(req.method,req._parsedUrl.path)
    //log('params',req.params)
    //Always be empty, because the endpoint define its params and this is executed before
    log('query',req.query)
    log('body',req.fields)
    log('<<<<<<<<<<<<<<<LOGREQUEST<<<<<<<<<<<<<<<<<<<<<')
	next()
	
}