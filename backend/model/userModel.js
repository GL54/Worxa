const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Enter your name']
    },
    dob:{
        type:String,
        required:[true,'Enter your Date of Birth']
    },
    phone:{
        type:String,
        required:[true,'Enter your Phone number'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'Enter your Email'],
        unique:true

    },
    location:{
        type:String,
        required:[true,'Choose your location']
    },
    wlocation:{
        type:String,
        required:[false,'Choose your location']
    },
    wduration:{
        type:String,
        required:[false,'Choose your location']
    },
    password:{
        type:String,
        required:[true,'Enter your Password']

    },
    type:{
        type:String,
        required:[false,'Enter your type'],
        default:'user'
    },
    job:{
        type:String,
        required:[false,'Enter your job'],
        default:'none'
    },
    price:{
        type:String,
        required:[false,'Enter your rate'],
        default:0
    },
    sjob:{
        type:String,
        required:[false,'Enter your job'],
        default:'none'
    },
    sprice:{
        type:String,
        required:[false,'Enter your rate'],
        default:0
    },
    rating:{
        type:String,
        required:[false,'Enter your rating'],
        default:0
    },
    verify:{
        type:Boolean,
        required:[false]
    },
    image:{
        url:String,
        public_id:String,
    },
    ratedUsers:[{ratedUser:String,value:String}]
    
    
},
{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema)