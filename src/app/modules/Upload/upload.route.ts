import express from 'express';
import cloudinary from '../../utils/cloudinary';
import upload from '../../middlewares/multer';
import Upload from './upload.model';

const router = express.Router();

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded.',
    });
  }
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    // Save the uploaded file details to the database
    const uploadedFile = await Upload.create({
      publicId: result.public_id,
      url: result.secure_url,  
      type: result.resource_type,
    });

    res.status(200).json({
      success: true,
      message: 'File uploaded and saved to database!',
      data: uploadedFile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Error uploading file.',
    });
  }
});

export const UploadRoutes = router;
