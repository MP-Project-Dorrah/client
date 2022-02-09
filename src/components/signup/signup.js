import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import {
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
  Stack,
  CircularProgress,
} from "@mui/material";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const options = ["Qassim", "Riyadh", "Jeddah", "Dhahran", "Jubail"];

const Signup = () => {
  let navigate = useNavigate();
  const [alignment, setAlignment] = React.useState("Buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phonNumber, setNumber] = useState(0);
  const [nationalId, setNationalId] = useState(0);
  const [city, setCity] = useState("");
  const [commission, setCommission] = useState("");
  const [isSignUp, seIsSignUp] = useState(false);
  const [role, setRole] = useState("61c05b490cca090670f00823"); //buyer role

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    if (newAlignment === "Buyer") {
      setRole("61c05b490cca090670f00823");
    } else if (newAlignment === "Seller") {
      setRole("61c05b020cca090670f00821");
    } else {
      setRole("61c05b880cca090670f00825"); // agent
    }
  };

  const getUser = async () => {
    setMessage(
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="inherit" />
      </Stack>
    );
    const users = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/create`,
      {
        email,
        username,
        name,
        nationalId,
        city,
        phonNumber,
        password,
        role,
        commission,
      }
    );
    if (users.status === 204) {
      setMessage(
        "this email or username already hava an account! log in or change your email"
      );
    } else if (users.status === 210) {
      setMessage("you need to insert a complix password");
    } else {
      seIsSignUp(true);
      setMessage(users.data); // <a href=""> back to log in page </a>
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index, option) => {
    setCity(option);
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navLogIn = () => {
    navigate("/logIn");
  };

  return (
    <>
      {!isSignUp && (
        <div className="signUpCom">
          <h2>Sign up</h2>
          <div>
            <ToggleButtonGroup
              className="ToggleButtonGroup"
              color="primary"
              value={alignment}
              exclusive
              sx={{
                display: { xs: "flex", md: "flex" },
                justifyContent: "center",
                flexDirection: { xs: "column", md: "row" },
              }}
              // orientation= "vertical"
              onChange={handleChange}
            >
              <ToggleButton value="Buyer">
                <span> Buyer </span>
              </ToggleButton>
              <ToggleButton value="Seller">
                <span>Seller </span>
              </ToggleButton>
              <ToggleButton value="Agent">
                <span>Agent</span>
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div>
            <input
              type="email"
              placeholder=" email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="phonNumber"
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="National id"
              onChange={(e) => {
                setNationalId(e.target.value);
              }}
            />
          </div>
          <div className="cityChoice">
            <List
              component="nav"
              aria-label="Device settings"
              sx={{ bgcolor: "background.paper" }}
            >
              <ListItem
                button
                id="lock-button"
                aria-haspopup="listbox"
                aria-controls="lock-menu"
                aria-label="City"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickListItem}
              >
                <ListItemText
                  primary="City"
                  secondary={options[selectedIndex]}
                />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox",
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  onClick={(event) => handleMenuItemClick(event, index, option)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div>
            <input
              id="passInput"
              type="password"
              placeholder=" password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {alignment === "Agent" && (
            <>
              <div>
                <input
                  type="number"
                  placeholder="Commission in %"
                  onChange={(e) => {
                    setCommission(e.target.value);
                  }}
                />
              </div>
            </>
          )}
          <button
            className="LogBtn2"
            onClick={() => {
              getUser();
            }}
          >
            <BsFillArrowRightCircleFill className="goIcon" />{" "}
          </button>

          <div>
            already have an account?
            <Link className="linkk" to="/logIn">
              log in
            </Link>
          </div>
        </div>
      )}
      {message}
      {isSignUp && (
        <>
          <button onClick={navLogIn}> back to log in page </button>
        </>
      )}
    </>
  );
};

export default Signup;
