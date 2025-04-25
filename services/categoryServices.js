const CategoryModel = require("../models/CategoryModel")
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const APIError = require("../utils/APIError")
//  getlistCategory
// route get methd
// acces public
const getCategory =asyncHandler(
    async (req,res)=>{
        // pagination 
    let page = req.query.page*1 ||1
    let limit =req.query.page*1 ||5
    let skip = (page -1) * limit
      const categories = await CategoryModel.find({}).skip(skip).limit(limit)
        res.status(200).json({results:categories.length,page,data:categories})
        }
)



//  get specific Category by id
// route get methd
// acces public

const getSpecificCategory =asyncHandler(
    async (req,res,next)=>{
     const {id} = req.params
     const category = await CategoryModel.findById(id)
     if(!category){
      return  next(new APIError(`there is no category for this id${id}`,404))
     }
     else{
        res.status(200).json({data:category})
     }
        }
)

//  createCategory
// route post methd
// acces privite--admin 

const createCategory =asyncHandler(

    async (req,res)=>{
        const name= req.body.name
        const category=await CategoryModel.create({name,slug:slugify(name)});
        res.status(201).
        json({data:category})
   
     }
)




//  update specific Category by id
// route put methd
// acces private
const updateCategory =asyncHandler(async (req,res,next)=>{
    const {id} = req.params
    const {name} = req.body
    const category = await CategoryModel.findByIdAndUpdate
    ({_id:id},{name,slug:slugify(name)},{new:true})//الحاجه الل هفلتر بيها ,للي هعملو update,other option
   if(!category){
    return  next(new APIError(`there is no category for this id${id}`,404))
   }
   else{
    res.status(200).json({data:category})
   }

}
)

//  delete specific Category by id
// route delet methd
// acces private
const deleteCategory =asyncHandler(async (req,res,next)=>{
    const {id} = req.params
    const category = await CategoryModel.findByIdAndDelete(id)
   if(!category){
    return  next(new APIError(`there is no category for this id${id}`,404))
   }
   else{
    res.status(200).send()
   }

}
)
// search 
const searchCategory =asyncHandler(async (req,res,next)=>{
    const {name} = req.query
   if(!name){
    return  next(new APIError(`there is no Category for `,404))
   }
 const Category = await CategoryModel.find({name})
 res.status(200).json({ results: Category.length, data: Category })
}
)


module.exports = {getCategory,getSpecificCategory,createCategory,updateCategory,deleteCategory,searchCategory}