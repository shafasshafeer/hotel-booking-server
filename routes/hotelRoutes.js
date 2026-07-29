








// import express from 'express';
// import { addHotel, listHotel, removedHotel, singleHotel } from '../controllers/hotelController.js';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Create uploads folder if it doesn't exist
// const uploadDir = 'uploads';
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// // Use disk storage (since your controller uses req.file.path)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only image files are allowed'), false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 } // 5MB
// });

// const hotelRouter = express.Router();

// hotelRouter.post('/add', upload.single('image'), addHotel);
// hotelRouter.get('/list', listHotel);
// hotelRouter.get('/rooms/:id', singleHotel);
// hotelRouter.post('/remove', removedHotel);

// export default hotelRouter;





import express from 'express';
import { addHotel, listHotel, removedHotel, singleHotel } from '../controllers/hotelController.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create uploads folder if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { 
        fileSize: 10 * 1024 * 1024 // ✅ Increased from 5MB to 10MB
    }
});

const hotelRouter = express.Router();

// Add error handling for multer
hotelRouter.post('/add', (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'FILE_TOO_LARGE') {
                return res.status(400).json({
                    success: false,
                    message: 'File too large. Maximum size is 10MB'
                });
            }
            return res.status(400).json({
                success: false,
                message: err.message
            });
        } else if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
        next();
    });
}, addHotel);

hotelRouter.get('/list', listHotel);
hotelRouter.get('/rooms/:id', singleHotel);
hotelRouter.post('/remove', removedHotel);

export default hotelRouter;