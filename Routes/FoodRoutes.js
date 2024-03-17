require('dotenv').config()
const express = require('express')
const User = require('../Schemas/User.js')
const router = express.Router();
const fetchUser = require('../Middleware/FetchUser.js')
const Category = require('../Schemas/Categories.js')
const Food = require('../Schemas/Food.js')


router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to fetch all foods
router.get('/foods', async (req, res) => {
    try {
        const foods = await Food.find().populate('Category');
        res.json(foods);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/sort',async(req,res)=>{
    try{

        const {category} = req.body;
        const foods = await Food.find({Category: category})
        res.status(200).json(foods)


    }catch(e){

        console.log(e)

    }
})







module.exports = router;