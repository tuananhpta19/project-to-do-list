let router = require("express").Router();
let userService = require('./userService');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let checkEmail = require("../../middleware/checkEmail")
router.get("/",function(req,res,next) {
  res.render('signUp')
})
router.post("/",checkEmail,async function(req,res,next){
    bcrypt.genSalt(saltRounds,  function(err, salt) {
        bcrypt.hash( req.body.password, salt,async function(err, hash) {
          let newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hash
          };
          if(req.body.type) newUser.type =  req.body.type 
         await userService.createUser(newUser);
            return res.json({
              status: "Registry Successfully!"
            });
        });   
    })
})
module.exports = router