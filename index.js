require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3002
const connect = require('./DB/Connection.js')
const userRoutes = require('./Routes/UserRoutes.js')
const foodRoutes = require('./Routes/FoodRoutes.js')
const shoppingRoutes = require('./Routes/ShoppingRoutes.js')
const list = require('./Schemas/ShoppingList.js')


connect();

// async function remove(){
//     await list.deleteMany({})
// }

// remove()

app.use(cors());
app.use(express.json());

app.use('/api',userRoutes)
app.use('/api',foodRoutes)
app.use('/api',shoppingRoutes)

app.get('/', (req, res) => {
  res.send('Welcome To Projecto App')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})