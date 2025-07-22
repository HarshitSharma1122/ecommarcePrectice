const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[2,"name should be atleast 2 character"],
    },
    email:{
        type:String,
        unique:true,
        required:true,
          trim: true,
  match: [
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Please enter a valid email address"
  ]
    },

    password:{
        type:String,
        required:true,
        minlength:[6,"password should min 6 character long"]
    },
    image: {
  type: String,
  required: true,
  match: [
    /\.(jpeg|jpg|gif|png|webp|svg)$/,
    "Please upload a valid image URL"
  ]
},
role:{
    type:String,
    enum:["admin","user"],
    default:"user"
},
gender:{
    type:String,
    enum:["male","female","other"],
    required:true
}

},{
    versionKey:false,
    timestamps:true,
    strict:true
})

const UserAuth=mongoose.model("UserAuth",UserSchema)

module.exports=UserAuth