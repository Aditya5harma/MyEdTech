import { apiConnector } from "../apiconnector"
import {contactUs} from "../apis"


export const messageSend = async(data) => {
    try {

        const response = await apiConnector("POST",contactUs.CONTACT_US_API,data)
        console.log(`responce in contactUsAPI - ${response}`)

        if(!response.data.message){
            console.log(`inside the success validation section`)
            throw new Error()
        }

    } catch (error) {
        console.error(`error caught in contactUsAPI - ${error}`)
    }

}