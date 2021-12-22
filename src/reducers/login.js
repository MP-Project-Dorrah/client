const initialState = {
  role: "",
  token: "",
  userID: "",
  username: "",
};

const signIn = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      const { role, token, userID, username } = payload;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userID", userID);
      localStorage.setItem("username", username);
      return { role, token, userID, username };

    case "LOGOUT":
      localStorage.clear();
      return { role: "", token: "", userID: "", username: "" };

    default:
      const localToken = localStorage.getItem("token");
      const localRole = localStorage.getItem("role");
      const localUserId = localStorage.getItem("userID");
      const localUsername = localStorage.getItem("username");
      if (localToken) {
        return {
          token: localToken,
          role: localRole,
          userID: localUserId,
          username: localUsername,
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
