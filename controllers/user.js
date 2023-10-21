import { User } from "../models/user.js";
import { sendCookie } from "../utils/features.js";


export const getAllUsers = async (req, res) => { };

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select("+password");

    if (!user)
        return res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });
    
    let isMatch = false
    if(password===user.password)isMatch=true
    
    if (!isMatch)
        return res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });
    
    sendCookie(user, res, `Welcome back ${user.name}`, 200); 
};

export const register = async (req, res) => {
    const {name,email,password} = req.body;
    let user = await User.findOne({ email });

    if (user)
        return res.status(404).json({
            success: false,
            message: "User already exist",
        });
    
    else
        user=await User.create({ name, email, password });
        
    sendCookie(user, res, "registered successfully", 201);
};

export const getMyProfile = (req, res) => {     
       res.status(200).json({
        success: true,
        user:req.user,
    });
};

export const logout = (req, res) => {     
    res.status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            sameSite: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
        success: true,
    });
};
