const jwt = require("jsonwebtoken");
var check =  function(req, res, next){
    let token = req.cookies.token;
   jwt.verify(token, 'ta', function(err, user) {
      if(!err ){
        req.local = user;  
        next()
      }else{
       res.redirect("/")
      }
    });  
}
module.exports = check;