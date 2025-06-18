const mongoose =require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    verifyOTP: {type: String, default: ''},
    verifyOTPExpireAt: {type: Date, default: 0},
    status :{type: Boolean, default: false},
    resetOtp : {type:String, default: ''},
    resetOptExpireAt: {type: Date, default: 0},
})



const userModel = mongoose.model("User", UserSchema)

module.exports= userModel