const globelEror =(err,req,res,next)=>{
    err.statusCode =err.statusCode ||500
    err.status= err.status||"error"
    if(process.env.NODE_ENV="develpoment"){
        sendErrorForDev(err,res)
    }
    else{
        sendErrorForproduction(err,res)
    }
}
const sendErrorForDev=(err,res)=>{
return res.status(err.statusCode).json({
    status:err.status,
    error:err,
    message:err.message,
    stack:err.stack//الايرور حصل فين بالزبط
 })
}
const sendErrorForproduction=(err,res)=>{
return res.status(err.statusCode).json({
    status:err.status,
    message:err.message,
 })
}
module.exports = globelEror