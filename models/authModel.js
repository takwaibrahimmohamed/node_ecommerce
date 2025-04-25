const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be unique"],
        minlength: [3, "Too short username"],
        maxlength: [32, "Too long username"],
    },
    email: { 
        type: String,
        required: [true, "Email required"],
        unique: true,
        lowercase: true,
     },
    password: {  type: String,
        required: [true, "Password required"],
        minlength: 6,},
        role: {
            type: String,
            enum: ["user", "seller", "admin"],
            default: "user",
          }
}, { timestamps: true })

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;