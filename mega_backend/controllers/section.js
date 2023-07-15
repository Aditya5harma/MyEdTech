const Course = require("../models/Course");
const Section = require("../models/Section");



    // CREATE a new section

exports.createSection = async (req, res) => {
	try {

		const { sectionName, courseId } = req.body;

	// Validate the input

		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

	// Create a new section with the given name

		const newSection = await Section.create({ sectionName });

	// Add the new section to the course's content array

		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)

    // why should we populate it if any need found then we could populate 

	// Return the updated course object in the response

		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});

	} catch (error) {
		
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};


    // UPDATE a section

exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId } = req.body;
        
		const section = await Section.findByIdAndUpdate(
			{sectionId},
			{sectionName: sectionName},
			{new: true}
		);

		res.status(200).json({
			success: true,
			message: section,
		});

	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};


    // DELETE a section

exports.deleteSection = async (req, res) => {
	try {
	//HW -> req.params -> test

		const { sectionId } = req.body;
		console.log(`secstionid-${sectionId}`)
		await Section.findByIdAndDelete(sectionId);

	//update course

        await Course.updateMany({courseContent:{$in:[sectionId]}},{$pull:{courseContent:sectionId}});

		res.status(200).json({
			success: true,
			message: "Section deleted",
		});

	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};