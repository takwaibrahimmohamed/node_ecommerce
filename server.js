const express = require("express");
const dotenv = require("dotenv")
const morgan= require("morgan") //this use for midellware

dotenv.config({path:"config.env"})
 const dbConnection = require("./config/database");
const authrouter = require("./router/routerAuth");
const router = require("./router/routerCategory");
const productrouter = require("./router/routerproduct");
const APIError = require("./utils/APIError");
const globelEror = require("./middelware/errorMeddelware");
 dbConnection()
// express 
const app = express()
// meddelware 
app.use(express.json())
if(process.env.NODE_ENV="develpoment"){
    app.use(morgan("dev"))
}

// routes 

app.use('/api/auth',authrouter)
app.use('/api/product',productrouter)
app.use('/api/category',router)
// glopel error api 
app.use((req,res,next)=>{
    // const err = new Error(`cant find this rout ${req.originalUrl}`)
    // console.log("err",err)
    next(new APIError(`cant find this rout ${req.originalUrl}`,400))

})
// errorhandling meddleware 
app.use(globelEror)

const PORT = process.env.PORT||8000;
app.listen(PORT,()=>{
    console.log("app running",PORT)
})

process.on("unhandledRejection",(err)=>{
    console.log("unhandledRejection error"+err)
    process.exit(1)
})