const express = require("express");
const {getCategory,getSpecificCategory,createCategory, updateCategory, deleteCategory, searchCategory} = require("../services/categoryServices");
const { authorizeRoles } = require("../middelware/authorization");
const { protect } = require("../middelware/authMiddleware");
const router = express.Router()
// routes 
router.get("/",getCategory)
router.get("/search",searchCategory)
router.post("/",protect,authorizeRoles( "seller", "admin"),createCategory)
router.get("/:id",getSpecificCategory)
router.put("/:id",protect,authorizeRoles( "seller", "admin"),updateCategory)
router.delete("/:id",protect,authorizeRoles("admin"),deleteCategory)

module.exports=router
