import React, { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { Stack, Modal, Typography, CircularProgress, Box } from "@mui/material";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function EditProfile(props) {
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const state = useSelector((state) => {
    return state;
  });

  const updateUSer = async () => {
    setMessage(
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="inherit" />
      </Stack>
    );
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/user/update`,
      {
        _id: state.signIn.userID,
        newUsername: username,
        newName: name,
        city,
        phonNumber: phone,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );

    if (result.status === 200) {
      props.rerender();
      handleClose();
      setMessage("");
    } else {
      setMessage("Sorry, somthing went wrong");
    }
  };

  return (
    <div>
      <BsPencilFill
        className="pen"
        onClick={() => {
          handleOpen();
        }}
      />

      <Modal
        className="modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="updateUserData">
          <Box sx={style} className="box">
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="modelDes">Name</div>
              <input
                className="newPostInput"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="name"
                defaultValue={props.name}
              />

              <div className="modelDes">Username</div>

              <input
                className="newPostInput"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                placeholder="username"
                defaultValue={props.username}
              />

              <div className="modelDes">Email</div>

              <input
                className="newPostInput"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="email"
                defaultValue={props.email}
              />

              <div className="modelDes">Phone number</div>

              <input
                className="newPostInput"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="number"
                placeholder="Phone number"
                defaultValue={props.phone}
              />

              <div className="modelDes">City</div>

              <input
                className="newPostInput"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                type="text"
                placeholder="city"
                defaultValue={props.city}
              />
              <br />
              <button onClick={updateUSer} className="submitBtn">
                submit
              </button>
              <div> {message} </div>
            </Typography>
          </Box>
        </div>
      </Modal>
    </div>
  );
}

export default EditProfile;
