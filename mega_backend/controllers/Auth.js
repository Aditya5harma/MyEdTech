const OTP = require("../models/OTP");
const User = require("../models/User");
const Profile = require("../models/Profile");
const jwt = require('jsonwebtoken');
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
require("dotenv").config();


//sendOTP controller

exports.sendOTP = async(req,res) => {
    try {

    //fetching email from request

        const{email} = req.body;

    //check if ussesr registered already

        const registered = await User.findOne({email});
        if(registered){
            return res.status(200).json({
                success: false,
                message: "user already exist try with another email"
            })
        }

    //generate a unique otp
        
        let oneOTP = 
                otpGenerator.generate(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
                })
         

        const notUnique = await OTP.findOne({oneOTP})

        while (notUnique) {
            oneOTP = oneOTP();
        }

    //store otp in db

        const uploadedOTP = OTP.create({
                                    email:email,
                                    otp: oneOTP
        })
        console.log(uploadedOTP)
        res.status(200).json({
            success:true,
            message:"otp sent successfully to the provided email address"
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error while generating otp",
            error:message.error
        })
    }
}


//signup controller

exports.signup = async(req,res) => {
    try {

    //fetching data from request

        const{
                firstName,
                lastName,
                email,
                password,
                accountType,
                confirmPassword,
                contactNumber,
                countryCode,
                otp
            } = req.body;

    //check for all data available 

        if( !firstName||
            !lastName||
            !email||
            !password||
            !accountType||
            !confirmPassword||
            !countryCode||
            !otp){
                return res.status(403).json({
                    success:false,
                    message:"please fill all the fields"
                })
            }

    //check if password and confirm password matches
        
        if (password !== confirmPassword) {
            return res.status(407).json({
                success:false,
                message:"confirmPassword and password fields are not matching"
            })
        }
            
    //chech for already registered user
        
        const registered = await User.findOne({email:email})
        if(registered){
            return res.status(400).json({
                success:false,
                message: "already exist user with the given email"
            })
        }

    //otp matching 

        const correctOTP = await OTP.findOne({email: email},{otp:1,_id:0})
        console.log(correctOTP);


            if (!correctOTP) {
                // OTP not found for the email
                return res.status(400).json({
                    success: false,
                    message: "The OTP is missing please resend OTP",
                });
            } 
            if (correctOTP.otp !== otp ) {
                // Invalid OTP
                return res.status(400).json({
                    success: false,
                    message: "The OTP is not valid",
                });
            }
        

    //hashing the password

        const hashedPassword = await bcrypt.hash(password,10)

        
    // Create the Additional Profile For User

		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});

    //creating user

        const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        countryCode,
        password: hashedPassword,
        accountType: accountType,
        additionalDetails: profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
    });


		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};

//Login

    exports.login = async(req,res)=>{
        try {
            const{email,password} = req.body;

    //validation check if all fields filled

        if(!email||!password){
            return res.status(404).json({
                success:false,
                message:"please fill all the fields"
            })
        }

    //validation check if user registerd or not 

        const registerdPassword = await User.findOne({email :email},{_id:0, password:1})
        console.log(registerdPassword);
        if(!registerdPassword){
            return res.status(402).json({
                success:false,
                message:"user not registerd please register first"
            })
        }

    //validation check if password enterd is correct

    if (!bcrypt.compare(password, registerdPassword.password)){
            return res.status(405).json({
                success:false,
                message:"enterd password is incorrect please enter the correct password"
            })
        }else{
            const user = await User.findOne({email})
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType
            };

    //create jwt token and setting it to response

            const token = jwt.sign(payload, process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                });

            user.password = undefined;
            user.token = token;

            const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
        }   
        } catch (error) {
            console.error(error);
            // Return 500 Internal Server Error status code with error message
            return res.status(500).json({
                success: false,
                message: `Login Failure Please Try Again`,
            });
        }
        
    }

//change Password controller

exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

	// Update password

		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

    // Send notification email

		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`,
//todo add html body after mail tamplate get ready
				
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};


