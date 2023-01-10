const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signIn = async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        res.status(404).json({success:false,message:'user does not exist'})
    }else{
        if(user){
            // check password with hashPassword
            const confirmPassword = await bcrypt.compare(password,user.password);
            if (!confirmPassword){
                return res.status(400).json({ success:false, message: "Invalid credentials" });
            }
    
            const token = jwt.sign({email:user.email,id:user._id},process.env.JWT_SIGNING_KEY,{expiresIn:'2h'});
            res.status(200).json({success:true,user,token});
        }else{
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}

const signUp = async (req,res)=>{
    const {email,password,firstName,lastName} = req.body;
    const checkUser = await User.findOne({email});

    if(checkUser){
        res.status(400).json({success:false,message:'user already exits'})
    }else{
        const hassPassword = await bcrypt.hash(password,12);
        const user = await User.create({email:email,password:hassPassword,name:`${firstName} ${lastName}`});
        if(user){
            const token = jwt.sign( { email: user.email, id: user._id }, process.env.JWT_SIGNING_KEY, { expiresIn: "2h" } );
            res.status(201).json({success:true,user,token});
        }else{
            res.status(500).json({success:false, message: "Something went wrong" });
        }
    }
    // convert password into hassPassword
    
}

module.exports = {
    signIn,
    signUp
}