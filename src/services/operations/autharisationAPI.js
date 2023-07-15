import { apiConnector } from "../apiconnector"
import { categories } from "../apis"
import { toast } from "react-hot-toast"

export const otpSend = async(email,navigate) => {

    const loadingtoast = toast.loading("Loading...")
        try {
            //making sendotp API call 
            const response = await apiConnector("POST",categories.SEND_OTP,{email})           
            console.log(`sendotp api response - ${response} success - ${response.data.message}`)
            
            
            //if otp sending failed
            if(!response.data.success){
                console.log("error here in response.data.success")
                throw new Error(response)                   
           }

           //if otp sent successfully
            const successtoast = toast.success("OTP Sent Successfully")
                navigate("/verify-email")
                setTimeout(() => {
                    toast.dismiss(successtoast)
                }, 3000);
                        
                
        } catch (error) {
            console.log(`we are in catch block`)

            console.log(`sendotp api error - ${error}`)
            const errortoast = toast.error(error)
            setTimeout(() => {
                toast.dismiss(errortoast)
            }, 2000);
            
        }
    toast.dismiss(loadingtoast)

    }
    


