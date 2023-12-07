
const express = require('express');
require('dotenv').config()
const {connection} = require("./db");
const {userRouter} = require("./Routes/user.routes");
const {blogRouter} = require("./Routes/blogs.routes");


var cors = require('cors')

const app = express();
app.use(cors())

app.use(express.json());

app.use("/api", userRouter);
app.use("/api/blogs", blogRouter);



app.get("/",(req,res)=>{
    res.send("Hello Welcome to my website!")
})

app.listen(8080,async()=>{
    try {
        await connection;
        console.log(`server connected to Database successfully`);
        console.log(`server Running at port successfully`);
 
    } 
    catch (error) {
        console.log(error)
    }
 })
