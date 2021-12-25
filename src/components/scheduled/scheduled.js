import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Scheduled(props) {
  const [time, setTime] = React.useState("");

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

  const [alignment, setAlignment] = React.useState("In-Person");
  const [day, setDay] = React.useState(1);
  const [message, setMessage] = useState("yes");
  const [agents, setAgents] = useState([]);

  const [agent, setAgent] = React.useState("");

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
    console.log(newAlignment);
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
    console.log("sennnnd");
  };

  return (
    <div>
      <h3> Schedule A Tour ? </h3>
      <p> Tour Type</p>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="In-Person">In-Person</ToggleButton>
        <ToggleButton value="Video Chat">Video Chat</ToggleButton>
      </ToggleButtonGroup>

      <div>
        <ToggleButtonGroup
          color="primary"
          value={day}
          exclusive
          onChange={handleChangeDay}
        >
          <ToggleButton value={1}>
            <p>{day1.toString().slice(8, 10)} </p>
            <p>{day1.toString().slice(4, 7)} </p>
          </ToggleButton>
          <ToggleButton value={2}>
            <p>{day2.toString().slice(8, 10)} </p>
            <p>{day2.toString().slice(4, 7)} </p>
          </ToggleButton>
          <ToggleButton value={3}>
            <p>{day3.toString().slice(8, 10)} </p>
            <p>{day3.toString().slice(4, 7)} </p>
          </ToggleButton>
          <ToggleButton value={4}>
            <p>{day4.toString().slice(8, 10)} </p>
            <p>{day4.toString().slice(4, 7)} </p>
          </ToggleButton>
        </ToggleButtonGroup>
        do you want an agent ? <span onClick={handleClick}> {message} </span>
        {message === "no" && agents && (
          <>
            <ToggleButtonGroup
              color="primary"
              value={agent}
              exclusive
              onChange={handleChangeAgent}
            >
              {agents.map((ele) => {
                return <ToggleButton value={ele.name}>{ele.name}</ToggleButton>;
              })}
            </ToggleButtonGroup>
          </>
        )}
      </div>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Choose a time</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={time}
            label="Age"
            onChange={handleChangeTime}
          >
            <MenuItem value={8}>8AM</MenuItem>
            <MenuItem value={9}>9AM</MenuItem>
            <MenuItem value={10}>10AM</MenuItem>
            <MenuItem value={11}>11AM</MenuItem>
            <MenuItem value={12}>12PM</MenuItem>
            <MenuItem value={1}>1PM</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <button onClick={sendMessage}> Schedule a Tour </button>
    </div>
  );
}

export default Scheduled;
