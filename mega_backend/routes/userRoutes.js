const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions

const {
        login,
        signup,
        sendOTP,
        changePassword,
} = require("../controllers/Auth")

const {
        resetPasswordToken,
        resetPassword,
} = require("../controllers/ResetPassword")

const { auth } = require("../middlewares/auth")


// for user login

router.post("/login", login)

// for user signup

router.post("/signup", signup)

// for sending OTP to the user's email

router.post("/sendotp", sendOTP)

// for Changing the password

router.post("/changepassword", auth, changePassword)

// for generating a reset password token

router.post("/reset-password-token", resetPasswordToken)

// for resetting user's password after verification

router.post("/reset-password", resetPassword)


module.exports = router