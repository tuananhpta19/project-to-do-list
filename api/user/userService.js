let UserModel = require("../../model/User");
let getAllUser = ()=>{
    return UserModel.find({},{username:1,email:1});
}
let getAllUserAdmin = ()=>{
    return UserModel.find();
}
//create user
let createUser = (newUser)=>{
    return UserModel.create(newUser);
}
let updateUser = async (uid,userEdit)=>{
   let userEdited = await UserModel.updateOne({_id:uid},userEdit);
    await UserModel.find({_id:uid});
    return userEdited;
}
let deleteUser = (uid)=>{
    return UserModel.deleteOne({_id: uid})
}
module.exports= {getAllUser,createUser,updateUser,deleteUser,getAllUserAdmin}