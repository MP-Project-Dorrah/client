import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./../payment";
import {Stack , ToggleButton , styled , Modal , Typography , CircularProgress , IconButton , Box} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { BsPencilFill } from "react-icons/bs";
import { RiPencilFill, RiDeleteBin5Fill } from "react-icons/ri";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../reducers/login";
import { storage } from "../../firebase";

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
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 150,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Input = styled("input")({
  display: "none",
});
const PUBLIC_KEY =
  "pk_test_51K7lpGEhqG80ZdS5vrY9JFVX0W1osFI2kKVDHkuPAmCI0bazpn9TWU7Svfdo6nSWy8Jm1a2N02JrsI0KgrzMUeHY001OBLvj1k";

const stripeTestPromise = loadStripe(PUBLIC_KEY);
const Profile = () => {
  let navigate = useNavigate();
  const dispatchEvent = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const [user, setuser] = useState([]);
  const [subscribe, setSubscribe] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isSub, setIsSub] = useState(false);
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");

  const [selected, setSelected] = React.useState(false);
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openn, setOpenn] = React.useState(false);
  const handleOpenn = () => setOpenn(true);
  const handleClosee = () => setOpenn(false);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const getUser = async () => {
    const user = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/user/oneUser/${state.signIn.userID}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${state.signIn.token}`,
      //   },
      // }
    );
    setuser(user.data);
    setSelected(user.data[0].Availability);
    setIsSub(user.data[0].isSub);
    console.log(user.data);

    const subscribe = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/subscribe/${state.signIn.userID}`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    console.log(subscribe.data[0], "subscribe data");
    setSubscribe(subscribe.data[0]);

    const properties = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/property/userProperty/${state.signIn.userID}`
    );
    setProperties(properties.data);
  };

  const cancleSubscribe = async () => {
    console.log("cancleSubscribe");
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/subscribe/delete`,
      {
        userId: state.signIn.userID,
      },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    getUser();
  };

  const goInside = (id) => {
    console.log(id);
    // navigate(`/profile/${id}`);
  };
  const availableToggle = async () => {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/available`,
      {
        by: state.signIn.userID,
      },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    if (result) {
      console.log(result);
    }

    if (selected === true) {
      setSelected(false);
    } else {
      setSelected(true);
    }
    // getUser();
  };

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
      console.log(result);
      getUser();
      handleClose();
      setMessage("");
    } else {
      setMessage("Sorry, somthing went wrong");
    }
  };

  const postIt = async () => {
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/user/updateImg`,
      {
        newImg: url,
        _id: state.signIn.userID,
      },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    if (result.status === 200) {
      console.log("done");
      getUser();
      handleClosee();
      setMessage("");
    } else {
      setMessage("Sorry, somthing went wrong");
    }
  };

  const deleteAccount = async () => {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/user/delete/${state.signIn.userID}`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    const data = {
      role: "",
      token: "",
      userID: "",
      username: "",
    };
    dispatchEvent(logOut(data));
    navigate(`/`);
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
    setMessage2("Loading...");
    const uploadTask = storage
      .ref(`images/${e.target.files[0].name}`)
      .put(e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUrl(url);
            setMessage2("");
          });
      }
    );
  }
  };

  return (
    <>
      {user.length && (
        <div className="profileContainer">
          {/* //update photo */}
          <RiPencilFill
            className="editeImg"
            onClick={() => {
              handleOpenn();
            }}
          />
          <BsPencilFill
            className="pen"
            onClick={() => {
              handleOpen();
            }}
          />
          <Modal
            className="modall"
            open={openn}
            onClose={handleClosee}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <span className="NewPostModell">
              <Box sx={style2} className="box">
                <Typography
                  id="modal-modal-titlee"
                  variant="h6"
                  component="h2"
                ></Typography>
                <Typography id="modal-modal-descriptionn" sx={{ mt: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="icon-button-filee">
                      <Input
                        accept="image/*"
                        id="icon-button-filee"
                        type="file"
                        onChange={handleChange}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera className="camICon" />
                      </IconButton>
                      {url && <button onClick={postIt}> Update </button>}
                      <div> {message2} </div>
                    </label>
                  </Stack>
                </Typography>
              </Box>
            </span>
          </Modal>

          {/* // update text */}
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
                    defaultValue={user[0].name}
                  />

                  <div className="modelDes">Username</div>

                  <input
                    className="newPostInput"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    type="text"
                    placeholder="username"
                    defaultValue={user[0].username}
                  />

                  <div className="modelDes">Email</div>

                  <input
                    className="newPostInput"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    placeholder="email"
                    defaultValue={user[0].email}
                  />

                  <div className="modelDes">Phone number</div>

                  <input
                    className="newPostInput"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    type="number"
                    placeholder="Phone number"
                    defaultValue={user[0].phonNumber}
                  />

                  <div className="modelDes">City</div>

                  <input
                    className="newPostInput"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    type="text"
                    placeholder="city"
                    defaultValue={user[0].city}
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

          {/* disply profile */}
          <img className="profilePageImg" src={user[0].img} />
          <div className="profileTextContener">
            <h3 className="userName">{user[0].name} </h3>

            <br />
            <h5>
              <span>username: </span>@{user[0].username}
            </h5>
            <h5>
              <span>Email: </span>
              {user[0].email}
            </h5>
            <h5>
              <span>phon number: </span>
              {user[0].phonNumber}
            </h5>
            <h5>
              <span>City: </span>
              {user[0].city}
            </h5>
          </div>

          {/* disply seller proprty */}
          {state.signIn.role === "61c05b020cca090670f00821" && (
            <div className="userPropertyContener">
              my property
              <br />
              {properties.length &&
                properties.map((ele) => {
                  return (
                    <>
                      <h3
                        className="propertyh3"
                        onClick={() => {
                          goInside(ele._id);
                        }}
                      >
                        <img className="propertyImgP" src={ele.imgArr[0]} />
                      </h3>
                    </>
                  );
                })}
            </div>
          )}

          {/* available toggle */}
          {(state.signIn.role === "61c05b020cca090670f00821" ||
            state.signIn.role === "61c05b880cca090670f00825") && (
            <div className="available">
              <span className="availablText">
                are you available these days ?{" "}
              </span>
              <ToggleButton
                className="toggleBtn"
                value="check"
                selected={selected}
                onChange={() => {
                  availableToggle();
                }}
              >
                <CheckIcon />
              </ToggleButton>
            </div>
          )}
          <button className="deleteAccountBtn" onClick={deleteAccount}>
            {/* Delete my account */}
            <RiDeleteBin5Fill />
          </button>

          {/* subscribe status */}
          {state.signIn.role === "61c05b020cca090670f00821" && (
            <>
              <div className="payy">
                {user[0] && user[0].subscribeStatus === "active" && (
                  <>
                    <div>
                      <h4 className="subscribeStatus"> Subscribe Status </h4>

                      <p>
                        Your Next Payment Date : (
                        {subscribe &&
                          subscribe.endDate &&
                          subscribe.endDate.slice(0, 10)}
                        )
                      </p>
                      <button
                        className="subscribeBtn"
                        onClick={cancleSubscribe}
                      >
                        cancel
                      </button>
                    </div>
                  </>
                )}

                {user[0] && user[0].subscribeStatus === "unActive" && (
                  <div>
                    {/* if the seller dosn't have a valid subscribe  */}
                    <Elements stripe={stripeTestPromise}>
                      <PaymentForm getOneUser={getUser} />
                    </Elements>
                  </div>
                )}

                {user[0] && user[0].subscribeStatus === "cancelPending" && (
                  <div>
                    canceled successfully - your subscribe will end on ({" "}
                    {subscribe &&
                      subscribe.endDate &&
                      subscribe.endDate.slice(0, 10)}{" "}
                    )
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default Profile;
