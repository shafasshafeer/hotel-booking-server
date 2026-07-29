// // import mongoose from "mongoose";

// // const connectDB = async ()=>{
// //     mongoose.connection.on('connected' , ()=>{
// //         console.log("connection establisher")
// //     })

// //     await mongoose.connect(`${process.env.MONGODB_URI}/hotel`)
// // }

// // export default connectDB


// import mongoose from 'mongoose';

// const connectDB = async () => {
//     try {
//         // HARDCODED - Remove /hotel from w=majority
//         const uri = "mongodb+srv://shafasshafeer_db_user:1G6Epm5YWR3ALMmG@cluster0.bn52hit.mongodb.net/travel-booking?retryWrites=true&w=majority";
        
//         console.log('📡 Connecting to MongoDB...');
//         console.log('🔗 URI:', uri.replace(/\/\/.*@/, '//****:****@'));
        
//         const conn = await mongoose.connect(uri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             serverSelectionTimeoutMS: 5000,
//             socketTimeoutMS: 45000,
//         });
        
//         console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//         console.log(`📦 Database: ${conn.connection.name}`);
//         return conn;
//     } catch (error) {
//         console.error(`❌ MongoDB Error: ${error.message}`);
//         process.exit(1);
//     }
// };

// export default connectDB;


import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in .env file');
        }
        
        console.log('📡 Connecting to MongoDB...');
        
        // Simply connect without deprecated options
        const conn = await mongoose.connect(uri);
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📦 Database: ${conn.connection.name}`);
        return conn;
    } catch (error) {
        console.error(`❌ MongoDB Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;