require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const upload = require("../middleware/upload.js");
const router = express.Router();
const User = require("../models/User.js");
const Upload = require("../models/Upload.js");


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

//routes++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.post('/upload', upload.single('pdf'), async (req, res) => {
    const filePath = req.file.path;
    const fileName = req.file.originalname;
    const { userId } = req.body;

  try {

    // upload secure pdf to cloudinary
    const cloudRes = await cloudinary.uploader.upload(filePath,{
      folder: 'Codex_app',
      resource_type: 'auto',
      public_id: `${Date.now()}-${fileName}`,
    });

    fs.unlinkSync(filePath); // delete local path

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(401).json({ msg: "Please sign up first" });
    }

    const urlname = cloudRes.secure_url.slice(0, -4) + ".jpg";

    const newFile = new Upload({
      imageUrl: urlname,
      url: cloudRes.secure_url,
      name: fileName,
      user: existingUser,
    })

    await newFile.save();
    existingUser.upload.push(newFile);
    await existingUser.save();

    // Return Secure Url from Cloudinary
    res.json({
      url: cloudRes.secure_url,
      imageUrl: urlname,
      name: fileName,
    })

  }catch(error){
    console.error(error);
    fs.unlinkSync(filePath);
    res.status(200).json({msg: `Upload failed`});
  }  
});

// Route to get Uploaded Files here
router.get("/uploadedFiles/:id",async(req,res)=>{
  try{
    const filesList = await Upload.find({user:req.params.id}).sort({createdAt: -1});
    if(filesList.length === 0){
      return res.status(200).json({msg:"Empty filesList"});
    }else{
      return res.status(200).json({ filesList:filesList });
    }
  }catch(error){
    return res.status(200).json({msg:"Something went wrong"});
  }

})

// Route to gett all the Uploaded files here =>
router.get("/AllUploads",async(req,res)=>{
  try{
    const allUploads = await Upload.find().sort({createdAt: -1});
    if(allUploads.length === 0){
      return res.status(200).json({ msg:"Uploads is Empty" });
    }else{
      return res.status(200).json({ allUploads });
    }
  }catch(error){
    return res.status(200).json({msg:"something Fishy in your Uploads Model"});
  }
})


// Route to search for free eBooks
router.get('/api/books', async (req, res) => {
  try {
    const { query, page = 1, limit = 100 } = req.query;
    
    const response = await axios.get(
      `https://archive.org/advancedsearch.php?q=mediatype:"texts"+AND+subject:${query}&fl[]=identifier,title,creator,date&rows=${limit}&output=json`
      );
    
    const books = response.data.response.docs.map(book => ({
      id: book.identifier,
      title: book.title,
      author: book.creator?.[0] || 'Unknown',
      formats: book.format,
      description: book.description?.[0] || '',
      subjects: book.subject || [],
      coverUrl: `https://archive.org/services/img/${book.identifier}`
    }));
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Route to get download links for a specific book
router.get('/api/books/:id/download', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://archive.org/metadata/${id}`);
    console.log(id);
    const metadata = response.data;
    const files = metadata.files
      .filter(file => file.format.toUpperCase().includes("PDF"))
      .map(file => ({
        format: file.format,
        url: `https://archive.org/download/${id}/${file.name}`,
        size: (file.size)/1000000
      }));

      console.log(files);
    
    res.json({
      id:id,
      title: metadata.metadata.title,
      downloadLinks: files,
      coverUrl: `https://archive.org/services/img/${id}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch download links' });
  }
});

module.exports = router;





