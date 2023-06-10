const express = require('express');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userModel } = require('../models/usermode');

const authRoutes = express.Router();

authRoutes.get("/",(req,res)=>{
    res.status(200).send({"msg":"homepage"})
})

authRoutes.post("/register",async(req,res)=>{
    const {email,name,password} = req.body

    try {
        bcrypt.hash(password, 5, async function(err, hash) {
            
            const user = await userModel({email, name, password:hash})
            await user.save()
            res.status(200).json({msg: "successfully registered"})
        });
        
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})


authRoutes.post("/login",async (req,res)=>{
    const {email,password} = req.body

    try {
        const user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                // result == true
                if(result){
                    var token = jwt.sign({ foo: 'bar' }, 'masai');
                    res.status(200).json({msg: "user login successful", token: token});
                }else{
                    res.status(400).json({msg: "user login failed"})
                }
            });
           
        }else{
            res.status(400).json({msg: "wrong user credentials"})
        }
        
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})


module.exports = {
    authRoutes
}