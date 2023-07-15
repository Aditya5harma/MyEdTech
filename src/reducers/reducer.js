import { combineReducers } from "redux";
import  authReducer  from "../slices/authorisation";
import  profileReducer  from "../slices/profile";
import cartReducer from "../slices/cart"


export const rootReducer = combineReducers({
    authorisation:authReducer,
    profile:profileReducer,
    cart:cartReducer,
})
export default rootReducer