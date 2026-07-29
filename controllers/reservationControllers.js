// import reservationModel from "../models/reservationModel";

// const createReservation = async (req,res)=>{

// try {
//     const {name,email,phone,checkin,checkout,guests,roomName,roomId}=req.body

//     if(!name || !email || !phone || !checkin || !checkout || !guests || !roomName || !roomId){

//         return res.json({message:"All fields are required"})
//     }
//     const newReservation = new reservationModel({name,email,phone,checkin,checkout,guests,roomName,roomId})


//     await newReservation.save();

//     res.json({message:"reservation created successfully",reservation:newReservation})
// } catch (error) {
    
// console.log(error);
// res.json({message:"error on creating reservation"})


// }

// }

// const getAllReservation = async (req,res)=>{
    
// try {
    
// const reservations = await reservationModel.find()
// res.json(reservations)

// } catch (error) {
//     console.log(error);
//     res.json({message:"error fetching reservation"})
    
// }

// }



// const deleteReservation = async (req,res)=>{
    
// try {
//     const {id}=req.params
//     await reservationModel.findByIdAndDelete(id)
//     res.json({message:"reservation deleted "})
// } catch (error) {
//     console.log(error);
//     res.json({message:"error deleting reservation"})
    
// }

// }

// export {createReservation,getAllReservation,deleteReservation}


import reservationModel from "../models/reservationModel.js";

const createReservation = async (req, res) => {
    try {
        const { name, email, phone, checkin, checkout, guests, roomName, roomId } = req.body;

        console.log('📝 Creating reservation:', req.body);

        if (!name || !email || !phone || !checkin || !checkout || !guests || !roomName || !roomId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newReservation = new reservationModel({
            name,
            email,
            phone,
            checkin,
            checkout,
            guests,
            roomName,
            roomId
        });

        await newReservation.save();

        res.status(201).json({
            success: true,
            message: "Reservation created successfully",
            reservation: newReservation
        });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            success: false,
            message: "Error on creating reservation",
            error: error.message
        });
    }
};

const getAllReservation = async (req, res) => {
    try {
        const reservations = await reservationModel.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: reservations.length,
            data: reservations
        });
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching reservation",
            error: error.message
        });
    }
};

const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedReservation = await reservationModel.findByIdAndDelete(id);
        
        if (!deletedReservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found"
            });
        }

        res.json({
            success: true,
            message: "Reservation deleted successfully",
            data: deletedReservation
        });
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            success: false,
            message: "Error deleting reservation",
            error: error.message
        });
    }
};

export { createReservation, getAllReservation, deleteReservation };