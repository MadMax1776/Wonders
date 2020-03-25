const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users.js');
const router = express.Router();

router.post('/', (request, response) => {
	User.findOne({username:request.body.username}, (error, usernameFound) => {
		if(usernameFound === null) {
			response.json({
				message: 'Invalid username!'
			})
		} else {
			const doesPasswordMatch = bcrypt.compareSync(request.body.password, passwordFound.password)
			if (doesPasswordMatch) {
				response.session.user = usernameFound;
				response.json(usernameFound);
			} else {
				response.json({
					message: 'Invalid Password!'
				})
			}
		}
	});
});

router.get('/', (request, response) => {
	response.json(request.session.user);
});

module.exports = router;