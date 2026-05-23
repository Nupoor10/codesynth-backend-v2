const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const generateJwtToken = require("../utils/generateJwtToken");

const userLogin = async(req, res) => {
    try {
        const { email, password } = req.body;
        const exisitingUser = await User.findOne({email : email});

        if (!exisitingUser) {
            return res.status(404).json({
                message : 'User not found'
            })
        }

        const hashedPassword = exisitingUser.password;
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
        if(!isPasswordCorrect) {
            return res.status(401).json({
                message : 'Incorrect Password'
            })
        }

        const jwtToken = generateJwtToken(exisitingUser._id);
        if (!jwtToken) {
            return res.status(500).json({
                message : 'Error creating JWT Token'
            })
        }

        return res.status(200).json({
            message : 'User Logged in successfully',
            exisitingUser,
            jwtToken
        })
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message : "User Login Unsuccessful",
            error: error.message
        })
    }
}

const userRegistration = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const exisitingUser = await User.findOne({email : email})
        
        if (exisitingUser) {
            return res.status(409).json({
                message : 'User already exists'
            })
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            return res.status(500).json({
                message : 'Password could not be hashed'
            })
        }
    
        const newUser = await new User({username, email, password : hashedPassword});
        await newUser.save();
    
        return res.status(201).json({
            message : 'User created successfully',
            newUser
        })
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message : "User Registration Unsuccessful",
            error: error.message
        })
    }
}

module.exports = {
    userLogin,
    userRegistration
}