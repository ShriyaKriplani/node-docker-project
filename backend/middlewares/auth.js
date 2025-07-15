import jwt from 'jsonwebtoken'
const isAuthenticated = async (req,res,next)=>{
    try{
    const token = req.cookies.token;
    //console.log(token)
    if(!token){
        return res.status(401).json({
            success:false,
            error:true,
            message:"Token not found"
        })
    }
    const decodedToken = await jwt.decode(token,process.env.SECRET_KEY)
    if(!decodedToken)
    {
         return res.status(401).json({
            success:false,
            error:true,
            message:"Invalid Token"
        })
    }
    req.id = decodedToken.userId
    next();
}
catch(err)
{
     return res.status(401).json({
            success:false,
            error:true,
            message:"Error is authenticated"+err
        })
}
}
export default isAuthenticated