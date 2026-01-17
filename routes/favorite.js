const router = require("express").Router();
const User = require("../models/User.js");
const Favourite = require("../models/Favourite.js"); // Capitalized model name (good practice)

// save favorite
router.post("/savefavorite", async (req, res) => {
  try {
    const { userId, title, coverUrl, id } = req.body;

    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(401).json({ msg: "Please sign up first" });
    }

    // Check if this favorite already exists for this user
    const alreadyFavorited = await Favourite.findOne({ item_id: id, user: existingUser });
    console.log(`alreadyFavorited Book Details : ${alreadyFavorited}`);
    if (alreadyFavorited) {
      return res.status(200).json({ msg: "Book already in favorites" });
    }


    // Save new favorite
    const favoriteBook = new Favourite({
      item_id: id,
      title,
      coverUrl,
      user: existingUser,
    });

    await favoriteBook.save();

    // Add to user's favorite list
    existingUser.favourite.push(favoriteBook);
    await existingUser.save();

    return res.status(201).json({ favoriteBook , msg:"book Added Successfully" });
  } catch (error) {
    console.error("Error saving favorite:", error);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.get("/getfavorite/:id",async(req,res)=>{
  try{
    const favoriteList = await Favourite.find({user:req.params.id}).sort({createdAt: -1});
    if(favoriteList!==0){
      return res.status(200).json({favoriteList:favoriteList});
    }else{
      return res.status(200).json({ msg:"Empty Favourite List" });
    }
  }catch(error){
    return res.status(200).json({ msg:"Something went wrong" });
  }
})

 module.exports = router;

