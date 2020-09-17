let router = require("express").Router();
const jwt = require('jsonwebtoken');
const passport = require("../../config/passport");
/* POST login. */
router.get("/",function(req,res,next){
    res.render('login')
})
router.post('/', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, 'ta');
           res.cookie('token',token, { maxAge: 3600000})
           if(user.type==1){
            res.redirect('/homeAdmin')
           }else{
            res.redirect('/home')
           }
        //    res.cookie('user',token, { maxAge: 3600000})
        //    return res.json({user, token});
        });
    })(req, res);
});
module.exports = router