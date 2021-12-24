import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Scheduled(props) {
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

  useEffect(() => {
    getAgents();
    // eslint-disable-next-line
  }, []);

  const getAgents = async () => {
    const agents = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/user/allRealestateAgents/${props.city}`
    );
    setAgents(agents.data);
    console.log(agents.data, "dstaaaa");
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

  return (
    <div>
      <h3> Schedule A Tour </h3>
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
        {message === "no" &&
          agents &&
          agents.map((ele) => {
            return ele.name;
          })}
      </div>
    </div>
  );
}

export default Scheduled;
