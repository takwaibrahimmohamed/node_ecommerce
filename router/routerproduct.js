const express = require("express");
const { getproduct, createproduct, getSpecificproduct, updateproduct, deleteproduct, searchproduct } = require("../services/productService");
const { authorizeRoles } = require("../middelware/authorization");
const { protect } = require("../middelware/authMiddleware");
const router = express.Router()
// routes 
router.get("/",getproduct)
router.get("/search",searchproduct)
router.post("/",protect,authorizeRoles( "seller", "admin"),createproduct)
router.get("/:id",getSpecificproduct)
router.put("/:id",protect,authorizeRoles( "seller", "admin"),updateproduct)
router.delete("/:id",protect,authorizeRoles("admin"),deleteproduct)

module.exports=router
