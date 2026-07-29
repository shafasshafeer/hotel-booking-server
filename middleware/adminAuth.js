// import jwt from 'jsonwebtoken'


// const adminAuth = async(req,res,next)=>{
//     try {
        

//         const {token}= req.headers
//         if(!token){
//             return res.json({success:false,message:"unauthorized User"})
//         }
//         const token_decode = jwt.verify(token,process.env.JWT_SECRET)

//         if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
//             return res.json({success:false,message:" User not unauthorized"})
//         }
//         next()
//     } catch (error) {
//                     return res.json({success:false,message:" authentication not successfull"})

//     }
// }

// export default adminAuth


import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] || req.headers.token;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided"
            });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if it's an admin
        if (decoded.role !== 'admin' && decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({
                success: false,
                message: "Access denied - Admin only"
            });
        }
        
        req.admin = decoded; // Attach admin data to request
        next();
    } catch (error) {
        console.error('❌ Auth error:', error);
        return res.status(401).json({
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
};

export default adminAuth;