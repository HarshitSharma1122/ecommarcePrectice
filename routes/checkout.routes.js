const {Router}=require("express")
const { Authentication } = require("../middleware/Auth.middleware")
const { checkout } = require("./product.routes")


const Checkout=Router()

Checkout.post("/checkout",Authentication,checkout)


module.exports=Checkout