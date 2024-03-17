const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodSchema = new Schema({
    Name : {
        type: String,
        
    },

    Foodimg: {
        type: String,
        
    },

    Price: {
        type: Number
    },

    Description : {
        type: String
    },

    DiscountedPrice : {
        type: Number
    },

    Category : {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },

    Admin: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    }
});

const Food = mongoose.model('Food', FoodSchema);
module.exports = Food;