// import jwt from "jsonwebtoken"

// const adminLogin = async(req,res)=>{
//     try {
        
// const {email,password}= req.body

// if(email===process.env.ADMIN_EMAIL && password=== process.env.ADMIN_PASSWORD){
//     const token = jwt.sign(email+password,process.env.JWT_SECRET)
//     res.json({success:true,token})
// }else{
//        res.json({success:false,message:"ivalid login details"})
 
// }

//     } catch (error) {
        
//         console.log(error);
//             res.json({success:false,message:"error loging in admin"})

//     }
// }

// export {adminLogin}

import jwt from "jsonwebtoken";

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('📝 Admin login attempt:', { email });

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Compare with environment variables
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        console.log('🔍 Admin credentials check:');
        console.log('Provided email:', email);
        console.log('Admin email:', adminEmail);
        console.log('Email match:', email === adminEmail);
        console.log('Password match:', password === adminPassword);

        if (email === adminEmail && password === adminPassword) {
            // Create token
            const token = jwt.sign(
                { 
                    email: email,
                    role: 'admin'
                }, 
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            res.json({
                success: true,
                token: token,
                message: "Admin login successful"
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid login details"
            });
        }
    } catch (error) {
        console.error('❌ Admin login error:', error);
        res.status(500).json({
            success: false,
            message: "Error logging in admin",
            error: error.message
        });
    }
};

export { adminLogin };