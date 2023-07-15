const User = require("../models/User");
const Profile = require("../models/Profile")
const {cloudinaryUpload} = require("../utils/cloudinary")
require("dotenv").config();
const Course = require("../models/Course")



//update profile data of the user

exports.updateProfile = async (req, res) => {
	try {
		const {gender = "", dateOfBirth = "", about = "", contactNumber } = req.body;
		const id = req.user.id;

	// Find the profile by id

		const userDetails = await User.findById(id);
		const profile = await Profile.findByIdAndUpdate({_id:userDetails.additionalDetails},{			
															gender: gender,
															dateOfBirth: dateOfBirth,
															about: about,
															contactNumber: contactNumber,},{new:true});


		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.deleteAccount = async (req, res) => {

	try {
		// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
		console.log("Printing ID: ", req.user.id);
		const id = req.user.id;
		
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

	// Delete Assosiated Profile with the User

		await Profile.findByIdAndDelete({ _id: user.additionalDetails });

	// Unenroll User From All the Enrolled Courses

        await Course.updateMany({studentsEnrolled:{$in:[id]}},{$pull:{studentsEnrolled:id}},{ new: true });

	// Now Delete User

		await User.findByIdAndDelete({ _id: id });

		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({ 
            success: false, 
            message: "User Cannot be deleted successfully" 
        });
	}
};

    //get all users details

exports.getAllUserDetails = async (req, res) => {

	try {
		const id = req.user.id;

		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();

		console.log(userDetails);

		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});

	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


    
exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
	  console.log(displayPicture);
      const image = await cloudinaryUpload(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(`the image is ${image}`)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
	  console.log(`updated profile picture ${updatedProfile}`)
      return res.status(200).json({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};