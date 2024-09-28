import 'dotenv/config'
import express from 'express'
import cors from "cors"
import { dbconnect } from './config/dbConnect.js'
import foodRouter from './routes/food.route.js'
import userRouter from './routes/user.route.js'
import cartRouter from './routes/cart.Route.js'
import orderRouter from './routes/order.route.js'

// App config
let app = express()
let port = process.env.PORT || 4000


// middleware
app.use(express.json())
app.use(cors({origin:["http://deploy"]}))


// DB Connection
dbconnect()

// Api endpoints 

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
   res.send('Api Worked')
})

app.listen(port, () => {
   console.log(`server Started Successfully on http://localhost:${port}`)
})