let UserModel = require("../model/User")
var check = async function(req, res, next){
    let checkEmail = await UserModel.find({email:req.body.email});
    if(checkEmail.length>=1){
        res.json("Email not exist");
    }else{
        next()
    }
}
module.exports = check;