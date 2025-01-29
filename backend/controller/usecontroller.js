import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const register =async(req,res)=>{
    try{
        const{fullName,userName,password,confirmPassword,gender}=req.body
        if(!fullName||!userName||!password||!confirmPassword||!gender){
            return res.status(400).json({message:"all fields are required"});
    }
    if(password!==confirmPassword){
        return res.status(400).json({
            message:"Password do not match"
        })
    }
    const user =await User.findOne({userName})
    if (user){
        return res.status(400).json({
            message:"Username already exist try different pls"
            
        })
    }
    const hashPassword=await bcrypt.hash(password,10)
     
    const maleProfilePic=`https://avatar.iran.liara.run/public/boy?username=${userName}`
    const femaleProfilePic=`https://avatar.iran.liara.run/public/girl?username=${userName}`
    await User.create({
        fullName,
        userName,
        password:hashPassword, 
        profilePic :gender==="male"? maleProfilePic:femaleProfilePic,
        gender
        
    })
    return res.status(201).json({
        message:"User created successfully",success:true
    })
}
catch(error)
{
console.log(error)
}
}
export const login =async(req,res)=>{
    try {
        const {userName,password}=req.body
        if (!userName||!password) {
            return res.status(400).json({message:"all fields are req uired"});
            
        }
        const user =await User.findOne({userName})
        if (!user) {
            return res.status(400).json({message:"Invalid username or password"});
            }
            const isMatch =await bcrypt.compare(password,user.password)
            if (!isMatch) {
                return res.status(400).json({message:"Invalid username or password"});

            }
            const tokenData={
                userId:user._id,
            }
            const token= await jwt.sign(tokenData,process.env.SECRET_KEY,{
              
                expiresIn:"1d"
            })
            return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:"strict"}).json({
                _id:user.id,
                userName:user.userName,
                fullName:user.fullName,
                profilePic:user.profilePic
            })
    } catch (error) {
        console.log(error)
    }
}
export const logout= async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
        })
    } catch (error) {
        console.log(error)
    }
}
export const getOtherUser=async (req,res)=>{
    try {
        const loggedInUserId =req.id
        const otherUser =await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        return res.status(200).json(otherUser)
    } catch (error) {
        console.log(error)        
    }
}