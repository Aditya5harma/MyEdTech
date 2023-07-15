const Category = require("../models/category");
const { cloudinaryUpload } = require("../utils/cloudinary");
const User = require("../models/User");
const Course = require("../models/Course");
require("dotenv").config();



exports.createCourse = async(req,res) => {
    
try {
    const{
        courseName,  //this could need to be modified as per the frontend as it as this filed is named as title in frontend
        courseDescription,
        whatYouWillLearn,
        price,
        tag,
        category,
        instructions,
    } = req.body;
	let {status} = req.body;

    //fetch the user id from user

    const userId = req.user.id

    // Get thumbnail image from request files

	const thumbnail = req.files.thumbnailImage;
	console.log(thumbnail)

    // Check if any of the required fields are missing

        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag ||
            !thumbnail ||
            !category
        ) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory plase fill all the fields before creating course",
            });
        }
		console.log(`details-${thumbnail} ${category}`)

    // Check if the user is an instructor
		const instructorDetails = await User.findById(userId).where('accountType').equals('Instructor');

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

	// Check if the catagory given is valid
		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
        }

        if (!status || status === undefined) {
			status = "Draft";
		}

    //upload the thumbnail to cloudinary
        const uploadResponse = await cloudinaryUpload(thumbnail,process.env.FOLDER_NAME,1);

        console.log(uploadResponse);

	// upload data to db to create a new course with the given details

		const newCourse = await Course.create({
			courseName: courseName,
			courseDescription: courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price: price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: uploadResponse.secure_url,
			status: status,
			instructions: instructions,
		});

        console.log(newCourse);

    // Add the new course to the User Schema of the Instructor

        await User.findByIdAndUpdate({_id: instructorDetails._id,},
            {$push: {courses: newCourse._id,}},
            { new: true }
        );
    // Add the new course to the Categories

        await Category.findByIdAndUpdate({ _id: category },
            {$push: {courses: newCourse._id,}},
            { new: true }
        );
            
	// Return the new course and a success message

		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Congratulations! Your Course Created Successfully",
		});

	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course please try again later or report the issue if error occuring each time",
			error: error.message,
		});
	}
};




exports.getAllCourses = async (req, res) => {
	try {
			const allCourses = await Course.find(
				{},
				{   
					courseName: true,
					price: true,
					thumbnail: true,
					instructor: true,
					ratingAndReviews: true,
					studentsEnroled: true,
					averageRating:true,
					courseContent:true
				}
			).sort({averageRating:-1,price:1})
				.populate("instructor")
				.exec();

				return res.status(200).json({
					success: true,
					data: allCourses,
				});
		}
		// else {


		catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `course data can not be loaded PLEASE TRY AGAIN`,
			error: error.message,
		});
	}
};

//get all courses of a category

exports.categoryWiseCourses = async ( req,res) => {
	try {
		const{categoryid} = req.params
 	    const allCourses = await Category.findOne({ _id: categoryid }, { courses: 1, _id: 0 })
													.populate({
																path: 'courses',
																select: 'courseName courseDescription -_id'
															})
													.exec();

			return res.status(200).json({
				success: true,
		 			data: allCourses,
		 		});
	} catch (error) {
		
	}
}

//getCourseDetails

exports.getCourseDetails = async (req, res) => {
    try {
		const {courseId} = req.body;
		console.log(courseId)
	//find course details
	
		const courseDetails = await Course.find(
									{_id:courseId})
									.populate(
										{path:"instructor",
											populate:{
												path:"additionalDetails",
											},
										}
									)
									.populate("category")
									.populate("ratingAndreviews")
									.populate(
										{path:"courseContent",
											populate:{
												path:"subSection",
											},
										}
									)
									.exec();
		console.log(courseDetails)
	//validation

		if(!courseDetails) {
			return res.status(400).json({
				success:false,
				message:`Could not find the course with ${courseId}`,
			});
		}

		return res.status(200).json({
			success:true,
			message:"Course Details fetched successfully",
			data:courseDetails,
		})

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}