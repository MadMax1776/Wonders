const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users.js');
const router = express.Router();

router.post('/', (req, res) => {
  User.findOne({username:req.body.username}, (error, foundUser) => {
    if(foundUser === null){
      res.json({
        message:'user not found',
      });
    } else {
      const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
      if(doesPasswordMatch){
        req.session.user = foundUser;
        res.json(foundUser)
      } else {
        res.json({
          message:'bad pwd'
        });
      }
    }
  });
});

router.get('/', (request, response) => {
  response.json(request.session.user);
});

router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.json({
      destroyed:true
    });
  })
});

module.exports = router;
