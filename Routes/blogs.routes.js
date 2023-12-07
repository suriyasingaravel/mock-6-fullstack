const express = require('express');
const {BlogModel} = require("../Model/blogs.model");
const {auth} = require("../Middlewares/auth.MiddleWare");

const blogRouter = express.Router();

blogRouter.use(auth);

blogRouter.post("/", async(req,res)=>{
    try {
        const blog =  new BlogModel(req.body);
        await blog.save();
        res.status(200).send({"msg": "Blog saved successfully", "blog": blog});
    } 
    
    catch (error) {
        res.status(400).send({"error": error});
    }
})


blogRouter.get("/", async(req,res)=>{
    try {
        const blogs = await  BlogModel.find();
        res.status(200).send({"blogs": blogs});
    } 
    
    catch (error) {
        res.status(400).send({"error": error});
    }
})


blogRouter.patch("/:id", async(req,res)=>{
    const {id} = req.params;
    const blog = await BlogModel.findOne({"_id": id});
    try {
        console.log(req.body.userID)
        if(req.body.userID == blog.userID){
            await BlogModel.findByIdAndUpdate({ "_id": id }, req.body);
            res.status(200).send({"msg": "Note updated successfully"});
        }

        else{
            res.status(404).send({"msg": "You are not Authorized to update this"});
        }
    } 
    
    catch (error) {
        res.status(400).send({"error": error});
    }
})


blogRouter.delete("/:id", async(req,res)=>{
    const {id} = req.params;
    const blog = await BlogModel.findOne({_id: id});
  
    try {
        // console.log(blog._id)
        // req.body.userID
        if(req.body.userID === blog.userID){
            await BlogModel.findByIdAndDelete({"_id": id});
            res.status(200).send({"msg": "Note deleted successfully"});
        }

        else{
            res.status(404).send({"msg": "You are not Authorized to update this"});
        }
    } 
    
    catch (error) {
        res.status(400).send({"error": error});
    }
})


module.exports = {blogRouter}





