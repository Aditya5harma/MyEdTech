const express = require("express")
const router = express.Router()

const { auth } = require("../middlewares/auth")

const {
        updateProfile,
        deleteAccount,
        getAllUserDetails,
        updateDisplayPicture,
        getEnrolledCourses,
    } = require("../controllers/profile")

// Update Profile

router.put("/updateProfile", auth, updateProfile)

// Delet User Account

router.delete("/deleteProfile", auth, deleteAccount)

// Get User Details

router.get("/getUserDetails", auth, getAllUserDetails)

// Get Enrolled Courses

router.get("/getEnrolledCourses", auth, getEnrolledCourses)

// Update Picture

router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router;