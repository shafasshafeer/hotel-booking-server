

// import express from "express";
// import cors from "cors";
// import 'dotenv/config';
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import hotelRouter from "./routes/hotelRoutes.js";
// import reservationRouter from "./routes/reservationRoutes.js";
// import userRouter from "./routes/userRoutes.js"; // Make sure this exists

// const app = express();
// const port = process.env.PORT || 4000;

// console.log('🔍 Environment Check:');
// console.log('PORT:', port);
// console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
// console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not set');

// // Connect to databases
// connectDB();
// connectCloudinary();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/hotel', hotelRouter);
// app.use('/api/reservation', reservationRouter);
// app.use('/api/user', userRouter);

// app.get('/', (req, res) => {
//     res.send("API working");
// });

// app.listen(port, () => {
//     console.log(`🚀 Server started on port: ${port}`);
//     console.log(`📡 Test URL: http://localhost:${port}/`);
//     console.log(`🏨 Hotel API: http://localhost:${port}/api/hotel`);
//     console.log(`📅 Reservation API: http://localhost:${port}/api/reservation`);
//     console.log(`👤 Admin Login: http://localhost:${port}/api/user/admin`);
// });



import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import hotelRouter from "./routes/hotelRoutes.js";
import reservationRouter from "./routes/reservationRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

console.log('🔍 Environment Check:');
console.log('PORT:', port);
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not set');

// Connect to databases
await connectDB();
await connectCloudinary();

// Middleware
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Test route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Hotel Booking API is running!',
        endpoints: {
            api: '/api',
            hotel: '/api/hotel',
            reservation: '/api/reservation',
            user: '/api/user',
            health: '/api/health'
        }
    });
});

// ✅ API info route
app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: "Hotel Booking API is running",
        endpoints: {
            hotel: '/api/hotel',
            reservation: '/api/reservation',
            user: '/api/user',
            health: '/api/health'
        }
    });
});

// ✅ Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        mongodb: 'connected',
        cloudinary: 'connected'
    });
});

// ✅ Routes
app.use('/api/hotel', hotelRouter);
app.use('/api/reservation', reservationRouter);
app.use('/api/user', userRouter);

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.listen(port, () => {
    console.log(`🚀 Server started on port: ${port}`);
    console.log(`📡 Test URL: http://localhost:${port}/`);
    console.log(`🏨 Hotel API: http://localhost:${port}/api/hotel`);
    console.log(`📅 Reservation API: http://localhost:${port}/api/reservation`);
    console.log(`👤 Admin Login: http://localhost:${port}/api/user/admin`);
});