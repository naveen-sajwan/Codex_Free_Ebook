require("dotenv").config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const API_KEY = process.env.VIRUS_API_KEY;
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path));

    const response = await axios.post(
      'https://www.virustotal.com/api/v3/files',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'x-apikey': API_KEY,
        },
      }
    );

    const analysisId = response.data.data.id;

    // Optionally delete local file
    fs.unlinkSync(req.file.path);

    res.json({ analysisId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'VirusTotal upload failed' });
  }
});

router.get('/report/:id', async (req, res) => {
  try {
    const result = await axios.get(
      `https://www.virustotal.com/api/v3/analyses/${req.params.id}`,
      {
        headers: { 'x-apikey': API_KEY },
      }
    );

    res.json(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch report' });
  }
});

module.exports = router;
