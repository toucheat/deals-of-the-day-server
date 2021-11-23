var mongoose = require('mongoose');  

const modelSchema = new mongoose.Schema({  
    name: String,
    lowPrice: Number,
    picture: String,
    discountRate: Number,
    addCount: { type: Number, default: 0 },
    startDate: Date,
    endDate: Date,
    shop: {
        elevenst: {
            price: Number,
            link: String
        },
        coupang: {
            price: Number,
            link: String
        }
    }
});
mongoose.model('productModel', modelSchema);
module.exports = mongoose.model('productModel');