const { default: mongoose } = require("mongoose");
const mailSender = require("../utils/mailSender");

const resetToken = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
        expires: 60 * 10
	},
});


try {
    resetToken.post('save', async function (givendoc) {
        const url = `http://localhost:3000/update-password/${givendoc.token}`;
        const mailResponse = await mailSender(givendoc.email,`this mail is regarding your password reset request of your codenotion account`,
                                                
                                                               `codenotion - "Aditya Sharma"|
    
                                                    this is the link to update the password of your acount 
    
                                                    ${url}
    
                                                    if you have not requested for the password reset then check for 
                                                    the security of your account and we recommend you to strengthen 
                                                    your account's password`
                                            );
                                                    
    
        console.log("mailResponse",mailResponse)
       
      });
} catch (error) {
    console.error(error,"error in sending email for password updation")
}

module.exports = mongoose.model("resetToken",resetToken);