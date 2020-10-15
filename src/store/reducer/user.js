const config = {
  username: "",
  token: "",
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
