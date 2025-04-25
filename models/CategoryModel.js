const mongoose =require("mongoose")
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"category required"],
        unique: [true, 'category must be unique'],
        minlength:[3,"too short category name"],
        maxlength:[32,"too long category name"]
    },
    // space to - - - dash 
    slug:{
        type:String,
        lowercase:true,
    },
    image:String,
},{ timestamps: true })
const CategoryModel = mongoose.model("category",categorySchema)
module.exports =CategoryModel