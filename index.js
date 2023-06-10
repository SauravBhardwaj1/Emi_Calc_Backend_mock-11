const express = require('express');
const { connection } = require('./config/db');

const {authRoutes} = require("./routes/auth.route")

require('dotenv').config()

const app = express();

app.use(express.json())

app.use("/user", authRoutes)


app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("Connected to DB successfully")
        
    } catch (error) {
        console.log("Error connecting")
    }
    
    console.log(`running on port ${process.env.port}`)
})