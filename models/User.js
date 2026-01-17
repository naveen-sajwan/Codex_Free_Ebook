const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email:{
		type:String,
		unique:true,
		required:true,
	},
	username:{
		type:String,
		required:true,
	},
	password:{
		type:String,
		required:true
	},
	favourite:[{
		type: mongoose.Types.ObjectId,
		ref: "Favourite",
	}],
	upload:[{
		type: mongoose.Types.ObjectId,
		ref: "Upload",
	}]
})

module.exports = mongoose.model("User",userSchema);