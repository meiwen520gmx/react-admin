import { createStore,combineReducers } from "redux";
//reducer
import departmentReducer from "./reducer/department";
import jobReducer from "./reducer/job";
import userReducer from "./reducer/user";


const allReducer = combineReducers({departmentReducer,jobReducer,userReducer})//合并所有的reducer
const store = createStore(allReducer);

export default store;
