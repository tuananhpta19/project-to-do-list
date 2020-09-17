let express = require('express');
let router = express.Router();
let checkToken = require('../middleware/checkToken');
let checkAdmin = require('../middleware/checkAdmin');
let userService = require("../api/user/userService")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/addNew', function(req, res, next) {
  res.render('addNew');
});
router.get('/home',checkToken,async function(req, res, next) {
  let getAllUser = await userService.getAllUser();
    res.render('home',{name:req.local.username,getAllUser});
});
router.get('/homeAdmin',checkToken,checkAdmin,async function(req, res, next) {
    let getAllUserAdmin = await userService.getAllUserAdmin();
    res.render('homeAdmin',{name:req.local.username,getAllUserAdmin});
});
router.post('/logout',function (req,res,next) { 
  res.clearCookie("token");
  res.end("ket thuc")
})

module.exports = router;
