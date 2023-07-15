const User = require("../models/User");
const contactFormMessages =require("../models/contactFormMessages")



exports.contactUs = async(req,res) => {
    try {
        //accessing data from request
        const{firstName,lastName,email,countryCode,contactNumber,message} = req.body

        //check filled 
        if(!firstName || !lastName || !email || !countryCode || !contactNumber || !message){
            return res.status(402).json({
                success: true,
                message:"please fill all the fields"
            })
        }

        //check weather sender is a registerd user or not
        const registeredId = await User.findOne({email},{_id:1});

        const sender = await contactFormMessages.create({
                                                            firstName,
                                                            lastName,
                                                            email,
                                                            countryCode,
                                                            contactNumber,
                                                            message,
                                                            user_Id: registeredId
                                                        })

        const updateId = await User.findByIdAndUpdate(registeredId,
            {
				$push: {
					message_Id: sender._id
				},
			},
			{ new: true }
        )
        return res.status(200).json({
            success:true,
            sender,
            updateId,
            message:"message send successfully"
        })

    } catch (error) {

        console.error(error)
        return res.status(402).json({
            success:false,
            message:"error in sending message. Try again"
        })
        
    }
}