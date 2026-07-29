// import mongoose from "mongoose";

// const hotelSchema = new mongoose.Schema({

//     name :{type:String,
//         require:true
//     },
//     price:{type:Number,
//         require:true
//     },
//     descdription :{type:String,
//         require:true
//     },
//     image :{type:String,
//         require:true
//     },
// date :{type:Number,
//         require:true
//     },
// })

// const hotelModel = mongoose.model.hotel || mongoose.model('hotel',hotelSchema)
// export default hotelModel

// import mongoose from "mongoose";

// const reservationSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     checkin: { type: String, required: true },
//     checkout: { type: String, required: true },
//     guests: { type: String, required: true },
//     roomName: { type: String, required: true },
//     roomId: { type: String, required: true },
// });

// export default mongoose.model("Reservation", reservationSchema);



// models/hotelModel.js
import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        default: Date.now
    }
}, { 
    timestamps: true 
});

// Use a different collection name to avoid conflicts
const hotelModels = mongoose.model('Hotel', hotelSchema);
export default hotelModels;