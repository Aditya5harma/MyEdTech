const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const contactusRecivial = require("../mailTamplets/contactusRecivial");


// contact us form schema
const contactFormSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName :{
        type:String,
        trim:true,
    },
    email: {
        type:String,
        required:true,
        trim:true,
    },
    contactNumber: {
        type:Number,
        required:true,
        trim:true,
    },
    countryCode: {
        type:Number,
        required:true,
        trim:true,
    },
    user_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

//email sending for message recival 
try {
    contactFormSchema.post('save', async function (givendoc) {
        
        const mailResponse = await mailSender(givendoc.email,`This mail is regarding your message `,contactusRecivial(givendoc),

                                            );
                                                    
    
        console.log("mailResponse",mailResponse)
       
      });
} catch (error) {
    console.error(error,"error in sending email for message receiving")
}




// Export 
module.exports = mongoose.model("contactFormMessages", contactFormSchema);