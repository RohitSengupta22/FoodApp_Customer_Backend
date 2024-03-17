const mongoose = require('mongoose');
const { Schema } = mongoose;


const orderSchema = new Schema({
    Item_Name: String,
    price: Number
})

const savedOrderSchema = new Schema({
    food: String,
    price: Number,
    freq: Number,
    Date: String
})

const shoppingListSchema = new Schema({
    shopping_list: [orderSchema],
    savedOrder: [savedOrderSchema],

    user_id: String
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);
module.exports = ShoppingList;
