import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

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
    ); //Progress indicators
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
      <p className="prr"></p>
      Code
      <input
        className="resetInput"
        type="text"
        placeholder="code"
        onChange={(e) => {
          setCode(e.target.value);
        }}
      />
      <br />
      New password
      <input
        className="resetInput"
        type="password"
        placeholder="new pass"
        onChange={(e) => {
          setNewPass(e.target.value);
        }}
      />
      <br />
      <button className="resetBtn" onClick={restPass}>
        Reset
      </button>
      <br />
      {message}
      {isPassReset && (
        <>
          <button onClick={navLogIn}> back to log in page </button>
        </>
      )}
    </div>
  );
};

export default Reset;
