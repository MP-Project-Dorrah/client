import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./../payment";
// import Slider from "react-slick";
import {
  Stack,
  ToggleButton,
  styled,
  Modal,
  Typography,
  CircularProgress,
  IconButton,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { RiPencilFill, RiDeleteBin5Fill } from "react-icons/ri";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../reducers/login";
import { storage } from "../../firebase";
import EditProfile from "../editProfile";

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 100,
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
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [selected, setSelected] = React.useState(false);
  const [url, setUrl] = useState("");

  const [openn, setOpenn] = React.useState(false);
  const handleOpenn = () => setOpenn(true);
  const handleClosee = () => setOpenn(false);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const getUser = async () => {
    setMessage(
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="inherit" />
      </Stack>
    );
    const user = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/user/oneUser/${state.signIn.userID}`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    setuser(user.data);
    setSelected(user.data[0][0].Availability);
    setMessage("");
  };

  const cancleSubscribe = async () => {
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
    navigate(`/property/${id}`);
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
    if (result.status === 201) {
      setSelected(false);
    } else {
      setSelected(true);
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
          // const progress = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
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
              setUrl(url);
              setMessage2("");
            });
        }
      );
    }
  };

  return (
    <>
      {user.length ? (
        <div className="profileContainer">
          <div className="firstCont">
            <img
              className="profilePageImg"
              src={user[0][0].img}
              alt="profileImage"
            />

            <div
              className="editHover"
              onClick={() => {
                handleOpenn();
              }}
            >
              <RiPencilFill className="editeImg" />
            </div>
          </div>
          <div className="secondCont">
            <div className="editProfile">
              <EditProfile
                username={user[0][0].username}
                email={user[0][0].email}
                city={user[0][0].city}
                name={user[0][0].name}
                phone={user[0][0].phonNumber}
                rerender={getUser}
              />
            </div>
            <h3 className="userName">{user[0][0].name} </h3>
            <h5>
              <span>Username: </span>@{user[0][0].username}
            </h5>
            <h5>
              <span>Email: </span>
              {user[0][0].email}
            </h5>
            <h5>
              <span>Phon number: </span>
              {user[0][0].phonNumber}
            </h5>
            <h5>
              <span>City: </span>
              {user[0][0].city}
            </h5>
          </div>
          <div>
            {/* available toggle */}
            {(user[0][0].role.role === "Seller" ||
              user[0][0].role.role === "RealEstateAgent") && (
              <div className="available">
                <span className="availablText">
                  Are you available these days ?
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
          </div>

          <div id="subscribeContainer">
            {/* subscribe status */}
            {user[0][0].role.role === "Seller" && (
              <>
                <h4 className="subscribeStatus"> Subscribe Status </h4>
                {user[0][0].subscribeStatus === "active" && (
                  <>
                    <span className="activeSubscribe">Active</span>
                    <p className="activeSubscribeP">
                      Your next payment date : (
                      {user[2][0].endDate && user[2][0].endDate.slice(0, 10)})
                    </p>
                    <button className="subscribeBtn" onClick={cancleSubscribe}>
                      cancel
                    </button>
                  </>
                )}
                {user[0][0].subscribeStatus === "unActive" && (
                  <>
                    <span className="unActiveSubscribe">UnActive</span>
                    <div className="PaymentForm">
                      {/* if the seller dosn't have a valid subscribe  */}
                      <Elements stripe={stripeTestPromise}>
                        <PaymentForm getOneUser={getUser} />
                      </Elements>
                    </div>
                  </>
                )}
                {user[0][0].subscribeStatus === "cancelPending" && (
                  <>
                    <span className="activeSubscribe">Active</span>
                    <p>
                      canceled successfully - your subscribe will end on (
                      {user[2][0].endDate && user[2][0].endDate.slice(0, 10)})
                    </p>
                  </>
                )}
              </>
            )}
          </div>
          {user[0][0].role.role === "Seller" && (
            <div>
              <h4 className="PropertiesH4"> Properties: </h4>
              <div className="propertiContainer">
                {user[1].map((ele) => {
                  return (
                    <img
                      onClick={() => goInside(ele._id)}
                      className="properImg"
                      src={ele.imgArr[0]}
                      alt=""
                    />
                  );
                })}
              </div>
            </div>
          )}

          <div className="deleteAccountContainer">
            {/* Delete my account */}
            <button className="deleteAccountBtn" onClick={deleteAccount}>
              <RiDeleteBin5Fill />
            </button>
          </div>
        </div>
      ) : (
        <div className="message">{message} </div>
      )}

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
                  <br />
                  {url && (
                    <button className="updateProfileBtn" onClick={postIt}>
                      Update
                    </button>
                  )}
                  <div> {message2} </div>
                </label>
              </Stack>
            </Typography>
          </Box>
        </span>
      </Modal>
    </>
  );
};
export default Profile;
