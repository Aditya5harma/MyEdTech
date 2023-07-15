const Category = require("../models/category")


    //create new category

exports.createCategory = async (req, res) => {
	try {

		const { name, description } = req.body;

    //validations

		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});

		console.log(CategorysDetails);
        
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});

	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

    //get all available categories

exports.showAllCategories = async (req, res) => {
	try {

		const allCategorys = await Category.find(
			{},
			{ name: true, description: true }
		);

		res.status(200).json({
			success: true,
			data: allCategorys,
		});

	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

    //categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
    try {

        const {categoryId} = req.body;

    //get courses for specified categoryId

        const selectedCategory = await Category.findById(categoryId)
                                        .populate("courses")
                                        .sort({averageRating:-1})
                                        .limit(10)
                                        .exec();
        

        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message:'course Not Found for this category',
            });
        }

        //get courses for different categories 

        const differentCategories = await Category.find({
                                        _id: {$ne: categoryId},
                                        })
                                        .populate("courses")
                                        .sort({averageRating:-1})
                                        .limit(10)
                                        .exec();


        return res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategories,
            },
        });

    }
    catch(error ) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}