// // import {v2 as cloudinary}from 'cloudinary'

// // const connectCloudinary = async ()=> {
// //     cloudinary.config({
// //         cloud_name:process.env.CLOUDINARY_NAME,
// //         api_key:process.env.CLOUDINARY_API_KEY,
// //         api_secret:process.env.CLOUDINARY_SECRET_KEY
// //     })
// // }

// // export default connectCloudinary


// import { v2 as cloudinary } from 'cloudinary';

// const connectCloudinary = () => {
//     try {
//         cloudinary.config({
//             cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//             api_key: process.env.CLOUDINARY_API_KEY,
//             api_secret: process.env.CLOUDINARY_API_SECRET
//         });
//         console.log('✅ Cloudinary connected successfully');
//         console.log(`📁 Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
//     } catch (error) {
//         console.error('❌ Cloudinary connection error:', error);
//     }
// };

// export default connectCloudinary;

import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        console.log('✅ Cloudinary connected successfully');
        console.log(`📁 Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    } catch (error) {
        console.error('❌ Cloudinary connection error:', error);
    }
};

export default connectCloudinary;