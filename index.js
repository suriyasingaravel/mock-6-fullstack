
const express = require('express');
require('dotenv').config()
const {connection} = require("./db");

var cors = require('cors')

const app = express();
app.use(cors())

app.use(express.json());



app.get("/",(req,res)=>{
    res.send("Hello Welcome to my website!")
})

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log(`server connected to Database successfully`);
        console.log(`server Running at port successfully`);
 
    } 
    catch (error) {
        console.log(error)
    }
 })
