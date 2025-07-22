const jwt=require("jsonwebtoken")
const UserSchema=require("../schema/Auth.schema")

const Authentication=async(req,res,next)=>{
     if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ success:false,msg: 'Not authorized, no token provided' });
    }
try {  
const token = req.headers.authorization.split(' ')[1];
jwt.verify(token, process.env.ACCESS_SECRET,async function(err, decoded) {
if(err){
    return res.status(500).json({
        success:false,
        msg:err.message
    })
}
const isUserExit=await UserSchema.findById(decoded).select("-password").lean()
if(!isUserExit){
  return  res.status(404).json({
        success:false,
        msg:"User not Found , Account mismatched !"
    })
}

req.user_details=isUserExit
next()
});
} catch (error) {
   res.status(500).json({
    success:false,
    msg:error.essage
}) 
}
}



const Authorization=(allowRoles)=>{
    return async(req,res,next)=>{
        try {     
const{role}=req.user_details;

if(!allowRoles.includes(role.toString())){
    return res.status(403).json({
        success:false,
        msg:"you are not authorized for this action"
    })
}
next()
        } catch (error) {
            
            res.status(500).json({
                success:false,
                msg:error.message
            })
        }
    }
}




module.exports={Authentication,Authorization}