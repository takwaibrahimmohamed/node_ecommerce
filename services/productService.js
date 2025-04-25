const productModel = require("../models/productModel")
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const APIError = require("../utils/APIError")
//  getlistproduct
// route get methd
// acces public
const getproduct =asyncHandler(
    async (req,res)=>{
        // pagination 
    let page = req.query.page*1 ||1
    let limit =req.query.page*1 ||5
    let skip = (page -1) * limit
      const products = await productModel.find({}).skip(skip).limit(limit)
        res.status(200).json({results:products.length,page,data:products})
        }
)



//  get specific product by id
// route get methd
// acces public

const getSpecificproduct =asyncHandler(
    async (req,res,next)=>{
     const {id} = req.params
     const product = await productModel.findById(id)
     if(!product){
      return  next(new APIError(`there is no product for this id${id}`,404))
     }
     else{
        res.status(200).json({data:product})
     }
        }
)

//  createproduct
// route post methd
// acces privite--admin 

const createproduct =asyncHandler(

    async (req,res)=>{
        const name= req.body.name
        const product=await productModel.create({name,slug:slugify(name)});
        res.status(201).
        json({data:product})
   
     }
)




//  update specific product by id
// route put methd
// acces private
const updateproduct =asyncHandler(async (req,res,next)=>{
    const {id} = req.params
    const {name} = req.body
    const product = await productModel.findByIdAndUpdate
    ({_id:id},{name,slug:slugify(name)},{new:true})//الحاجه الل هفلتر بيها ,للي هعملو update,other option
   if(!product){
    return  next(new APIError(`there is no product for this id${id}`,404))
   }
   else{
    res.status(200).json({data:product})
   }

}
)

//  delete specific product by id
// route delet methd
// acces private
const deleteproduct =asyncHandler(async (req,res,next)=>{
    const {id} = req.params
    const product = await productModel.findByIdAndDelete(id)
   if(!product){
    return  next(new APIError(`there is no product for this id${id}`,404))
   }
   else{
    res.status(200).send()
   }

}
)
// search 
const searchproduct =asyncHandler(async (req,res,next)=>{
    const {name} = req.query
   if(!name){
    return  next(new APIError(`there is no product for `,404))
   }
 const product = await productModel.find({name})
 res.status(200).json({data:product})
}
)


module.exports = {getproduct,getSpecificproduct,createproduct,updateproduct,deleteproduct,searchproduct}