var mongoose = require('mongoose');  

const modelSchema = new mongoose.Schema({  
    pcode: String,
    favoriteCount: Number,
});
mongoose.model('favoriteCountModel', modelSchema);
module.exports = mongoose.model('favoriteCountModel');