// import dotenv from 'dotenv';
// dotenv.config();


const BASE_URL = "http://localhost:4000/api/v1"
//process.env.REACT_APP_BASE_URL


// CATAGORIES API
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CATEGORYWISE_API: BASE_URL + "/course/categoryCourse/",
    LOGIN_API: BASE_URL + "/auth/login",
    SEND_OTP: BASE_URL + "/auth/sendotp"
  }

export const contactUs = {
    CONTACT_US_API: BASE_URL + "/contact/contactUs"
}