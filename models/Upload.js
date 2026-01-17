const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
	imageUrl: {
		type:String
	},
	url: {
		type:String
	},
	name: {
		type:String
	},
	user:[{
		type: mongoose.Types.ObjectId,
		ref: "User", //model name
	}],
},{ timestamps: true});

const Upload = mongoose.model("Upload",uploadSchema);
module.exports = Upload;