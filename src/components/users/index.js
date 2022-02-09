import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { Stack, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const Users = () => {
  const state = useSelector((state) => {
    return state;
  });
  let navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  const getAllUsers = async () => {
    setMessage(
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="inherit" />
      </Stack>
    );
    const users = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/user/all`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    setAllUsers(users.data);
    setMessage("");
  };

  const goInside = (id) => {
    navigate(`/user/${id}`);
  };

  const deleteUser = async (userId) => {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/user/delete/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    getAllUsers();
  };
  return (
    <div className="usersContener">
      {allUsers &&
        allUsers.map((ele) => {
          return (
            <div key={ele._id} className="userss">
              <div className="imgContener0">
                <img
                  className="userImage"
                  src={ele.img}
                  alt="img"
                  onClick={() => {
                    goInside(ele._id);
                  }}
                />
              </div>
              <h4
                className="userNameee"
                onClick={() => {
                  goInside(ele._id);
                }}
              >
                {ele.name}
              </h4>
              <p className="userType">{ele.role.role}</p>
              <button
                className="deleteBtn2"
                onClick={() => deleteUser(ele._id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      <div className="message">{message} </div>
    </div>
  );
};

export default Users;
