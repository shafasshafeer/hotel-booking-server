// // import express from "express"
// // import cors from "cors"
// // import 'dotenv/config'
// // import connectDB from "./config/mongodb.js"
// // import connectCloudinary from "./config/cloudinary.js"
// // import hotelRouter from "./routes/hotelRoutes.js"


// // const app =express()

// // const port = process.env.PORT||4000

// // connectDB()
// // connectCloudinary()

// // app.use(cors())
// // app.use(express.json())

// // app.use('/api/hotel',hotelRouter)

// // app.get('/',(req,res)=>{
// //     res.send("API working")
// // })

// // app.listen(port,()=>console.log('server started on port: '+port) 
// // )



// // //   shafasshafeer_db_user

// // //  1G6Epm5YWR3ALMmG

// import express from "express";
// import cors from "cors";
// import 'dotenv/config';
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import hotelRouter from "./routes/hotelRoutes.js";

// const app = express();
// const port = process.env.PORT || 4000;

// connectDB();
// connectCloudinary();

// app.use(cors());
// app.use(express.json());

// app.use('/api/hotel', hotelRouter);  // ✅ Route: /api/hotel

// app.get('/', (req, res) => {
//     res.send("API working");
// });

// app.listen(port, () => console.log('server started on port: ' + port));




// import express from "express";
// import cors from "cors";
// import 'dotenv/config';
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import hotelRouter from "./routes/hotelRoutes.js";
// import reservationRoute from "./routes/reservationRoutes.js"


// const app = express();
// const port = process.env.PORT || 4000;

// console.log('🔍 Environment Check:');
// console.log('PORT:', port);
// console.log('MONGODB_URI:', process.env.MONGODB_URI?.replace(/\/\/.*@/, '//****:****@'));

// // Connect to databases
// connectDB();
// connectCloudinary();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/hotel', hotelRouter);
// // app.use('/api/reservation',reservationRoute)
// app.use('/api,reservation',reservationRoute)

// app.get('/', (req, res) => {
//     res.send("API working");
// });

// app.listen(port, () => {
//     console.log(`🚀 Server started on port: ${port}`);
//     console.log(`📡 Test URL: http://localhost:${port}/`);
// });

import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import hotelRouter from "./routes/hotelRoutes.js";
import reservationRouter from "./routes/reservationRoutes.js";
import userRouter from "./routes/userRoutes.js"; // Make sure this exists

const app = express();
const port = process.env.PORT || 4000;

console.log('🔍 Environment Check:');
console.log('PORT:', port);
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not set');

// Connect to databases
connectDB();
connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/hotel', hotelRouter);
app.use('/api/reservation', reservationRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send("API working");
});

app.listen(port, () => {
    console.log(`🚀 Server started on port: ${port}`);
    console.log(`📡 Test URL: http://localhost:${port}/`);
    console.log(`🏨 Hotel API: http://localhost:${port}/api/hotel`);
    console.log(`📅 Reservation API: http://localhost:${port}/api/reservation`);
    console.log(`👤 Admin Login: http://localhost:${port}/api/user/admin`);
});