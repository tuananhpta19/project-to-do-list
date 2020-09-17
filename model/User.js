const mongoose = require("../config/connectDB");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
   username: String,
   email: String,
   password: String,
   type: {type:Schema.Types.String,default:3 }
  },{collection: 'user',timestamps:false});

  const UserModel = mongoose.model('user', UserSchema);
  module.exports = UserModel

