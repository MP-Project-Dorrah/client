import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, CircularProgress } from "@mui/material";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { logOut } from "../../reducers/login";

const User = () => {
  const id = useParams().id;

  let navigate = useNavigate();
  const dispatchEvent = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const [user, setuser] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const getUser = async () => {
    setMessage(
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="inherit" />
      </Stack>
    );
    const user = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/user/oneUser/${id}`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    setuser(user.data);
    setMessage("");
  };

  const goInside = (id) => {
    console.log(id);
    navigate(`/property/id`);
  };

  const deleteAccount = async () => {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/user/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${state.signIn.token}`,
      },
    });
    const data = {
      role: "",
      token: "",
      userID: "",
      username: "",
    };
    dispatchEvent(logOut(data));
    navigate(`/`);
  };

  return (
    <>
      {user.length ? (
        <div className="profileContainer">
          <div className="firstCont">
            <img className="profilePageImg" src={user[0][0].img} alt="" />
          </div>
          <div className="secondCont">
            <h3 className="userName">{user[0][0].name} </h3>
            <h5>
              <span>Username: </span>@{user[0][0].username}
            </h5>
            <h5>
              <span>Email: </span>
              {user[0][0].email}
            </h5>
            <h5>
              <span>Phon number: </span>
              {user[0][0].phonNumber}
            </h5>
            <h5>
              <span>City: </span>
              {user[0][0].city}
            </h5>
          </div>

          {user[0][0].role.role === "Seller" && (
            <div>
              <h4 className="PropertiesH4"> Properties: </h4>
              <div className="propertiContainer">
                {user[1].map((ele) => {
                  return (
                    <img
                      onClick={() => goInside(ele._id)}
                      className="properImg"
                      src={ele.imgArr[0]}
                      alt=""
                    />
                  );
                })}
              </div>
            </div>
          )}

          <div id="subscribeContainer">
            {/* subscribe status */}
            {user[0][0].role.role === "Seller" && (
              <>
                <h4 className="subscribeStatus"> Subscribe Status </h4>
                {(user[0][0].subscribeStatus === "active" ||
                  user[0][0].subscribeStatus === "cancelPending") && (
                  <span className="activeSubscribe">Active</span>
                )}
                {user[0][0].subscribeStatus === "unActive" && (
                  <span className="unActiveSubscribe">UnActive</span>
                )}
              </>
            )}
          </div>
          <div className="deleteAccountContainer">
            {/* Delete my account */}
            <button className="deleteAccountBtn" onClick={deleteAccount}>
              <RiDeleteBin5Fill />
            </button>
          </div>
        </div>
      ) : (
        <div className="message">{message} </div>
      )}
    </>
  );
};
export default User;
