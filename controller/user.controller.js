const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const UserSchema=require("../schema/Auth.schema")




const Register=async(req,res)=>{
    const data=req.body;

try {
    
if(!data?.email || !data?.password || !data?.name){
    return res.status(400).json({
success:false,
msg:"please send all data"
    })
}

const checkuserExist=await UserSchema.findOne({email:data?.email})

if(checkuserExist){
    return res.status(409).json({
        success:false,
        msg:"user already register , Please login"
    })
}

 const hash = await bcrypt.hash(data?.password, 5);
    

const newUserData=new UserSchema({name:data?.name,email:data?.email,password:hash,gender:data.gender})
await newUserData.save()


    const accessToken = jwt.sign(newUserData?._id, process.env.ACCESS_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload?._id, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      msg: "User registered successfully",
      accessToken,
      refreshToken,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender,
      },
    });

} catch (error) {
    res.status(500).json({
        success:false,
        msg:error.message
    })
}



}


const Login=async(req,res)=>{
    const{email,password}=req.body;

try {
    
const checkUser=await UserSchema.findOne({email})

if(!checkUser){
    return res.status(404).json({
        success:false,
        msg:"user not register "
    })
}

const isMatch = await bcrypt.compare(password, checkUser.password);

if (!isMatch) {
  return res.status(401).json({ msg: "Invalid credentials" });
}


const accessToken = jwt.sign(checkUser?._id, process.env.ACCESS_SECRET, { expiresIn: "15m" });
const refreshToken = jwt.sign(checkUser?._id, process.env.REFRESH_SECRET, { expiresIn: "7d" });



res.status(200).json({
  success: true,
  msg: "Login successful",
  accessToken,
  refreshToken,
  user: {
    id: user._id,
    name: checkUser.name,
    email: checkUser.email,
    role:checkUser.role,
    gender:checkUser.gender
  }
});

} catch (error) {
    res.status(500).json({
        success:false,
        mag:error.message
    })
}

}

const newAccessToken=async(req,res)=>{
    const{refresh_token}=req.body;

    try {

        if(!refresh_token){
    res.status(404).json({
        success:false,
        msg:"refreh token not provided , Please chack again!"
    })
}

const decoded = jwt.verify(refresh_token, process.env.REFRESH_SECRET);

if(!decoded){
    return res.status(401).json({
        success:false,
        msg:"Unauthorized token , please try again !"
    })
}

const checkuser=await UserSchema.findById(decoded)

const accessToken=jwt.sign(checkuser?._id,process.env.ACCESS_SECRET, {expiresIn:"15m"})

res.status(201).json({
    success:true,
    accessToken:accessToken
})

    } catch (error) {
        res.status(500).json({
            success:true,
            msg:error.message
        })
    }
}






module.exports={Register,Login,newAccessToken}