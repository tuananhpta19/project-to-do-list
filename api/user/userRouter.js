let router = require('express').Router();
let userService = require("./userService");
let UserModel = require("../../model/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;
let checkToken = require("../../middleware/checkToken");
let checkAdmin = require("../../middleware/checkAdmin");
router.get("/",async function(req,res,next) {
    let findUser = await userService.getAllUserAdmin();
    res.json({
        status: 'search success',
        data: findUser
    })
})
router.put("/:id",checkToken,checkAdmin,async function(req,res,next) {
    if(req.body.password){
        bcrypt.genSalt(saltRounds,  function(err, salt) {
            bcrypt.hash(req.body.password, salt,async function(err, hash) {
                let userEdit = {};
                if(req.body.username) userEdit.username = req.body.username;
                if(req.body.password) userEdit.password = hash;
                if(req.body.email) userEdit.email = req.body.email;
                userService.updateUser(req.params.id,userEdit);
                let newUser = await UserModel.find({_id:req.params.id})
                res.json({
                    status: 'eidt success',
                    data: newUser
                })
            });   
        })
    }else{
        let userEdit = {};
        if(req.body.username) userEdit.username = req.body.username;
        if(req.body.password) userEdit.password = req.body.password;
        if(req.body.email) userEdit.email = req.body.email;
        userService.updateUser(req.params.id,userEdit);
        let newUser = await UserModel.find({_id:req.params.id})
        res.json({
            status: 'eidt success',
            data: newUser
        })
    }
})
router.delete("/:id",checkToken,checkAdmin,async function(req,res,next) {;
    await userService.deleteUser(req.params.id);
    res.json({
        status: 'delete success',
    })
})
module.exports = router