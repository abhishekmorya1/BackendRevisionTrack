//  auth, isStudent. isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth 

exports.auth = (req,res,next)=>{
    try{
    //  extract jwt token
    // pending other ways to fetch token
       const token=req.body.token || req.cookies.token;

    //    if token is not present
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Token Missing",
        })
    }

    // verify the token
    try{
        const payload=jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);
    //   why this
        req.user=payload;
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"token is invalid",
        })
    }
    next();
    } 
    catch(error){
      return res.status(401).json({
        success:false,
        message:"something is wrong while verifying the token",
      })
    }
}

// for student

exports.isStudent= (req,res, next) =>{
    try{
        if(req.user.role!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for students",
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not matching",
          })
    }
}

// for admin

exports.isAdmin= (req,res, next) =>{
    try{
        if(req.user.role!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for admin",
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not matching",
          })
    }
}



