require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const pdfRoute = require('./routes/pdfRoutes.js');
const auth = require('./routes/auth.js');
const cors = require('cors');
const mail = require('./routes/mail.js');
const favouriteRoute = require('./routes/favorite.js');
const dashboardRoute = require('./routes/dashboard.js');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/niko",pdfRoute);
app.use("/niko/v1",auth);
app.use("/niko/v1",mail);
app.use("/niko/v1",favouriteRoute);
app.use("/niko/v1",dashboardRoute);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;

app.get("/", (req,res) => {
  app.use(express.static(path.resolve(__dirname,"client","build")));
  res.sendFile(path.resolve(__dirname,"client","build","index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});