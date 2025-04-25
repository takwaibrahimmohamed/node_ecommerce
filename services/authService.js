
const ApiError =require("../utils/APIError")
const bcrypt = require('bcrypt');;
const generateToken = require("../utils/generateWebToken");
const UserModel = require("../models/authModel");
const asyncHandler = require('express-async-handler')
const register = asyncHandler(async (req, res, next) => {
    const { username, email, password,role  } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return next(new ApiError("Email already registered", 400));
      }
      const hashedPassword = await bcrypt.hash(password, 12);
            
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            role 
        });
        res.status(201).json({
            message: "User registered successfully",
            token:generateToken(user._id),
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        })
})
const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })
    const passowrdMatch =await bcrypt.compare(password,user.password)
    if(!user||!passowrdMatch){
        return next(new APIError("Invalid email or password", 401));
    }
    res.status(201).json({
        message: "User registered successfully",
        token:generateToken(user._id),
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }
    })

})
module.exports = { register, login };