import jwt from 'jsonwebtoken'
import {User} from '../models/userModel'

export const verifyJWT = async (req , res , next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "");
        if(!token){
            return res.status(401).json("Unauthorize user");
        }
        let decodedUser = jwt.verify(token , process.env.JWT_ACCESS_SECRET);
        let user = await User.findById(decodedUser?.user.id).select("-password")
        if(!user){
            return res.status(401).json("invalid access token");
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json(error);
    }
}
