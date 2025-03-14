
const bcrypt = require('bcrypt');
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signup router holder

exports.signup = async(req,res) => {
    try{
        // get data
        const {name, email, password, role } = req.body;
        // check if user already exist
        const exisitngUser = await User.findOne({email});

        if(exisitngUser){
          return res.status(400).json({
            success:false,
            message:"user/email already exist",
          })  
        }

        // secure the password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"error in hashing passowrd",
            })
        }

        // create entry for user
        const user = await User.create({
            name,email,password:hashedPassword,role
        })

        return res.status(200).json({
            success:true,
            message:"User created succesfully",
        })

    }
    catch(error){
       console.error(error);
       return res.status(500).json({
        success:false,
        message:"user cannot be registered, please try again later",
       })
    }
}

// login

exports.login = async(req, res) =>{
    try{
    //   data fetch
       const {email, password} = req.body;

    //    validation on email and password
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:"please fill all the details carefully",
            });
        }

        // check user is present or not
        
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"user is not registered",
            })
        }

        const payload={
            email:user.email,
            id:user._id,
            role:user.role,
        }

        // verify password and generate a jwt token
        if(await bcrypt.compare(password, user.password)){
        //    if password match login proceed and generate token

              let token = jwt.sign(payload, process.env.JWT_SECRET, 
                {
                  expiresIn:"2h",
                }
            );

            let userData = user.toObject(); // Converts Mongoose doc to a plain object
            userData.token = token;
            userData.password = undefined; // Remove password from response

            const options={
                 expires: new Date(Date.now() + 3*24*60*60*1000),
                 httpOnly:true,
            }

            res.cookie("token", token, options ).status(200).json({
                success:true,
                token,
                user:userData,
                message:"user logged in successfully",
            });

        }
        else{
            // password do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            })
        }

    }
    catch(err){
         console.error(err);
         return res.status(500).json({
            success:false,
            message:"Login Failure",
         })
    }
}
