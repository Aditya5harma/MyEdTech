const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {razorpay} = require("../config/razorpay");



exports.initiatePayment = async(req,res) =>  {
    try {
        const userid = req.user.id;
        const {courseid} = req.body;

    //courseid availble or not 

        if(!courseid){
            return res.status(400).json({
                success:false,
                message: "course field empty please fill course field"
            })
        }

    //valid course id or not

        const cid = new mongoose.Schema.Types.ObjectId(courseid)   //this conversion may not be necessary if courseid itself is a objectid but to be on the safer side just converting it to objectid as courseid could be a string of courseid.

        const validCourse = await Course.findById(cid)
        
        if(!validCourse){
            return res.status(500).json({
                success : false,
                message: "no such course is available please enter the valid course"
            })
        }
        console.log("validCourse",validCourse)

    //check if user already enrolled in the course or not

        const uid = new mongoose.Schema.Types.ObjectId(userid)
        const newEnrolment = await Course.findOne({uid})

        if(newEnrolment){
            return res.status(400).json({
                success:false,
                message:"user already enrolled in the course"
            })
        }

    //order creation

        const options = {
            amount: validCourse.price * 100,    //as per mention in the razorpay documentation
            currency:"INR",
            receipt: Math.random(Date.now()).toString(),
            notes:{
                courseId: courseid,
                courseName:validCourse.courseName,
                userId:userid,
            }
        };

    try{

    //create the order using razorpay

        const razorpayResponse = await razorpay.orders.create(options);

        console.log(paymentResponse);
        
        return res.status(200).json({
            success:true,
            courseName:validCourse.courseName,
            courseDescription:validCourse.courseDescription,
            thumbnail: validCourse.thumbnail,
            orderId: razorpayResponse.id,
            currency:razorpayResponse.currency,
            amount:razorpayResponse.amount,
        });
    }

    //catch error of order creation

    catch(error) {
        console.log(error);
        res.json({
            success:false,
            message:"Could not initiate order",
        });
    }

    //catch error of payment initialisation

} catch(error) {
            console.error(error);
            return res.status(500).json({
                success:false,
                message:`error in validation before order creation ,${error.message}`,
            });
 }
};


//verify Signature of Razorpay and Server

exports.verifySignature = async (req, res) => {

    const webhookSecret = "12345678";

    const signature = req.headers["x-razorpay-signature"];

    const shasum =  crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest) {
        console.log("Payment is Authorised");

        const {courseId,courseName, userId} = req.body.payload.payment.entity.notes; //either given in the documentation of razorpay how to access notes or you need to hit and trial but console logging the response

        try{

    //find the course and enroll the student

            const enrolledCourse = await Course.findOneAndUpdate(
                                            {_id: courseId},
                                            {$push:{studentsEnrolled: userId}},
                                            {new:true},
            );

            if(!enrolledCourse) {
                return res.status(500).json({
                    success:false,
                    message:'Course not Found',
                });
            }

            console.log(enrolledCourse);

    //find the student and add the course to their enrolled courses 

            const enrolledStudent = await User.findOneAndUpdate(
                                            {_id:userId},
                                            {$push:{courses:courseId}},
                                            {new:true},
            );

            console.log(enrolledStudent);

    //send confirmation  mail

            const emailResponse = await mailSender(
                                    enrolledStudent.email,
                                    "Congratulations from CodeHelp",
                                    `Congratulations, you are onboarded into new CodeHelp Course ${courseName}`,
            );

            console.log(emailResponse);
            return res.status(200).json({
                success:true,
                message:"Signature Verified and Course Added",
            });


        }       
        catch(error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }
    else {
        return res.status(400).json({
            success:false,
            message:'Invalid request',
        });
    }
};
