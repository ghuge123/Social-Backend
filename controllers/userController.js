import User from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const generateToken = async (id)=>{
    try {
        let user = await User.findById(id);
        const accessToken = jwt.sign({user : {id : user.id , email : user.email}} , process.env.JWT_ACCESS_SECRET , {expiresIn: '1h'});
    
        return {accessToken};
    } catch (error) {
        return error;
    }
}

export const userRegistration = async (req , res)=>{
    try{
        let {username , email , password} = req.body; // data from form and req body
    
        let user = await User.findOne({
            $or : [{username} , {email}]
        });


        if(user){
            return res.status(409).send({message: 'User with this username or email is already exist!' , success: false});
        }

        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(password , salt);

        user = new User({
            username : username,
            email : email,
            password : newPass
        })

        await user.save();

        res.send({message: 'user Register successfully' , success: true});
    } catch(err){
        res.status(500).send({ message: "Internal Server Error", success: false });
    }
}

export const userLogin = async (req , res) => {
    let {username , email , password} = req.body;

    if (!username && !email) {
    return res.status(400).send({
        message: "Please provide username or email",
        status: false
  });
}

    let user = await User.findOne({
        $or : [{username} , {email}]
    });

    if(!user){
        return res.status(404).send({message: "user with this username or email doesn't exist" , status : false});
    }

    const isUser = await bcrypt.compare(password , user.password);

    if(!isUser){
        return res.status(400).send({ message: "Invalid credentials!", success: false });
    }

    const {accessToken} = await generateToken(user._id);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json({ message: "user logged in successfully", success: true })
}

export const getMe = (req, res) => {
    console.log(req.user);
  return res.status(200).json({
    isLoggedIn: true,
    userId: req.user._id,
    username: req.user.username
  });
};

export const logout = (req , res) => {
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .json({ message: "user loggOut successfully", success: true });
}