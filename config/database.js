const mongoose =require("mongoose")
const dbConnection= ()=>{
       mongoose.connect(process.env.DB_URI).then((conn)=>{
    
            console.log('MongoDB Connected...');
         }).catch((err)=>
            {
                console.error('Database connection error:', err.message);
                process.exit(1);
            }
        )
}
module.exports=dbConnection