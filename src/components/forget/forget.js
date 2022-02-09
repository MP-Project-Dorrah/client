import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Forget = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState(""); //email or user
  const [message, setMessage] = useState("");

  const restPass = async () => {
    setMessage(
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="inherit" />
      </Stack>
    ); //Progress indicators
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/user/forgetPassword`,
      { email }
    );
    if (result.status === 200) {
      //pass
      navigate(`/resetPassword`);
    } else {
      setMessage(result.data);
    }
  };
  return (
    <div className="forgett">
      <h2>Forget password </h2>
      <input
        className="forgetInput"
        type="text"
        placeholder="Enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <button className="forgetBtn" onClick={restPass}>
        send email
      </button>
      <div className="message">{message}</div>
    </div>
  );
};

export default Forget;
