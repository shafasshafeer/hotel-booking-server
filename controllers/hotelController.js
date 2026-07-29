// import hotelModel from "../models/hotelModels.js";

// import {v2 as cloudinary} from 'cloudinary'

// const addHotel = async (req,res)=>{


//   try {
//       const {name,price,description}=req.body;
//     const image = req.file;
//     let imageUrl = ""

//     if(image){
//         let result = await cloudinary.uploader.upload(image.path,{resource_type:'image'})
//         imageUrl=result.secure_url
//     }else{
//         imageUrl="http://via.placeholde.com/150"
//     }



//     const hotelData ={
//         name ,description,price:Number(price),
//         image:imageUrl,
//         date : Date.now()
//     }

//     const hotel = new hotelModel(hotelData)
//     await hotel.save()


//     res.json({success:true,message:"hotel room added successfully"})
//   } catch (error) {
//     console.log(error);
//         res.json({success:true,message:" error on adding hotel"})

//   }



// res.json({success:true,message:'hotel room added successfully'})
// }



// import hotelModel from "../models/hotelModels.js";
// import { v2 as cloudinary } from 'cloudinary';

// const addHotel = async (req, res) => {
//     try {
//         console.log('📝 Received body:', req.body);
//         console.log('📷 Received file:', req.file);

//         const { name, price, description } = req.body;
        
//         if (!name || !price || !description) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing required fields: name, price, description",
//                 received: { name, price, description }
//             });
//         }

//         const image = req.file;
//         let imageUrl = "https://via.placeholder.com/150";

//         if (image) {
//             try {
//                 const result = await cloudinary.uploader.upload(image.path, {
//                     resource_type: 'image',
//                     folder: 'hotels'
//                 });
//                 imageUrl = result.secure_url;
//                 console.log('✅ Image uploaded:', imageUrl);
//             } catch (uploadError) {
//                 console.error('❌ Cloudinary upload error:', uploadError);
//             }
//         }

//         const hotelData = {
//             name: name.trim(),
//             description: description.trim(),
//             price: Number(price),
//             image: imageUrl,
//             date: Date.now()
//         };

//         console.log('💾 Saving hotel data:', hotelData);

//         const hotel = new hotelModel(hotelData);
//         const savedHotel = await hotel.save();

//         res.json({
//             success: true,
//             message: "Hotel room added successfully",
//             data: savedHotel
//         });

//     } catch (error) {
//         console.error('❌ Error:', error);
//         res.status(500).json({
//             success: false,
//             message: "Error on adding hotel",
//             error: error.message
//         });
//     }
// };







// const listHotel = async (req, res) => {
//     try {
//         const hotels = await hotelModel.find().sort({ createdAt: -1 });
//         res.json({
//             success: true,
//             count: hotels.length,
//             data: hotels
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({
//             success: false,
//             message: "Error fetching hotels",
//             error: error.message
//         });
//     }
// };


// const removedHotel = async (req,res)=>{
//         try {
//             await hotelModel.findByIdAndDelete(req.body._id)
//             res.json({success:true,message:'hotel room removed'})

//         } catch (error) {
//             res.json({success:true,message:' error hotel room removing '})

//         }
// }


// const singleHotel = async (req,res)=>{
//         try {
//             const hotel = await hotelModel.findById(req.params.id)
//             if(!hotel) return res.json({message:"room not found"})
//                 res.json({hotel})
            
//         } catch (error) {
//             console.log(error);
//             res.json({success:true,message:' error on  hotel details fetching'})
//         }

// }


// export {addHotel,removedHotel,listHotel,singleHotel}











import hotelModel from "../models/hotelModels.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const addHotel = async (req, res) => {
    try {
        console.log('📝 Received body:', req.body);
        console.log('📷 Received file:', req.file);

        const { name, price, description } = req.body;
        
        if (!name || !price || !description) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: name, price, description",
                received: { name, price, description }
            });
        }

        let imageUrl = "https://via.placeholder.com/150";

        if (req.file) {
            try {
                let result;
                
                // Check if file has path (disk storage) or buffer (memory storage)
                if (req.file.path) {
                    // Disk storage - use path
                    result = await cloudinary.uploader.upload(req.file.path, {
                        resource_type: 'image',
                        folder: 'hotels'
                    });
                    
                    // Remove local file after upload
                    if (fs.existsSync(req.file.path)) {
                        fs.unlinkSync(req.file.path);
                    }
                } else if (req.file.buffer) {
                    // Memory storage - use buffer
                    result = await cloudinary.uploader.upload(
                        `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
                        {
                            resource_type: 'image',
                            folder: 'hotels'
                        }
                    );
                }
                
                imageUrl = result.secure_url;
                console.log('✅ Image uploaded:', imageUrl);
                
            } catch (uploadError) {
                console.error('❌ Cloudinary upload error:', uploadError);
                // Keep default placeholder image
            }
        }

        const hotelData = {
            name: name.trim(),
            description: description.trim(),
            price: Number(price),
            image: imageUrl,
            date: Date.now()
        };

        console.log('💾 Saving hotel data:', hotelData);

        const hotel = new hotelModel(hotelData);
        const savedHotel = await hotel.save();

        res.json({
            success: true,
            message: "Hotel room added successfully",
            data: savedHotel
        });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            success: false,
            message: "Error on adding hotel",
            error: error.message
        });
    }
};

// const listHotel = async (req, res) => {
//     try {
//         const hotels = await hotelModel.find().sort({ createdAt: -1 });
//         res.json({
//             success: true,
//             count: hotels.length,
//             data: hotels
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({
//             success: false,
//             message: "Error fetching hotels",
//             error: error.message
//         });
//     }
// };


const listHotel = async (req, res) => {
    try {
        const hotels = await hotelModel.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: hotels.length,
            data: hotels  // ✅ This should be 'data' not 'hotels'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching hotels",
            error: error.message
        });
    }
};

const removedHotel = async (req, res) => {
    try {
        await hotelModel.findByIdAndDelete(req.body._id);
        res.json({ success: true, message: 'Hotel room removed' });
    } catch (error) {
        console.error('Error removing hotel:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error removing hotel room',
            error: error.message 
        });
    }
};

const singleHotel = async (req, res) => {
    try {
        const hotel = await hotelModel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ 
                success: false, 
                message: "Room not found" 
            });
        }
        res.json({ 
            success: true, 
            hotel 
        });
    } catch (error) {
        console.error('Error fetching hotel:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching hotel details',
            error: error.message 
        });
    }
};

export { addHotel, removedHotel, listHotel, singleHotel };