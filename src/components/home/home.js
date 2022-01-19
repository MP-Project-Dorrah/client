import React, { useState, useEffect } from "react";
import { Box, Slider, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import video from "./../../videos/video.mp4";
import { grey } from "@mui/material/colors";
import NewProperty from "../newProperty";

const primary = grey[50];

function valuetext(value) {
  return `${value}°C`;
}

function Home() {
  const state = useSelector((state) => {
    return state;
  });

  let navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [value, setValue] = React.useState([0, 500000]);
  const [max, setMax] = useState(500000);
  const [min, setMin] = useState(0);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getAllProperties();
    // eslint-disable-next-line
  }, [search]);

  const getAllProperties = async () => {
    const Propertie = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/property/searchProperty`,
      { name: search, maxPrice: max, minPrice: min }
    );
    setProperties(Propertie.data);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMax(newValue[1]);
    setMin(newValue[0]);
    getAllProperties();
  };

  const setSearchFun = (value) => {
    console.log(value);
    setSearch(value);
    // getAllProperties();
  };

  const goInside = (propertyId) => {
    console.log(propertyId);
    navigate(`property/${propertyId}`);
  };

  return (
    <div className="homeContener">
      {/* <video
        className="videoInsideDec"
        autoPlay={true}
        loop={true}
        muted={true}
      >
        <source src={video} type="video/mp4" />
      </video> */}
      <img
        className="homePageImg"
        src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      />
      <div className="bggg"></div>
      <div className="homeHeaderText">
        Discover a place you'll love to live
        <p className="homeTex">
          Find a home from our search bar, Enter your specific location and
          price range
        </p>
        <div className="sortProperty">
          <span className="sortByl"> Search by name or location </span>

          <span className="sortByP"> Filter by price </span>

          <div>
            <input
              className="searchInput"
              placeholder="searh"
              onChange={(e) => setSearchFun(e.target.value)}
            />
          </div>
          <div className="slider">
            <Box sx={{ width: 300 }}>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={100} /////
                max={500000} ///////
                step={1000}
                sx={{
                  color: "black",
                }}
                // color="secondary"
              />
            </Box>
          </div>
        </div>
      </div>
      <img
        className="secondPageB"
        src="https://www.originaldesign.com/assets/lines-bk.png"
      />

      {state.signIn.role === "61c05b020cca090670f00821" &&
        state.signIn.subscribeStatus !== "unActive" && (
          <>
            <NewProperty rerender={getAllProperties} />
          </>
        )}

      {properties.length ? (
        <>
          <div className="propertyy">
            {properties.map((ele) => {
              return (
                <>
                  <div
                    className="content_img"
                    onClick={() => goInside(ele._id)}
                  >
                    <img className="propertyImg" src={ele.imgArr[0]} />
                    <div className="spanDev">
                      <h2 className="hoverH3"> {ele.name} </h2>
                      <h4> {ele.city} </h4>
                      <button className="priceBtn"> ${ele.price}</button>
                      <br />
                    </div>
                  </div>
                  <div></div>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Home;
