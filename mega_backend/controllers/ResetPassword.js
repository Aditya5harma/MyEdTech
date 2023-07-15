const User = require("../models/User")
const { v4: uuidv4 } = require('uuid');
const resetToken = require("../models/reset token");
const bcrypt = require("bcrypt")


exports.resetPasswordToken = async(req,res) => {
    try {
        const{email} = req.body
        console.log(email)
        
    //entry filled or not 

        if(!email){
            return res.status(404).json({
                success:false,
                message:"email field empty please fill email first"
            });
        }

    //check user registered with this email

        const registeredUser = await User.findOne({email})
        console.log(registeredUser)

        if(!registeredUser){
            return res.status(400).json({
                success:false,
                message:"user not registered with this email please do signup first"
            })
        }

    //generate uuid as token to pass in parameter of the frontend's url 

        const token = uuidv4();
        console.log(`token is ${token}`)

    //store the token in db and send it by passing inside the url through email

        const response = await resetToken.create({ 
            email:email,
            token:token
        })
        console.log(response)

        res.status(200).json({
            success: true,
            message:"password reset email sent successfully please check your registered email for password reset url"
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            response,
            message:"error in password reset"
        })
    }
}



exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await resetToken.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid or got expired",
			});
		}

		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ email: userDetails.email},
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};