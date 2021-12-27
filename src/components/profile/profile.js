import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./../payment";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import { BsPencilFill } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import { RiPencilFill } from "react-icons/ri";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import UseStorageProfile from "../../hocks/useStorageProfile";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../reducers/login";

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
  const [selected, setSelected] = React.useState(false);
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState("");

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
    // subscribe.endDate.slice(0,10)

    const properties = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/property/userProperty/${state.signIn.userID}`
    );
    setProperties(properties.data);
  };
  // let now = new Date();
  // now.setDate(now.getDate() + 30);
  // console.log(now , "date");

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

  return (
    <>
      {user.length && (
        <>
          {/* //update photo */}
          <RiPencilFill
            className="editeImg"
            onClick={() => {
              handleOpenn();
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
                        onChange={(e) => {
                          /////////
                          setProfileImg(e.target.files[0]);
                        }}
                      />

                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera className="camICon" />
                      </IconButton>
                    </label>
                  </Stack>

                  {profileImg && (
                    <div>
                      <UseStorageProfile
                        imgP={profileImg}
                        handleC={handleClosee}
                        reRender={getUser}
                        id={user[0]._id}
                      />
                    </div>
                  )}
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
          <img className="profilePage" src={user[0].img} />
          <div className="profileTextContener">
            <h3 className="userName">{user[0].name} </h3>
            <BsPencilFill
              className="pen"
              onClick={() => {
                handleOpen();
              }}
            />
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

          {/* available toggle */}
          {(state.signIn.role === "61c05b020cca090670f00821" ||
            state.signIn.role === "61c05b880cca090670f00825") && (
            <div className="available">
              <span className="availablText"> are you available ? </span>
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

          {/* subscribe status */}
          {state.signIn.role === "61c05b020cca090670f00821" && (
            <>
              <div className="payy">
                {/* if the seller already have a valid subscribe
                its have to be three cases (active - cancelPending  - unactive)

                first one - will show > button cancle 
                second -   wil show  > cancle succ - your sub will 
                third - will show > you dont have an active subscribe  > button subscribe

                fisrt and second will update just on user key 
                if the month pass wil update every key (user - subscribe - property )
                
                */}
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

              {/* disply seller proprty */}
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
                <button onClick={deleteAccount}>Delete my account</button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
export default Profile;
