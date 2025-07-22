const{Router}=require("express")
const { getCategory, getProducts, SingleProduct, addCommentsRating, getCommentsAvRating } = require("../controller/product.controller")
const { Authentication } = require("../middleware/Auth.middleware")

const productData=Router()

productData.get("/category",getCategory)
productData.get("/products",getProducts)
productData.get("/product",SingleProduct)
productData.post("/comments-rating",Authentication,addCommentsRating)
productData.get("/comments-rating",getCommentsAvRating)


module.exports=productData