import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Agents = () => {
  let navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  const getAllUsers = async () => {
    const users = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/user/allRealestateAgents`
    );
    setAllUsers(users.data);
  };

  const goInside = (id) => {
    navigate(`/profile/${id}`);
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
                className="userName"
                onClick={() => {
                  goInside(ele._id);
                }}
              >
                {ele.username}
              </h4>
            </div>
          );
        })}

      {!allUsers.length && <h2>there is no user</h2>}
    </div>
  );
};

export default Agents;
