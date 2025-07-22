const{Router}=require("express")
const { Authentication, Authorization } = require("../middleware/Auth.middleware");
const { addCategory, addProducts } = require("../controller/admin.controller");


const AdminRoutes=Router();


AdminRoutes.post("/category",Authentication,Authorization(["admin"]),addCategory);
AdminRoutes.post("/products",Authentication,Authorization(["admin"]),addProducts);



module.exports=AdminRoutes;