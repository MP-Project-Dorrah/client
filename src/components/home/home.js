import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import UseStorage from "../../hocks/useStorage";
import video from "./../../videos/video.mp4";
import { grey } from "@mui/material/colors";

const primary = grey[50];

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

const Input = styled("input")({
  display: "none",
});

function valuetext(value) {
  return `${value}°C`;
}

function Home() {
  const state = useSelector((state) => {
    return state;
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [value, setValue] = React.useState([0, 500000]);
  const [max, setMax] = useState(500000);
  const [min, setMin] = useState(0);
  const [img, setImages] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [city, setCity] = useState("");
  const [bathrooms, setBathrooms] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [describe, setDescribe] = useState("");
  const [location, setLocation] = useState("");
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
      <video
        className="videoInsideDec"
        autoPlay={true}
        loop={true}
        muted={true}
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="bggg"></div>
      <div className="homeHeaderText">Discover a place you'll love to live</div>
      <div className="sortProperty">
        <div>
          <input
            className="searchInput"
            placeholder="searh"
            onChange={(e) => setSearchFun(e.target.value)}
          />
        </div>
        <div>
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
                color: "white",
              }}
              // color="secondary"
            />
          </Box>
        </div>
      </div>
      {state.signIn.role === "61c05b020cca090670f00821" &&
        state.signIn.isSub === true && (
          <>
            {console.log("hereeerr")}
            <div className="newPostBtn">
              <Button
                onClick={() => {
                  handleOpen();
                }}
              >
                + Post new property
              </Button>
            </div>

            <Modal
              className="modal"
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="NewPostModel">
                <Box sx={style} className="box">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    <span className="newPostText"> add a new property </span>
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <label htmlFor="icon-button-file">
                        <Input
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                          multiple
                          onChange={(e) => {
                            for (let i = 0; i < e.target.files.length; i++) {
                              const newImg = e.target.files[i];
                              newImg["id"] = Math.random();
                              setImages((prevState) => [...prevState, newImg]);
                            }
                          }}
                        />

                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera className="fkoe" />
                        </IconButton>
                      </label>
                    </Stack>

                    <input
                      className="newPostInput"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      type="text"
                      placeholder="name"
                    />
                    <br />
                    <input
                      className="newPostInput"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      type="number"
                      placeholder="price"
                    />
                    <br />
                    <input
                      className="newPostInput"
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      type="text"
                      placeholder="city"
                    />
                    <br />
                    <input
                      className="newPostInput"
                      onChange={(e) => {
                        setDescribe(e.target.value);
                      }}
                      type="text"
                      placeholder="description"
                    />
                    <br />
                    <input
                      className="newPostInput"
                      onChange={(e) => {
                        setRooms(e.target.value);
                      }}
                      type="number"
                      required="required"
                      placeholder="how many room"
                    />
                    <br />
                    <input
                      className="newPostInput"
                      onChange={(e) => {
                        setBathrooms(e.target.value);
                      }}
                      type="number"
                      placeholder="how many bathroom"
                    />
                    <br />
                    <input
                      className="newPostInput"
                      onChange={(e) => {
                        setLocation(e.target.value);
                      }}
                      type="text"
                      placeholder="copy google map link here"
                    />

                    {img.length ? (
                      <div>
                        <UseStorage
                          imgP={img}
                          name={name}
                          price={price}
                          city={city}
                          bathrooms={bathrooms}
                          location={location}
                          rooms={rooms}
                          describe={describe}
                          postedBy={state.signIn.userID}
                          handleC={handleClose}
                          rerender={getAllProperties}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </Typography>
                </Box>
              </div>
            </Modal>
          </>
        )}

      {properties.length && (
        <>
          <div className="propertyy">
            {properties.map((ele) => {
              return (
                <>
                  <div className="propertyImgContener">
                    <img
                      onClick={() => goInside(ele._id)}
                      className="propertyImg"
                      src={ele.imgArr[0]}
                    />
                  </div>
                  <div></div>
                  {/* <h3 onClick={() => goInside(ele._id)}>{ele.name}</h3>
                  <h6>{ele.city}</h6> */}
                </>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
