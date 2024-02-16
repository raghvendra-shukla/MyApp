var jwt = require('jsonwebtoken');
// const JWT_SECRET="Rannyisagood$boy";

const middelware=(req,res,next)=>{
    const token=req.header("auth-token");
    try {
        if(token){next();};
    } catch (error) {
        res.send("please enter a valid token");
    }
}

module.exports=middelware;