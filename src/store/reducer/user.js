import { getToken, getUserName } from "@/utils/cookies";
const config = {
  username: "" || getUserName(),//防止刷新的时候数据被清空
  token: "" || getToken(),
};
//Reducer

const userReducer = function (state = config, action) {
  switch (action.type) {
    case "SAVE_USERINFO":
      const {username,token} = action.payload;
      state.username = username;
      state.token = token;
      return {...state};
    case "CLEAR_USERINFO":
      return {username: "",token: "",};
    default:
      return state;
  }
};

export default userReducer;
