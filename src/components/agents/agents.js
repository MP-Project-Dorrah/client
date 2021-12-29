import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Agents = () => {
  const [message, setMessage] = useState("");

  let navigate = useNavigate();
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
      `${process.env.REACT_APP_BASE_URL}/user/allRealestateAgents`
    );
    setAllUsers(users.data);
    setMessage("");
  };

  const goInside = (id) => {
    console.log(id);
    // navigate(`/profile/${id}`);
  };

  return (
    <div className="usersContener">
      {allUsers &&
        allUsers.map((ele) => {
          return (
            <div key={ele._id} className="userss">
              <div className="imgContener0">
                <img
                  className="img3"
                  src={ele.img}
                  alt="img"
                  onClick={() => {
                    goInside(ele._id);
                  }}
                />
              </div>
              <h4
                className="userNamee"
                onClick={() => {
                  goInside(ele._id);
                }}
              >
                {ele.username}
              </h4>
            </div>
          );
        })}
      <div className="message">{message} </div>
      {/* {!allUsers.length && <h2>There are no agents available at the moment </h2>} */}
    </div>
  );
};

export default Agents;
