const  mongoose  = require("mongoose");

const connectDB = async()=>{
    if(!process.env.MONGO_URI){
        console.log(`MongoURI is not defined in env varriables`.red);
        process.exit(1);
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connection successful ${conn.connection.host}`.yellow.underline)
    } catch (error) {
       console.log(`Error connecting to mongoDB: ${error.message}`.red);
       process.exit(1);
    }
}
module.exports = connectDB