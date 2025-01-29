import mongoose from "mongoose";
 
const userModel =mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        // required:true,
        default:"",
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"],
    }
},{
    timestamps:true
}

);
export const  User=mongoose.model("User",userModel)