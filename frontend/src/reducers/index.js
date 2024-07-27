import { combineReducers } from "redux";
import { authReducer } from "./auth/actions";
import { userReducer } from "./user/actions";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
});

export default rootReducer; 