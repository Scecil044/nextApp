const express = require("express");

const dotenv = require("dotenv").config();
const colors = require("colors")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const appRoutes = require("./routes/v1");
const connectDB = require("./config/DB.config");



const app = express();
connectDB();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(cors());
const PORT = process.env.PORT || 4500;

// application routes
app.use("/api/v1/", appRoutes);

// error middleware
app.use((err, req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
});

app.listen(PORT,()=>{
    console.log(`Application running on http://localhost:${PORT}`.cyan.bold)
})