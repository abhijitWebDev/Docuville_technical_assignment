import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractDataFromImage } from '../controllers/ocr.js';
import { saveLicenseDataToDatabase } from '../controllers/database.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/', upload.single('image'), async (req, res) => {
  const filePath = path.join(__dirname, '../../', req.file.path);

  try {
    const documentData = await extractDataFromImage(filePath);
    res.status(200).json(documentData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing document');
  }
});

export default router;
