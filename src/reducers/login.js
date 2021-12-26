const initialState = {
  role: "",
  token: "",
  userID: "",
  username: "",
  isSub: false,
  userNumber : 0
};

const signIn = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      const { role, token, userID, username , isSub , userNumber} = payload;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userID", userID);
      localStorage.setItem("username", username);
      localStorage.setItem("isSub", isSub); ///////update LS
      localStorage.setItem("userNumber", userNumber);
      return { role, token, userID, username, isSub , userNumber };

    case "LOGOUT":
      localStorage.clear();
      return { role: "", token: "", userID: "", username: "", isSub: false , userNumber:0};

    default:
      const localToken = localStorage.getItem("token");
      const localRole = localStorage.getItem("role");
      const localUserId = localStorage.getItem("userID");
      const localUsername = localStorage.getItem("username");
      const localIsSub = localStorage.getItem("isSub");
      const localNumber = localStorage.getItem("userNumber");
      if (localToken) {
        return {
          token: localToken,
          role: localRole,
          userID: localUserId,
          username: localUsername,
          isSub: localIsSub,
          userNumber : localNumber
        };
      }
      return state;
  }
};

export default signIn;

export const logIn = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const logOut = (data) => {
  return { type: "LOGOUT", payload: {} };
};
