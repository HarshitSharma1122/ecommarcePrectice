require('dotenv').config()
const mongoose=require("mongoose");

const DataBase=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error.message)
        exit(1)
    }
}

mongoose.connection.on('connected',()=>{
    console.log("DataBase Connected ")
})

mongoose.connection.on('disconnected',()=>{
    console.log("DB Disconnected ")
})


mongoose.connection.on('error',(error)=>{
    console.log("DB Disconnected : ",error.message)
})

module.exports=DataBase