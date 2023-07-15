const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	rating: {
		type: Number,
		required: true,
		
	},
	review: {
		type: String,
		required: true,
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	}
    },
	{
		toJSON: {
			transform: (doc, ret) => {
			// Exclude the password field from the JSON output
			ret.review = ret.review.toUpperCase();
			return ret;
			}
		},
	}
	);

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema)