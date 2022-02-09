import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { Stack, CircularProgress } from "@mui/material";

const Reset = () => {
  let navigate = useNavigate();
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");
  const [isPassReset, seIsPassReset] = useState(false);

  const restPass = async () => {
    setMessage(
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="inherit" />
      </Stack>
    );
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/user/resetPassword`,
      { resetLink: code, newPassword: newPass }
    );
    if (result.status === 200) {
      setMessage("Your password has been successfully updated");
      seIsPassReset(true);
    } else {
      setMessage(result.data);
    }
  };

  const navLogIn = () => {
    navigate("/logIn");
  };

  return (
    <div className="forgett">
      {!isPassReset && (
        <>
          <h2 className="resetHeader">Reset password</h2>
          <input
            className="resetInput"
            type="text"
            placeholder="Enter the code"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <br />
          <input
            className="resetInput"
            type="password"
            placeholder="Enter your new password"
            onChange={(e) => {
              setNewPass(e.target.value);
            }}
          />
          <br />
          <button className="resetBtn" onClick={restPass}>
            Reset
          </button>
          <br />
        </>
      )}
      <div className="messageRContainer">
        <h3 className="messageR"> {message} </h3>
      </div>
      {isPassReset && (
        <>
          <button className="resetBtn" onClick={navLogIn}>
            back to log in page
          </button>
        </>
      )}
    </div>
  );
};

export default Reset;
