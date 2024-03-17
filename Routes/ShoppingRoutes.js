const express = require('express');
const router = express.Router();
const fetchUser = require('../Middleware/FetchUser.js')
const List = require('../Schemas/ShoppingList.js')
const User = require('../Schemas/User.js')




router.patch('/list/:shoppingId',fetchUser,async(req,res) =>{ // Create List
    try{

        const userId = req.id;
        const user = await User.findById(userId)
        const {Item_Name,price} = req.body;
        const shoppingId = req.params.shoppingId
        const shopping = await List.findById(shoppingId)

        if(shopping){

          const list = {
            Item_Name,
            price
          }
    
            shopping.shopping_list.push(list)
            await shopping.save()
           


        }



        res.status(200).json({shopping})
        

    }catch(e){

        console.log(e)

    }
})

router.patch('/remove/:shoppingId',fetchUser,async(req,res) =>{ // remove item from List
    try{

        const userId = req.id;
        const user = await User.findById(userId)
        const {Item_Name,price} = req.body;
        const shoppingId = req.params.shoppingId
        const shopping = await List.findById(shoppingId)

        if(shopping){

            for(var i=0;i<shopping.shopping_list.length;i++){
                if(shopping.shopping_list[i].Item_Name==`${Item_Name}`){
                    shopping.shopping_list.splice(i,1)
                    break;
                }
            }

           await shopping.save()

          
         


        }



        res.status(200).json({shopping})
        

    }catch(e){

        console.log(e)

    }
})

router.get('/fetchOrder/:shoppingID', async (req, res) => {
    try {
        const shoppingID = req.params.shoppingID;
        const order = await List.findById(shoppingID);
        const freqArr = order.shopping_list.map((elem) => {
            return {
                food: elem.Item_Name,
                price: elem.price,
                freq: 1
            };
        });

        // Clear savedOrder array before adding new items
        order.savedOrder = [];

        for (let i = 0; i < freqArr.length - 1; i++) {
            for (let j = i + 1; j < freqArr.length; j++) {
                if (freqArr[i].food == freqArr[j].food) {
                    freqArr[i].freq++;
                    freqArr.splice(j, 1);
                    j--;
                }
            }
        }

        const orderArr = freqArr.map((elem) => {
            return {
                food: elem.food,
                price: elem.price * elem.freq,
                freq: elem.freq
            };
        });

        for (let x of orderArr) {
            order.savedOrder.push(x);
        }

        await order.save();

        res.status(200).json(orderArr);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get('/savedOrder',fetchUser,async(req,res)=>{ //fetch All Order
    try{

       const userId = req.id;
       const shopping = await List.find({ user_id: userId.toString()}).select('savedOrder')
      

       

       const filteredShopping = shopping.filter((elem) => elem.savedOrder.length>0)
       
        

        res.status(200).json(filteredShopping)



    }catch(e){

        console.log(e)

    }
})




module.exports = router;
