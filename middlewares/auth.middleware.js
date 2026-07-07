// trying to find the user based off the token of  the user that is trying to make request.
//looks if it is there then decodes it, verifies that user is logged in then it attaches it to the re. so that later on we can find out who exactly is making the request

// someone is making a request to get user details --> calls authorize middleware --> verify who is trying to do it --> if valid --> next --> get user details

import { JWT_SECRET } from "../config/env.js";
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

const authorize = async(req,res,next)=>{
    try {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];  //gets the actual token by splitting the string after space 
        }

        if(!token) return res.status(401).json({message:'Unauthorized'});

        const decoded = jwt.verify(token,JWT_SECRET);

        const user =  await User.findById(decoded.userId);

        if(!user) return res.status(401).json({message:'Unauthorized'});

        //if user exists we attach it to the req that is being made
        req.user = user;
        next();
        
    } catch (error) {
        res.status(401).json({message:'Unauthorized',error: error.message})
    }
}

export default authorize;