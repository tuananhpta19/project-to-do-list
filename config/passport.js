const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UserModel = require('../model/User');
const bcrypt = require("bcrypt")
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {
    try {
      let user = await UserModel.findOne({email}).lean().exec();
      if (!user) done(null, false, { message: 'Incorrect email' })
      else {
        bcrypt.compare(password, user.password).then(function(isCorrectPassord) {
          if(isCorrectPassord){
            done(null, user)
          } else {
            done(null, false, { message: 'Incorrect password' })
          }
        })
      }   
    } catch (error) {
      done(error)
    }
  }
))
module.exports = passport