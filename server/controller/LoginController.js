import userModel from "../models/usersmodel.js";
import bcrypt from 'bcryptjs';

export const login = async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.json({success: false,message: 'Missing details'})
    }
    try{
        const userExist = await userModel.findOne({email})
        
            if (!userExist){
                return res.json({success: false,message:" User doesn't exist "});
                
            }
            //unhasedPassword
            const isPasswordMatch = await bcrypt.compare(password, userExist.password)
            if(!isPasswordMatch){
                res.json({success: false, message: 'Password does not match'});
 
            }

            const token_applied = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
            
                    //send token -> user in response -> add cookie(token is sent through it) to response
            res.cookie('token', token_applied, {
                httpOnly : true,
                secure: process.env.NODE_ENV === 'production', //if NODE_ENV is in production... it's true else, it's false
                sameSite: process.env.NODE_ENV=== 'production' ? 'none' : 'strict', //strict: if same server i.e. local host, none: if different environment
                maxAge: 7 * 24 * 60 * 60 * 100, //After 7days it should expire
                        
            })
            return res.json({success: true});
    }catch(e){
        res.json({success: false, message: error.message})
    }
}