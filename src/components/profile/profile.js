import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./../payment";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";

const PUBLIC_KEY =
  "pk_test_51K7lpGEhqG80ZdS5vrY9JFVX0W1osFI2kKVDHkuPAmCI0bazpn9TWU7Svfdo6nSWy8Jm1a2N02JrsI0KgrzMUeHY001OBLvj1k";

const stripeTestPromise = loadStripe(PUBLIC_KEY);
const Profile = () => {
  const state = useSelector((state) => {
    return state;
  });
  const [user, setuser] = useState([]);
  const [subscribe, setSubscribe] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isSub, setIsSub] = useState(false);
  const [message, setMessage] = useState("");
  const [available, setAvailable] = useState(false);
  const [selected, setSelected] = React.useState(false);

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

    const subscribe = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/subscribe/${state.signIn.userID}`
    );
    console.log(subscribe.data[0], "subscribe data");
    setSubscribe(subscribe.data[0]);

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
    await axios.put(`${process.env.REACT_APP_BASE_URL}/subscribe/delete`, {
      userId: state.signIn.userID,
    });
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

  return (
    <>
      {user.length && (
        <>
          <img src={user[0].img} />
          <h3>{user[0].name}</h3>
          <h5>@{user[0].username}</h5>

          {state.signIn.role === "61c05b020cca090670f00821" && (
            <>
              <div className="payy">
                {/* if the seller already have a valid subscribe  */}
                {user[0] && user[0].isSub ? (
                  <>
                    <div> its subscribe </div>
                    <button onClick={cancleSubscribe}> cancle </button>
                  </>
                ) : (
                  <div>
                    {/* if the seller dosn't have a valid subscribe  */}
                    <Elements stripe={stripeTestPromise}>
                      <PaymentForm getOneUser={getUser} />
                    </Elements>
                  </div>
                )}
              </div>

              <div> my property </div>
              {properties.length &&
                properties.map((ele) => {
                  return (
                    <>
                      <h3
                        onClick={() => {
                          goInside(ele._id);
                        }}
                      >
                        {ele.name}
                      </h3>
                    </>
                  );
                })}
            </>
          )}
          {(state.signIn.role === "61c05b020cca090670f00821" ||
            state.signIn.role === "61c05b880cca090670f00825") && (
            <>
              are you available ?
              <ToggleButton
                value="check"
                selected={selected}
                onChange={() => {
                  availableToggle();
                }}
              >
                <CheckIcon />
              </ToggleButton>
            </>
          )}
        </>
      )}
    </>
  );
};
export default Profile;
