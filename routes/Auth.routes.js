const express=require("express")
const { Register, Login, newAccessToken } = require("../controller/user.controller")

const AuthRoutes=express.Router()

AuthRoutes.post("/register",Register)
AuthRoutes.post("/login",Login)
AuthRoutes.post("/token",newAccessToken)

module.exports=AuthRoutes