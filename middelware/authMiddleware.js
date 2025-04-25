const UserModel = require("../models/authModel");
const APIError = require("../utils/APIError");

const jwt = require("jsonwebtoken");
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    
    if (!token) return next(new APIError("Not authorized", 401));
   try{
    let decoded = jwt.verify(token, "testkey");
    const user =await UserModel.findById(decoded.userId)
    if (!user) return next(new APIError("User not found", 401));
    req.user = user
    console.log("test",req.user)
    next()
   }
    catch (err) {
        next(new APIError("Invalid token", 401));
      }
}
module.exports = { protect };