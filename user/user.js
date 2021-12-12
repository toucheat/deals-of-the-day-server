var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
    name: String,
    nickname : String,
    email: String,
    password: String,
    favoriteList: [new mongoose.Schema( {pcode: String,}, { _id: false })],
    mallList: [new mongoose.Schema( {mallName: String, mallImg: String, link: String, price: String, shippingCost: String,}, { _id: false })]
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');