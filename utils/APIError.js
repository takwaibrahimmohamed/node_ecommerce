
//repose errors
class APIError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode
        this.status = `${statusCode}`.startsWith(4)?'fail':'error'
        this.isOperational=true
    }
}
module.exports=APIError