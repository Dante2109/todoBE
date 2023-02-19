const jwt=require("jsonwebtoken");
const authenticate=(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        jwt.verify(token, 'shhhhh', function(err, decoded) {
            if(decoded){
                req.body.user=decoded.userId
                next()
            }else{
            res.send("Access denied")
        }
    });
    }else{
        res.send("Login first please")
    }

}
module.exports={
    authenticate
}