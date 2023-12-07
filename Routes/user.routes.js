const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {UserModel} = require("../Model/user.model");

const userRouter = express.Router();


userRouter.post("/register", async(req,res)=>{
    const {username,avatar,email,password,} = req.body;

    try {
         bcrypt.hash(password,5, async(err,hash)=>{
            if(err){
                res.status(200).send({"msg":"Not able to encrypt password", "error":err});
            }
            else{
                const newUser = new UserModel({
                    username: username,
                    avatar:avatar,
                    email: email,
                    password:hash
                })

                await newUser.save();
                res.status(200).send({"msg":"New user successfully created", "newUser":newUser});
            }
         })
    } 
    catch (error) {
        res.status(400).send({"error":error});
    }
})


userRouter.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    // console.log(email)
   

    try {
        const user = await UserModel.findOne({email});
        console.log(user);

       if(user){
            bcrypt.compare(password, user.password, (err,result)=>{

                if(result){
                    const token = jwt.sign({username: user.username, userID: user._id}, "masai");

                    res.status(200).send({"msg": `Helo ${user.username}`, "token": token});
                }
                else{
                    res.status(401).send({"msg":"Invalid Credentials, Check your credentials"});
                }

            })
       }

       else{
          res.status(400).send({"msg": "No Such User found"});
       }
    }
    
    catch (error) {
        res.status(400).send({"err": "There was an error"});
    }
})


// userRouter.get("/logout", async(req,res)=>{
//     const token = req.headers.authorization?.split(" "[1]);

//     try {
        
//     } 
    
//     catch (error) {
        
//     }
// })




module.exports = {userRouter};



