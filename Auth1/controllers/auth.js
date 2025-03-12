
const bcrypt = require('bcrypt');
const User = require("../models/User");

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


