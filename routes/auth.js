const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

//SIGNUP 

router.post("/register",async(req,res)=>{
	try{
		const { email,username,password } = req.body;
		const hashPassword = bcrypt.hashSync(password);
		const user = new User({ email,username,password:hashPassword });
		await user.save().then(()=>{
			return res.status(200).json({ msg:"Signed-Up Successfully" })
		})
	}catch(error){
		return res.status(200).json({msg:"User Already Exists"});
	}
})


//SignIN

router.post("/sign-in",async(req,res)=>{
	try{
		const user = await User.findOne({ email:req.body.email });
		if(!user){
			return res.status(200).json({msg:"Please! SignUp first"})
		}
		const isPassword = bcrypt.compareSync(req.body.password,user.password);
		if(!isPassword){
			return res.status(200).json({msg:"Bad Credentials"});
		}
		const {password,...others} = user._doc; // basically,it return all the properties of user._doc excluding password property.
		return res.status(200).json({ others,msg:"Signed-In Successfully"})
	}catch(error){
		return res.status(200).json({msg:"User Already Exists"})
	}
})

module.exports = router;