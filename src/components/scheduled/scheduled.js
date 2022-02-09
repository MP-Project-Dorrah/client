import {
  ToggleButton,
  ToggleButtonGroup,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./style.css";

function Scheduled(props) {
  const [time, setTime] = React.useState("");
  const [alignment, setAlignment] = React.useState("In-Person");
  const [day, setDay] = React.useState(1);
  const [message, setMessage] = useState("yes");
  const [message2, setMessage2] = useState("");

  const [agents, setAgents] = useState([]);
  const [scheduleBtn, setScheduleBtn] = useState("Schedule a Tour");
  const [progress, setProgress] = useState("");
  const [agent, setAgent] = React.useState("");

  const state = useSelector((state) => {
    return state;
  });

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  let day1 = new Date();
  day1.setDate(day1.getDate() + 1);
  let day2 = new Date();
  day2.setDate(day2.getDate() + 2);
  let day3 = new Date();
  day3.setDate(day3.getDate() + 3);
  let day4 = new Date();
  day4.setDate(day4.getDate() + 4);

  useEffect(() => {
    getAgents();
    // eslint-disable-next-line
  }, []);

  const getAgents = async () => {
    const agents = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/user/allRealestateAgents/${props.city}`
    );
    setAgents(agents.data);
  };
  const handleChangeAgent = (event, newAlignment) => {
    setAgent(newAlignment);
  };
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleChangeDay = (event, newAlignment) => {
    setDay(newAlignment);
  };
  const handleClick = async () => {
    if (message === "yes") {
      setMessage("no");
    } else {
      setMessage("yes");
    }
  };
  const sendMessage = async () => {
    if (alignment && time) {
      if (scheduleBtn === "Schedule a Tour") {
        setProgress(
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress color="inherit" />
          </Stack>
        );
        const result = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/appointment/send`,
          {
            sellerId: props.sellerId,
            AgentId: agent,
            buyerNumber: state.signIn.userNumber,
            PropertyLocation: props.location,
            type: alignment,
            date: day + " " + time,
          },
          {
            headers: {
              Authorization: `Bearer ${state.signIn.token}`,
            },
          }
        );
        if (result.status === 200) {
          setScheduleBtn("Message send");
          setMessage2("");
          setProgress("");
        }
      }
    } else {
      setMessage2("you have to fill all fields before sending");
    }
  };

  return (
    <div className="tourContener">
      <h3 id="tourHeader"> Schedule A Tour ? </h3>
      {state.signIn.token.length !== 0 ? (
        <>
          <p className="tourType"> Tour Type</p>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton className="toggleBtnn" value="In-Person">
              <span id="spann"> In-Person </span>
            </ToggleButton>
            <ToggleButton className="toggleBtnn" value="Video Chat">
              <span> Video Chat </span>
            </ToggleButton>
          </ToggleButtonGroup>
          <div className="days">
            <ToggleButtonGroup
              color="primary"
              value={day}
              exclusive
              onChange={handleChangeDay}
            >
              <ToggleButton
                value={
                  day1.toString().slice(8, 10) +
                  " " +
                  day1.toString().slice(4, 7)
                }
              >
                <div className="day">
                  <p>{day1.toString().slice(8, 10)} </p>
                  <p>{day1.toString().slice(4, 7)} </p>
                </div>
              </ToggleButton>

              {/* <div className="divBetween"> </div> */}
              <ToggleButton
                value={
                  day2.toString().slice(8, 10) +
                  " " +
                  day2.toString().slice(4, 7)
                }
              >
                <div className="day">
                  <p>{day2.toString().slice(8, 10)} </p>
                  <p>{day2.toString().slice(4, 7)} </p>
                </div>
              </ToggleButton>
              {/* <div className="divBetween"> </div> */}
              <ToggleButton
                className="toggleBtnnn"
                value={
                  day3.toString().slice(8, 10) +
                  " " +
                  day3.toString().slice(4, 7)
                }
              >
                <div className="day">
                  <p>{day3.toString().slice(8, 10)} </p>
                  <p>{day3.toString().slice(4, 7)} </p>
                </div>
              </ToggleButton>
              {/* <div className="divBetween"> </div> */}
              <ToggleButton
                value={
                  day4.toString().slice(8, 10) +
                  " " +
                  day4.toString().slice(4, 7)
                }
              >
                <div className="day">
                  <p>{day4.toString().slice(8, 10)} </p>
                  <p>{day4.toString().slice(4, 7)} </p>
                </div>
              </ToggleButton>
              {/* <div className="divBetween"> </div> */}
            </ToggleButtonGroup>
          </div>
          <div className="time">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Choose a time
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label="Age"
                  onChange={handleChangeTime}
                >
                  <MenuItem value="8AM">8AM</MenuItem>
                  <MenuItem value="9AM">9AM</MenuItem>
                  <MenuItem value="10AM">10AM</MenuItem>
                  <MenuItem value="11AM">11AM</MenuItem>
                  <MenuItem value="12PM">12PM</MenuItem>
                  <MenuItem value="1PM">1PM</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          do you want an agent ?
          <span className="agent" onClick={handleClick}>
            {message}
          </span>
          {/* <br /> */}
          {message === "no" && (
            <div>
              {agents.length ? (
                <>
                  <ToggleButtonGroup
                    color="primary"
                    value={agent}
                    exclusive
                    onChange={handleChangeAgent}
                  >
                    {agents.map((ele) => {
                      return (
                        ele._id !== state.signIn.userID && (
                          <ToggleButton value={ele._id} key={ele._id}>
                            <img
                              className="agentImg"
                              src={ele.img}
                              alt="profileImage"
                            />
                            <div> {ele.name} </div>
                            {/* <div>{ele.realestateAgentCommission}</div> */}
                          </ToggleButton>
                        )
                      );
                    })}
                  </ToggleButtonGroup>
                </>
              ) : (
                <>
                  Sorry, There is no available agent in your city at this moment{" "}
                </>
              )}
            </div>
          )}
          <button
            className={
              scheduleBtn === "Schedule a Tour" ? "tourBtn" : "tourBtnUnactive"
            }
            onClick={sendMessage}
          >
            {scheduleBtn}
          </button>
          {progress}
          <p className="alertMessage"> {message2} </p>
        </>
      ) : (
        <> If you want to schedule a tour, you need to sign up first</>
      )}
    </div>
  );
}

export default Scheduled;
