import multer from 'multer';

const storage = multer.diskStorage({
  filename: function (req: any, file: { originalname: any }, cb: (error: null, filename: any) => void) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
