export const isLoggedIn =(req, res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json({ success: false, message: "Not logged in" });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.json({success: true, userId: decoded.id});
    }catch(error){
        return res.json({success: false, message:"Invalid Token"})
    }
}