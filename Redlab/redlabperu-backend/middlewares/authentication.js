const jwt = require('jwt-simple');
const config = require('../config');
const models = require('../models');


module.exports = (req, res, next) => {
	const accessToken = req.get('accessToken');
	if (accessToken) {
		try{
			let user = jwt.decode(accessToken, config.secret_key, true);
			if(user){
				models.User.findOne({where: user}).then(userFound =>{
					next()
				}, err => {res.sendStatus(401)})
			} else
				res.sendStatus(401); //Unauthorized	
		}catch(exc){ //if the accessToken was modified
			console.log(exc)
			res.sendStatus(401); //Unauthorized	
		}
	} else
		res.sendStatus(401); //Unauthorized
}