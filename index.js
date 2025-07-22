const express=require("express");
const DataBase = require("./config/db");
const AuthRoutes = require("./routes/Auth.routes");
require("dotenv").config()
const AdminRoutes=require("./routes/admin.routes");
const productData = require("./routes/product.routes");
const Checkout = require("./routes/checkout.routes");

//port
const PORT=process.env.PORT;


//define server
const server=express()



//middlewares
server.use(express.json())



// home routes
server.get("/",async(req,res)=>{

  try {
    res.status(200).json({
        success:true,
        msg:"welcome to home page"
    })
  } catch (error) {
    res.status(500),json({
        success:false,
        msg:error.message
    })
  }
})


//routes
server.use("/user",AuthRoutes)
server.use("/admin",AdminRoutes)
server.use("/user/product",productData)
server.use("/user/checkout",Checkout)



// server listening
server.listen(PORT,async()=>{
   try {
     await DataBase()
 console.log('server is listenig at port :',PORT)
   } catch (error) {
     console.log("Getting error from server : ",error.message)
        exist(1)
   }
})
