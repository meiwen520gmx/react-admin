import { createStore, combineReducers } from "redux";
//Action 发出以后，过一段时间再执行 Reducer，这就是异步,怎么处理异步操作呢？中间件和applyMiddleware
//applyMiddleware是redux的原生方法，作用是将所有的中间件组成一个数组，依次执行
//调试工具
import { composeWithDevTools } from "redux-devtools-extension";
//reducer
import departmentReducer from "./reducer/department";
import jobReducer from "./reducer/job";
import userReducer from "./reducer/user";

const allReducer = combineReducers({
  departmentReducer,
  jobReducer,
  userReducer,
}); //合并所有的reducer
const store = createStore(allReducer, composeWithDevTools());

export default store;
