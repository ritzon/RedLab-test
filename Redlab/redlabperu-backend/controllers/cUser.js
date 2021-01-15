const sUser = require("../services/sUser"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage} = require("../global/response"),
    secret_key = require("../config").secret_key;

const jwt = require('jwt-simple');
const mailer = require('../global/mailer');
const config = require('../config');
const {getFirstPropertyOfObject} = require('../global/helpers');
 
async function login(req,res){
	if(req.headers.authorization){
		let base64 = req.headers.authorization.split(' ')[1] // ['Basic', 'amNoaXF1aW46MTIzNDU=']
		let decodedBase64 = Buffer.from(base64, 'base64').toString() // 'jchiquin:12345'
		let [username, password] = decodedBase64.split(':') //['jchiquin', '12345']
		username = username.toLowerCase();
		
		try {
			const user = await sUser.getUserByCredentials(username, password);
			let accessToken = jwt.encode(user, secret_key);
			makeResponseOk(res, { user, accessToken }, "user/getUser");
			//res.status(200).json(user)
		} catch(err) {
			makeResponseException(res, err);
		}
	}else{
		makeResponseOkMessage(res,'E006')
	}
}

async function sendCredentials(userExtension, res) {
	try {
		const user = await sUser.getUserById(userExtension.UserId);
		const { username, password } = user;
		const { name, lastNameP } = userExtension;
		const emailData = { email: username, password: password, fullname: `${name} ${lastNameP}` }
		// Send email with password
		mailer.sendPassword(emailData);
		makeResponseOkMessage(res, "I001");
	} catch(err) {
		makeResponseException(res, err);
	}
}

async function sendResetPassword(req,res) {
	try {
		const { email } = req.fields;
		const user = await sUser.getUserByEmail(email);
		const token = await sUser.createToken(user);
		const url = `${config.urlFront}:${config.portFront}/reset/${user.id}/${token.hash}`;
		const emailData = { email: user.username, url };
		//res.status(200).json(emailData);
		// Send email with password
		mailer.sendTokenForPassword(emailData);
		makeResponseOkMessage(res, "I030");
	}	catch(err) {
    makeResponseException(res, err);
  }
}

async function addClient(req, res) {
	try {
		const client = await sUser.createUserClient(req.fields);
	 	sendCredentials(client, res);
	} catch(err) {
    makeResponseException(res, err);
  }
}

async function addEmployee(req, res) {
	try {
		const fields = JSON.parse(getFirstPropertyOfObject(req.fields))
		const file = getFirstPropertyOfObject(req.files)
		const employee = await sUser.createUserEmployee(fields, file);
	 	sendCredentials(employee, res);
	} catch(err) {
    makeResponseException(res, err);
  }
}

async function getUsers(req,res) {
	try {
		const users = await sUser.getUserAll();
		makeResponseOk(res, { users }, "user/listUsers");
	}	catch(err) {
    makeResponseException(res, err);
  }
}

async function addUserRoles(req, res) {
	try {
		const user_id = req.params.user_id;
		const body = req.fields;
		sUser.assignRoles(body, user_id);
		makeResponseOkMessage(res, 'I092');
	} catch (err) {
		makeResponseException(res, err);
	}
}

async function removeUserRole(req, res) {
	try {
		const user_id = req.params.user_id;
		const role_id = req.params.role_id;
		sUser.takeOffRole(role_id, user_id);
		makeResponseOkMessage(res, 'I010');
	}	catch(err) {
    makeResponseException(res, err);
  }
}

async function getUserById(req,res) {
	try {
		const userId = req.params.userId;
		const user = await sUser.getUserById(userId);
		makeResponseOk(res, { user }, "user/getUser");
	}	catch(err) {
    makeResponseException(res, err);
  }
}

async function getMenuForUser(req,res) {
	try {
		const userId = req.params.user_id;
		const functions = await sUser.getMenuForUser(userId);
		//res.status(200).json(functions);
		makeResponseOk(res, { functions }, "function/menu");
	}	catch(err) {
    makeResponseException(res, err);
  }
}

async function getMenuMobileForUser(req,res) {
	try {
		const userId = req.params.user_id;
		const functions = await sUser.getMenuForUser(userId, 'M');
		makeResponseOk(res, { functions }, "function/menuMobile");
	}	catch(err) {
    makeResponseException(res, err);
  }
}

async function getRolesByUser(req, res) {
	try {
		const userId = req.params.user_id;
		const roles = await sUser.getRolesByUser(userId);
		makeResponseOk(res, { roles }, "role/listRoles");
	}	catch(err) {
    makeResponseException(res, err);
  }
}

async function validToken(req, res) {
	try {
		const { userId, token } = req.params;
		const tokenValid = await sUser.validToken(token, userId);
		const user = tokenValid.User;
		makeResponseOk(res, { user }, "user/getUser");
		
	} catch(err) {
		makeResponseException(res, err);
	}
}

async function updateUser(req, res) {
	try {
		const userId = req.params.userId;
		const fields = req.fields;
		await sUser.updateUser(userId,fields);
		makeResponseOkMessage(res, "I002");
	} catch(err) {
		makeResponseException(res, err);
	}
}

async function resetPasswordUser(req, res) {
	try {
		const { newPassword, userId } = req.fields;
		await sUser.resetPasswordUser(userId, newPassword);
		makeResponseOkMessage(res, 'I002');
	} catch(err) {
		makeResponseException(res, err);
	}
}

module.exports = {
	login,
	sendCredentials,
	sendResetPassword,
	addEmployee,
	addClient,
	addUserRoles,
	getUsers,
	getMenuForUser,
	getMenuMobileForUser,
	getRolesByUser,
	removeUserRole,
	getUserById,
	updateUser,
	validToken,
	resetPasswordUser
}