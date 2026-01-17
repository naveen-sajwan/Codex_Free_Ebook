const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
	item_id:{
		type:String
	},
	title:{
		type:String
	},
	coverUrl:{
		type:String
	},
	user:[{
		type: mongoose.Types.ObjectId,
		ref: "User", //model name
	}],
},{ timestamps: true})

const Favourite = mongoose.model("Favourite",favouriteSchema);

module.exports = Favourite;