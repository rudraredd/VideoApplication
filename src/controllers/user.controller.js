import httpstatus from 'http-status';
import{User} from '../models/user.model.js';
import bcrypt, {hash}from 'bcrypt';
import crypto from "crypto"
const login= async (req, res) => {
    const {username,password}=req.body;
    if(!username || !password){
        return res.status(httpstatus.BAD_REQUEST).json({message:"Username and password are required"});
    }
    try{
        const user=await User.findOne({username});
        if(!user)
        {
            return res.status(httpstatus.NOT_FOUND).json({message:"User not found"});
        }
        if(bcrypt.compare(password,user.password)){
           let token=crypto.randomBytes(20).toString('hex');
              user.token=token;
                await user.save();
                return res.status(httpstatus.OK).json({token:token});
        }
    }catch(e){
           return res.status(httpstatus.INTERNAL_SERVER_ERROR).json({message:`something went wrong ${e}`});
    }
}
const register= async (req, res) => {
    const {name,username,password}=req.body;
    try{
        const existingUser=await User.findOne({username});
        if(existingUser){
            return res.status(httpstatus.FOUND).json({message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        // const newUser=newUser(
        //     {
        //         name:name,
        //         username:username,
        //         password:hashedPassword
        //     }
        // );
        // await newUser.save();
        const newUser = await User.create({
                name:name,
                username:username,
                password:hashedPassword
        })
        console.log(newUser)
        return res.status(httpstatus.CREATED).json({message:"User created successfully"});
    } catch(e){
        res.json({message:`something went wrong ${e}`});
    }
}
export {login,register};