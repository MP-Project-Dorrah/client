import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function InterestList() {
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getAllLikedProperties();
    // eslint-disable-next-line
  }, []);

  const getAllLikedProperties = async () => {
    setMessage( <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
    <CircularProgress color="inherit" />
  </Stack>)
    const Properties = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/interestList/userLikes/${state.signIn.userID}`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    setProperties(Properties.data);
    setMessage("")
    console.log(Properties);
  };

  const goInside = (id) => {
    console.log(id);
    navigate(`/property/${id}`);
  };

  return (
    <div>
      {properties.length ? (
        <>
          <h1 className="savedHomes"> Saved Homes </h1>
          <div className="property">
            {properties.map((ele) => {
              return (
                <>
                  <div>
                    <img
                      onClick={() => goInside(ele.onProperty._id)}
                      className="propertyImgPp"
                      src={ele.onProperty.imgArr[0]}
                    />
                  </div>
                  <div></div>
                </>
              );
            })}
          </div>
        </>
      ) :(<></>)}
         <div className="messageee">  {message} </div> 

    </div>
  );
}

export default InterestList;
