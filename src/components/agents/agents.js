import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { Stack, CircularProgress, Rating } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";

const Agents = () => {
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
      `${process.env.REACT_APP_BASE_URL}/user/allRealestateAgents`
    );
    setAllUsers(users.data);
    setMessage("");
  };

  return (
    <div className="usersContener">
      {allUsers &&
        allUsers.map((ele) => {
          return (
            <div key={ele._id} className="userss">
              <div className="imgContener0">
                <img className="img3" src={ele.img} alt="img" />
              </div>
              <h4 className="userNamee">{ele.name}</h4>
              <p className="agentCity">{ele.city}</p>
              {ele.rateArr.length ? (
                <div className="rating">
                  <Rating
                    name="read-only"
                    value={
                      ele.rateArr.reduce(
                        (accumulator, curr) => accumulator + curr
                      ) / ele.rateArr.length
                    }
                    sx={{ color: "black" }}
                    readOnly
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="commissionContainer">
                Commission:
                <span className="commission">
                  {ele.realestateAgentCommission}%
                </span>
              </div>
              <div>
                {ele.Availability ? (
                  <EventAvailableIcon color="success" />
                ) : (
                  <EventBusyIcon className="EventBusyIcon" />
                )}
              </div>
            </div>
          );
        })}
      <div className="message">{message} </div>
    </div>
  );
};

export default Agents;
