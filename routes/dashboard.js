const router = require("express").Router();
const User = require("../models/User.js");
const mongoose = require("mongoose");

router.get("/dashboard/user/:id",async(req,res)=>{
	const { id } = req.params;
	try{
		const user = await User.findById(id);
		if(!user) return res.status(200).json({ msg: 'Item not found' });
		return res.json(user);
	}catch(error){
		return res.status(200).json({ msg:'Invalid ID format'})
	}
})

module.exports = router;